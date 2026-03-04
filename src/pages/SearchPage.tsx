import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [query, setQuery] = useState(q);
  const { data: products = [] } = useProducts();

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
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => handleSearch(e.target.value)}
          placeholder="Ürün adı, marka veya kategori..."
          className="pl-10 h-11"
          autoFocus
        />
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
