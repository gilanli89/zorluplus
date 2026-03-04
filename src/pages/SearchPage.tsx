import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Search, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { data: products = [] } = useProducts();

  const hasSpeechSupport = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!hasSpeechSupport) return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "tr-TR";
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
  }, [hasSpeechSupport, setSearchParams]);

  useEffect(() => () => { recognitionRef.current?.stop(); }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.brand.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
    );
  }, [products, query]);

  const handleSearch = (val: string) => {
    setQuery(val);
    setSearchParams(val ? { q: val } : {});
  };

  return (
    <div className="container py-6">
      <h1 className="font-display text-2xl font-bold mb-4 text-foreground">Ürün Ara</h1>
      <div className="relative mb-6 flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Ürün adı, marka veya kategori..."
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
            title={isListening ? "Dinlemeyi durdur" : "Sesle ara"}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
        )}
      </div>
      {query.trim() && (
        <p className="text-sm text-muted-foreground mb-4">{results.length} sonuç bulundu</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {results.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
