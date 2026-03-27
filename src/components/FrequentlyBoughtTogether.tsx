import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Product } from "@/lib/types";
import { getTVCrossSellItems, CrossSellItem } from "@/lib/crossSell";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useProductTranslation } from "@/hooks/useProductTranslation";
import { toast } from "sonner";
import { PremiumIconInline } from "@/components/PremiumIcon";

interface Props {
  currentProduct: Product;
  allProducts: Product[];
  maxItems?: number;
}

export default function FrequentlyBoughtTogether({ currentProduct, allProducts, maxItems = 6 }: Props) {
  const { addItem } = useCart();
  const { translateProduct } = useProductTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const crossSellItems = useMemo(
    () => getTVCrossSellItems(currentProduct, allProducts, maxItems),
    [currentProduct, allProducts, maxItems]
  );

  if (crossSellItems.length === 0) return null;

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5">
          <PremiumIconInline icon={Package} size={20} />
          <h3 className="text-lg font-bold text-foreground">Bunlarla Birlikte Alınır</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("left")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => scroll("right")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Televizyonunuz için uyumlu aksesuar önerileri</p>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 snap-x snap-mandatory"
      >
        {crossSellItems.map(({ product, compatibilityLabel }) => {
          const price = product.salePrice || product.price;
          return (
            <div
              key={product.id}
              className="flex-shrink-0 w-48 md:w-52 snap-start rounded-xl border border-border bg-card overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
            >
              <Link to={`/urun/${product.slug}`} className="block">
                <div className="aspect-square bg-muted/30 overflow-hidden p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </Link>

              <div className="p-3 flex flex-col flex-1 gap-1.5">
                {compatibilityLabel && (
                  <Badge variant="secondary" className="w-fit text-[10px] px-2 py-0.5">
                    {compatibilityLabel}
                  </Badge>
                )}
                <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider">
                  {product.brand}
                </p>
                <Link to={`/urun/${product.slug}`} className="flex-1">
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {translateProduct(product.name)}
                  </p>
                </Link>

                <div className="flex items-center gap-2 mt-1">
                  {product.salePrice && product.salePrice > 0 ? (
                    <>
                      <span className="text-sm font-bold text-primary">{formatPrice(product.salePrice)}</span>
                      <span className="text-[10px] text-muted-foreground line-through">{formatPrice(product.price)}</span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
                  )}
                </div>

                <Button
                  size="sm"
                  className="w-full mt-2 gap-1.5 text-xs font-semibold"
                  onClick={(e) => {
                    e.preventDefault();
                    addItem(product);
                    toast.success(`${product.name} sepete eklendi!`);
                  }}
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Sepete Ekle
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
