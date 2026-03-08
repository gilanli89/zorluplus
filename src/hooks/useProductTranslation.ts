import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

const CACHE_KEY = "product_translations_en";
const CACHE_VERSION_KEY = "product_translations_version";
const CACHE_VERSION = "1";

type TranslationCache = Record<string, string>;

function loadCache(): TranslationCache {
  try {
    if (localStorage.getItem(CACHE_VERSION_KEY) !== CACHE_VERSION) {
      localStorage.removeItem(CACHE_KEY);
      localStorage.setItem(CACHE_VERSION_KEY, CACHE_VERSION);
      return {};
    }
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCache(cache: TranslationCache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* quota exceeded, ignore */ }
}

export function useProductTranslation() {
  const { lang } = useLanguage();
  const [cache, setCache] = useState<TranslationCache>(loadCache);
  const pendingRef = useRef<Set<string>>(new Set());
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const queueRef = useRef<string[]>([]);

  const flushQueue = useCallback(async () => {
    const toTranslate = [...new Set(queueRef.current)].filter(t => !cache[t] && !pendingRef.current.has(t));
    queueRef.current = [];
    if (toTranslate.length === 0) return;

    toTranslate.forEach(t => pendingRef.current.add(t));

    try {
      const { data, error } = await supabase.functions.invoke("ai-translate", {
        body: { texts: toTranslate, targetLang: "en" },
      });

      if (error || !data?.translations) {
        console.error("Translation error:", error);
        toTranslate.forEach(t => pendingRef.current.delete(t));
        return;
      }

      const newCache = { ...cache };
      toTranslate.forEach((original, i) => {
        newCache[original] = data.translations[i] || original;
        pendingRef.current.delete(original);
      });

      setCache(newCache);
      saveCache(newCache);
    } catch (e) {
      console.error("Translation fetch error:", e);
      toTranslate.forEach(t => pendingRef.current.delete(t));
    }
  }, [cache]);

  const translateProduct = useCallback((text: string): string => {
    if (lang === "tr" || !text) return text;

    // Already cached
    if (cache[text]) return cache[text];

    // Queue for batch translation
    if (!pendingRef.current.has(text) && !queueRef.current.includes(text)) {
      queueRef.current.push(text);
      if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
      batchTimerRef.current = setTimeout(flushQueue, 300);
    }

    // Return original while loading
    return text;
  }, [lang, cache, flushQueue]);

  // Clean up timer
  useEffect(() => {
    return () => {
      if (batchTimerRef.current) clearTimeout(batchTimerRef.current);
    };
  }, []);

  return { translateProduct, isTranslating: pendingRef.current.size > 0 };
}
