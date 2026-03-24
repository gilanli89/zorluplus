import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/types";
import { getCartUpsellItems } from "@/lib/crossSell";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface Props {
  allProducts: Product[];
  maxItems?: number;
}

export default function CartUpsell({ allProducts, maxItems = 3 }: Props) {
  const { items, addItem } = useCart();

  const cartProductIds = useMemo(() => items.map(i => i.product.id), [items]);

  const upsellItems = useMemo(
    () => getCartUpsellItems(cartProductIds, allProducts, maxItems),
    [cartProductIds, allProducts, maxItems]
  );

  if (upsellItems.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-muted/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-bold text-foreground">TV'niz için önerilen aksesuarlar</h4>
      </div>
      <div className="space-y-3">
        {upsellItems.map(({ product, compatibilityLabel }) => (
          <div key={product.id} className="flex items-center gap-3">
            <Link to={`/urun/${product.slug}`} className="shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="h-12 w-12 rounded-lg object-contain bg-card border border-border p-1"
                loading="lazy"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link to={`/urun/${product.slug}`}>
                <p className="text-xs font-medium text-foreground line-clamp-1 hover:text-primary transition-colors">
                  {product.name}
                </p>
              </Link>
              {compatibilityLabel && (
                <p className="text-[10px] text-muted-foreground">{compatibilityLabel}</p>
              )}
              <p className="text-xs font-bold text-primary mt-0.5">
                {formatPrice(product.salePrice || product.price)}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="shrink-0 h-8 text-xs gap-1"
              onClick={() => {
                addItem(product);
                toast.success(`${product.name} sepete eklendi!`);
              }}
            >
              <ShoppingCart className="h-3 w-3" /> Ekle
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
