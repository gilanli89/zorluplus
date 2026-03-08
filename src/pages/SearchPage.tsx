import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Search, Mic, MicOff, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";

interface AISearchResult {
  keywords: string[];
  category: string | null;
  subcategory: string | null;
  brand: string | null;
}

const SMART_SEARCH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-smart-search`;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [isListening, setIsListening] = useState(false);
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const aiDebounce = useRef<ReturnType<typeof setTimeout>>();
  const { data: products = [] } = useProducts();
  const { t, lang } = useLanguage();

  const hasSpeechSupport = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!hasSpeechSupport) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = lang === "tr" ? "tr-TR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setSearchParams(transcript ? { q: transcript } : {});
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [hasSpeechSupport, setSearchParams, lang]);

  useEffect(() => () => { recognitionRef.current?.stop(); }, []);

  // AI smart search with debounce
  useEffect(() => {
    if (aiDebounce.current) clearTimeout(aiDebounce.current);
    
    if (!query.trim() || query.trim().length < 3) {
      setAiResult(null);
      return;
    }

    aiDebounce.current = setTimeout(async () => {
      setAiLoading(true);
      try {
        const resp = await fetch(SMART_SEARCH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ query: query.trim() }),
        });
        if (resp.ok) {
          const data = await resp.json();
          if (!data.error) setAiResult(data);
        }
      } catch { /* fallback to basic search */ }
      setAiLoading(false);
    }, 600);

    return () => { if (aiDebounce.current) clearTimeout(aiDebounce.current); };
  }, [query]);

  // Combined search: AI-enhanced + basic text match
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    
    // Basic text search
    const textResults = products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
    );

    if (!aiResult) return textResults;

    // AI-enhanced: score products
    const scored = products.map(p => {
      let score = 0;
      
      // Category match
      if (aiResult.category && p.category === aiResult.category) score += 10;
      if (aiResult.subcategory && p.subcategory === aiResult.subcategory) score += 15;
      
      // Brand match
      if (aiResult.brand && p.brand.toLowerCase() === aiResult.brand.toLowerCase()) score += 12;
      
      // Keyword match
      const pLower = `${p.name} ${p.description} ${p.brand}`.toLowerCase();
      for (const kw of aiResult.keywords) {
        if (pLower.includes(kw.toLowerCase())) score += 5;
      }
      
      // Basic text match bonus
      if (textResults.some(tr => tr.id === p.id)) score += 3;
      
      return { product: p, score };
    });

    const aiResults = scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(s => s.product);

    // Merge: AI results first, then text results not in AI
    const aiIds = new Set(aiResults.map(p => p.id));
    const merged = [...aiResults, ...textResults.filter(p => !aiIds.has(p.id))];
    
    return merged;
  }, [products, query, aiResult]);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <div className="container py-6">
      <h1 className="heading-2 mb-4 text-foreground pulse-heading">{t("search.title")}</h1>
      <div className="relative mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder={lang === "tr" ? "Doğal dilde arayın... örn: 'büyük aile için buzdolabı'" : "Search naturally... e.g. 'large TV for living room'"}
            className="pl-10 h-11"
            autoFocus
          />
        </div>
        {hasSpeechSupport && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full shrink-0 h-11 w-11 transition-colors",
              isListening && "text-destructive bg-destructive/10 animate-pulse"
            )}
            onClick={isListening ? stopListening : startListening}
            title={isListening ? t("search.stopListening") : t("search.voiceSearch")}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5 text-primary" />}
          </Button>
        )}
      </div>

      {/* AI search insights */}
      {query.trim() && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {aiLoading ? (
            <Badge variant="secondary" className="gap-1.5">
              <Loader2 className="h-3 w-3 animate-spin" />
              {lang === "tr" ? "AI analiz ediyor..." : "AI analyzing..."}
            </Badge>
          ) : aiResult && (aiResult.category || aiResult.brand) ? (
            <>
              <Badge variant="outline" className="gap-1">
                <Sparkles className="h-3 w-3 text-primary" />
                {lang === "tr" ? "AI destekli arama" : "AI-powered search"}
              </Badge>
              {aiResult.category && <Badge variant="secondary">{aiResult.category}</Badge>}
              {aiResult.subcategory && <Badge variant="secondary">{aiResult.subcategory}</Badge>}
              {aiResult.brand && <Badge variant="secondary">{aiResult.brand}</Badge>}
            </>
          ) : null}
          <span className="text-sm text-muted-foreground ml-auto">{results.length} {t("general.resultsFound")}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
      
      {query.trim() && results.length === 0 && !aiLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{lang === "tr" ? "Sonuç bulunamadı. Farklı kelimelerle tekrar deneyin." : "No results found. Try different keywords."}</p>
        </div>
      )}
    </div>
  );
}
