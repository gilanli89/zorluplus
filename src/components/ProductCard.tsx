import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <Link
      to={`/urun/${product.slug}`}
      className="group flex flex-col rounded-lg border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
    >
      {/* Image */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground text-[10px]">Yeni</Badge>}
          {hasDiscount && <Badge className="bg-destructive text-destructive-foreground text-[10px]">%{discountPercent}</Badge>}
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-muted-foreground">Stokta Yok</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 p-3">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>
        <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="font-display font-bold text-lg text-foreground">
            {formatPrice(product.salePrice || product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
