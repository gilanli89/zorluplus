import { useMemo } from "react";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
  currentProduct: Product;
  allProducts: Product[];
  maxItems?: number;
}

/**
 * Smart product recommendations using a scoring algorithm.
 * No AI needed here — category/brand/price similarity is fast and effective.
 */
export default function ProductRecommendations({ currentProduct, allProducts, maxItems = 4 }: Props) {
  const { lang } = useLanguage();

  const recommendations = useMemo(() => {
    // Define complementary category pairs
    const complementary: Record<string, string[]> = {
      "tv-goruntu": ["ses-sistemleri", "aksesuar"],
      "ses-sistemleri": ["tv-goruntu"],
      "aksesuar": ["tv-goruntu"],
      "beyaz-esya": ["ankastre", "mutfak-aletleri"],
      "ankastre": ["beyaz-esya", "mutfak-aletleri"],
      "mutfak-aletleri": ["beyaz-esya", "ankastre"],
      "klima-isitma": ["kucuk-ev-aletleri"],
    };

    const scored = allProducts
      .filter(p => p.id !== currentProduct.id)
      .map(p => {
        let score = 0;

        // Same subcategory = strongest signal
        if (p.subcategory === currentProduct.subcategory) score += 20;
        // Same category
        else if (p.category === currentProduct.category) score += 10;
        // Complementary category (e.g. soundbar for TV)
        else if (complementary[currentProduct.category]?.includes(p.category)) score += 7;

        // Same brand
        if (p.brand === currentProduct.brand) score += 8;

        // Similar price range (within 30%)
        if (currentProduct.price > 0 && p.price > 0) {
          const ratio = p.price / currentProduct.price;
          if (ratio >= 0.7 && ratio <= 1.3) score += 5;
          if (ratio >= 0.9 && ratio <= 1.1) score += 3;
        }

        // In stock bonus
        if (p.inStock) score += 2;

        // Has sale bonus
        if (p.salePrice) score += 1;

        return { product: p, score };
      })
      .filter(s => s.score >= 5)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxItems)
      .map(s => s.product);

    return scored;
  }, [currentProduct, allProducts, maxItems]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-bold text-foreground">
          {lang === "tr" ? "Sizin İçin Öneriler" : "Recommended for You"}
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {recommendations.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
