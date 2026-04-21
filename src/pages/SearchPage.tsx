import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Search, Mic, MicOff, Sparkles, Loader2, X } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SortOption } from "@/lib/types";

interface AISearchResult {
  keywords: string[];
  category: string | null;
  subcategory: string | null;
  brand: string | null;
}

const SMART_SEARCH_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-smart-search`;

// -------------------- Search matching helpers --------------------

// KKTC/TR domain synonyms: key token → [alternative tokens]
// Bidirectional; her iki yönde eşleşme için her iki girdi de eklenmeli
const TR_SYNONYMS: Record<string, string[]> = {
  "buzluk": ["buzdolabı", "buzdolapları", "dondurucu"],
  "buzdolabı": ["buzluk"],
  "buzdolapları": ["buzluk"],
  "dondurucu": ["buzluk"],
  "tv": ["televizyon"],
  "televizyon": ["tv"],
  "çamaşır": ["camasir"],
  "camasir": ["çamaşır"],
  "bulaşık": ["bulasik"],
  "bulasik": ["bulaşık"],
  "fırın": ["firin", "ocak"],
  "firin": ["fırın", "ocak"],
  "ocak": ["fırın"],
  "klima": ["ac", "air conditioner"],
  "ac": ["klima"],
  "airfryer": ["hava fritözü", "air fryer"],
  "kurutucu": ["kurutma makinesi"],
  "mikrodalga": ["microwave"],
};

// Aksan/Türkçe karakter sadeleştirme (gevşek eşleşme için)
const stripAccents = (s: string): string =>
  s
    .replace(/ı/g, "i")
    .replace(/İ/g, "i")
    .replace(/ş/g, "s")
    .replace(/Ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/Ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/Ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/Ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/Ç/g, "c");

// Boşlukları kaldır (birleşik/ayrık yazım toleransı için)
const compact = (s: string): string => s.replace(/\s+/g, "");

const expandToken = (token: string): string[] => {
  const t = token.toLowerCase();
  return [t, ...(TR_SYNONYMS[t] || [])];
};

interface SearchableProduct {
  name: string;
  brand: string;
  description: string;
  sku?: string;
  model?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
}

// Ürünü sorguyla eşleştir: AND(tokens), OR(synonyms within token),
// raw + compact + accent-stripped variants üzerinden kontrol
const matchesQuery = (p: SearchableProduct, query: string): boolean => {
  const q = query.toLowerCase().trim();
  if (!q) return false;
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return false;

  const haystack = [
    p.name, p.brand, p.description, p.sku || "", p.model || "",
    p.category || "", p.subcategory || "", ...(p.tags || []),
  ].join(" ").toLowerCase();

  const haystackCompact = compact(haystack);
  const haystackStripped = stripAccents(haystack);
  const haystackCompactStripped = stripAccents(haystackCompact);

  return tokens.every(token => {
    const variants = expandToken(token);
    return variants.some(v => {
      const vStripped = stripAccents(v);
      return (
        haystack.includes(v) ||
        haystackCompact.includes(compact(v)) ||
        haystackStripped.includes(vStripped) ||
        haystackCompactStripped.includes(compact(vStripped))
      );
    });
  });
};

// -------------------- Intent & accessory mapping --------------------

// Kullanıcı sorgusundan hangi ürün alt-kategorisini aradığını tespit eder.
// Keyword prefix match'e izin verir: "telev" → tv, "buzdol" → buzdolabi
const INTENT_KEYWORDS: Record<string, string[]> = {
  "tv": ["tv", "televizyon", "television", "smart tv", "led tv", "qled", "oled", "neo qled", "4k tv", "ekran", "monitor"],
  "buzdolabi": ["buzdolabı", "buzdolabi", "buzluk", "no frost", "dondurucu", "refrigerator", "fridge"],
  "mini-buzdolabi": ["mini buzdolabı", "mini buzdolabi", "mini bar", "minibar"],
  "derin-dondurucu": ["derin dondurucu", "freezer"],
  "camasir-makinesi": ["çamaşır makinesi", "çamaşır makinası", "camasir makinesi", "camasir makinasi", "washing machine"],
  "kurutma-makinesi": ["kurutma makinesi", "kurutucu", "dryer", "tumble dryer"],
  "bulasik-makinesi": ["bulaşık makinesi", "bulasik makinesi", "bulaşık makinası", "dishwasher"],
  "klima": ["klima", "split klima", "air conditioner", "ac unit", "inverter klima"],
  "portatif-klima": ["portatif klima", "taşınabilir klima", "portable ac"],
  "isiticilar": ["ısıtıcı", "isitici", "konvektör", "konvektor", "heater", "radyatör"],
  "firin": ["fırın", "firin", "ankastre fırın", "oven"],
  "ocak": ["ocak", "ankastre ocak", "cooktop", "stove"],
  "davlumbaz": ["davlumbaz", "aspiratör", "hood"],
  "mikrodalga": ["mikrodalga", "microwave"],
  "air-fryer": ["air fryer", "airfryer", "hava fritözü", "hava fritozu"],
  "kahve-makinesi": ["kahve makinesi", "coffee machine", "espresso"],
  "pisirici": ["pişirici", "multicooker", "düdüklü"],
  "su-sebili": ["su sebili", "water dispenser", "sebil"],
  "bluetooth-hoparlor": ["bluetooth hoparlör", "bluetooth hoparlor", "taşınabilir hoparlör", "speaker", "hoparlör", "hoparlor"],
  "kulaklik": ["kulaklık", "kulaklik", "headphone", "earphone", "earbud", "airpods"],
  "soundbar": ["soundbar", "sound bar"],
  "hdmi-kablo": ["hdmi", "hdmi kablo"],
  "kumanda": ["kumanda", "remote", "kumandalar"],
  "tv-aski-aparatlari": ["tv askı", "tv aski", "duvar askı", "duvar aski", "tv tutucu", "tv mount", "askı aparatı"],
  "voltaj-regulatoru": ["voltaj regülatörü", "voltaj regulatoru", "regülatör", "voltage regulator"],
  "utu": ["ütü", "utu", "iron"],
  "supurge": ["süpürge", "supurge", "vacuum", "vakum"],
  "ventilator": ["vantilatör", "vantilator", "fan"],
  "temizlik-urunleri": ["temizlik", "temizleme", "ekran temizleme", "cleaning"],
};

/**
 * Sorgudan subcategory niyetini çıkarır.
 * "telev" gibi yarım yazımlar da yakalanır (prefix bidirectional match).
 * Döner: subcategory slug veya null.
 */
const detectIntent = (query: string): string | null => {
  const q = stripAccents(query.toLowerCase().trim());
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return null;

  // Full query match ("smart tv" gibi çok-kelimeli keyword için)
  const qCompact = compact(q);

  for (const [subcategory, keywords] of Object.entries(INTENT_KEYWORDS)) {
    for (const kw of keywords) {
      const kwStripped = stripAccents(kw.toLowerCase());
      const kwCompact = compact(kwStripped);

      // 1) Full query tam match (multi-word keyword için)
      if (q === kwStripped || qCompact === kwCompact) return subcategory;
      // 2) Full query keyword'ü içeriyor (örn "samsung televizyon" query'sinde "televizyon")
      if (q.includes(kwStripped) || qCompact.includes(kwCompact)) return subcategory;
      // 3) Token-level prefix match (örn "telev" → "televizyon"; min 3 karakter)
      for (const t of tokens) {
        if (t === kwStripped) return subcategory;
        if (t.length >= 3 && (kwStripped.startsWith(t) || t.startsWith(kwStripped))) {
          return subcategory;
        }
      }
    }
  }
  return null;
};

// İlgili aksesuarlar: primary subcategory → liste of accessory subcategories
// Kullanıcı "televizyon" aradığında TV'lerin altında bunlar "İlgili Aksesuarlar" olarak görünür
const ACCESSORY_SUBCATS: Record<string, string[]> = {
  "tv": ["tv-aski-aparatlari", "kumanda", "tv-aksesuar", "hdmi-kablo", "temizlik-urunleri", "voltaj-regulatoru"],
  "buzdolabi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "mini-buzdolabi": ["voltaj-regulatoru"],
  "derin-dondurucu": ["voltaj-regulatoru"],
  "camasir-makinesi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "kurutma-makinesi": ["voltaj-regulatoru"],
  "bulasik-makinesi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "klima": ["voltaj-regulatoru"],
  "portatif-klima": ["voltaj-regulatoru"],
  "firin": ["voltaj-regulatoru", "temizlik-urunleri"],
  "ocak": ["temizlik-urunleri"],
  "mikrodalga": ["voltaj-regulatoru", "temizlik-urunleri"],
  "air-fryer": ["temizlik-urunleri"],
  "kahve-makinesi": ["temizlik-urunleri"],
  "bluetooth-hoparlor": ["kulaklik"],
  "soundbar": ["hdmi-kablo"],
};

// -------------------- Component --------------------

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [isListening, setIsListening] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [aiResult, setAiResult] = useState<AISearchResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const recognitionRef = useRef<any>(null);
  const aiDebounce = useRef<ReturnType<typeof setTimeout>>();
  const inputRef = useRef<HTMLInputElement>(null);
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

  // URL'deki ?q= parametresi değişince (örn: Header'dan live search) query state'ini sync et
  useEffect(() => {
    setQuery(q);
  }, [q]);

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

  // Intent-aware search: ürün tipi tespit edilirse primary + related olarak ayır
  const { primary: results, related: relatedResults } = useMemo(() => {
    if (!query.trim()) return { primary: [], related: [] };

    // 1) Intent (ne aradığı) tespiti
    const detectedIntent = detectIntent(query);

    // 2) Token-based broad match (synonym + accent + space tolerant)
    const allMatched = products.filter(p => matchesQuery(p, query));

    // 3) Intent varsa: subcategory'e göre sıkı filtre
    let primary = allMatched;
    let related: typeof allMatched = [];

    if (detectedIntent) {
      // Primary = bu intent'in subcategory'sine tam uyan ürünler
      const strictPrimary = products.filter(p => p.subcategory === detectedIntent);

      // Query'de marka/model geçiyorsa onları da filtrele (örn "samsung tv")
      const brandFiltered = strictPrimary.filter(p => matchesQuery(p, query));

      // Primary: önce brand-filtered (varsa), değilse tüm subcategory ürünleri
      primary = brandFiltered.length > 0 ? brandFiltered : strictPrimary;

      // Related: accessory map'ten ilgili alt kategorileri çek
      const accessorySubcats = ACCESSORY_SUBCATS[detectedIntent] || [];
      if (accessorySubcats.length > 0) {
        const primaryIds = new Set(primary.map(p => p.id));
        related = products
          .filter(p => accessorySubcats.includes(p.subcategory) && !primaryIds.has(p.id))
          .slice(0, 12); // max 12 aksesuar, UI şişmesin
      }

      // Eğer primary'de hiç ürün yoksa (kategori boş), fallback: tüm token matches
      if (primary.length === 0) {
        primary = allMatched;
        related = [];
      }
    } else if (aiResult && (aiResult.category || aiResult.subcategory || aiResult.brand)) {
      // Intent yoksa ve AI sonucu varsa: AI-enhanced scoring
      const scored = allMatched.map(p => {
        let score = 1; // token match'i zaten geçti
        if (aiResult.category && p.category === aiResult.category) score += 10;
        if (aiResult.subcategory && p.subcategory === aiResult.subcategory) score += 15;
        if (aiResult.brand && p.brand.toLowerCase() === aiResult.brand.toLowerCase()) score += 12;
        return { product: p, score };
      });
      primary = scored.sort((a, b) => b.score - a.score).map(s => s.product);
    }

    // 4) Sort primary
    const sorted = [...primary];
    switch (sortBy) {
      case "price-asc": sorted.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
      case "price-desc": sorted.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
      case "newest": sorted.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()); break;
      case "oldest": sorted.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()); break;
      case "name-asc": sorted.sort((a, b) => a.name.localeCompare(b.name, "tr")); break;
      case "name-desc": sorted.sort((a, b) => b.name.localeCompare(a.name, "tr")); break;
    }

    return { primary: sorted, related };
  }, [products, query, aiResult, sortBy]);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  const clearSearch = () => {
    setQuery("");
    setSearchParams({});
    setAiResult(null);
    inputRef.current?.focus();
  };

  return (
    <div className="container py-6">
      <h1 className="heading-2 mb-4 text-foreground pulse-heading">{t("search.title")}</h1>
      <div className="relative mb-4 flex items-center gap-2">
        <div className="relative flex-1">
          <PremiumIconInline icon={Search} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder={lang === "tr" ? "Doğal dilde arayın... örn: 'büyük aile için buzdolabı'" : "Search naturally... e.g. 'large TV for living room'"}
            className="pl-10 pr-10 h-11"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-full hover:bg-muted"
              aria-label={lang === "tr" ? "Aramayı temizle" : "Clear search"}
            >
              <X size={16} />
            </button>
          )}
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
            {isListening ? <PremiumIconInline icon={MicOff} size={20} /> : <PremiumIconInline icon={Mic} size={20} />}
          </Button>
        )}
      </div>

      {/* AI search insights */}
      {query.trim() && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {aiLoading ? (
            <Badge variant="secondary" className="gap-1.5">
              <PremiumIconInline icon={Loader2} size={12} className="animate-spin" />
              {lang === "tr" ? "AI analiz ediyor..." : "AI analyzing..."}
            </Badge>
          ) : aiResult && (aiResult.category || aiResult.brand) ? (
            <>
              <Badge variant="outline" className="gap-1">
                <PremiumIconInline icon={Sparkles} size={12} />
                {lang === "tr" ? "AI destekli arama" : "AI-powered search"}
              </Badge>
              {aiResult.category && <Badge variant="secondary">{aiResult.category}</Badge>}
              {aiResult.subcategory && <Badge variant="secondary">{aiResult.subcategory}</Badge>}
              {aiResult.brand && <Badge variant="secondary">{aiResult.brand}</Badge>}
            </>
          ) : null}
          <Select value={sortBy} onValueChange={v => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-44 h-8 text-xs ml-auto">
              <span className="text-muted-foreground mr-1 font-medium">{t("sort.label")}:</span>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: "popular", label: t("sort.popular") },
                { value: "newest", label: t("sort.newest") },
                { value: "oldest", label: t("sort.oldest") },
                { value: "price-asc", label: t("sort.priceAsc") },
                { value: "price-desc", label: t("sort.priceDesc") },
                { value: "name-asc", label: t("sort.nameAsc") },
                { value: "name-desc", label: t("sort.nameDesc") },
              ].map(o => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">{results.length} {t("general.resultsFound")}</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* İlgili Aksesuarlar — intent tespit edildiyse ve aksesuar eşleşmesi varsa */}
      {relatedResults.length > 0 && (
        <section className="mt-10 pt-8 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <PremiumIconInline icon={Sparkles} size={18} className="text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">
              {lang === "tr" ? "İlgili Aksesuarlar" : "Related Accessories"}
            </h2>
            <span className="text-xs text-muted-foreground">
              ({relatedResults.length})
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {relatedResults.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {query.trim() && results.length === 0 && !aiLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{lang === "tr" ? "Sonuç bulunamadı. Farklı kelimelerle tekrar deneyin." : "No results found. Try different keywords."}</p>
        </div>
      )}
    </div>
  );
}
