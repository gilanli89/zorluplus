import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { getWhatsAppLink } from "@/lib/products";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <div className="card-lift group flex flex-col rounded-2xl border border-border bg-card overflow-hidden relative">
      <Link to={`/urun/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-5 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              const fallbacks = [
                `/products/${product.category === "tv-goruntu" ? "samsung-oled-tv" : product.category === "klima-isitma" ? "klima" : product.category === "beyaz-esya" ? "samsung-buzdolabi" : "midea-su-sebili"}.png`,
                "/placeholder.svg"
              ];
              const currentSrc = target.src;
              const next = fallbacks.find(f => !currentSrc.endsWith(f));
              if (next) target.src = next;
            }}
          />
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground text-[10px] rounded-full px-2.5 shadow-sm">Yeni</Badge>
            )}
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground text-[10px] rounded-full px-2.5 shadow-sm">%{discountPercent}</Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-sm font-semibold text-muted-foreground">Stokta Yok</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-3.5 flex-1">
          <p className="text-[11px] font-semibold text-primary/70 uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* WhatsApp Order Button */}
      <a
        href={getWhatsAppLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="flex items-center justify-center gap-1.5 mx-3.5 mb-3.5 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#1ebe57] transition-colors shadow-sm"
      >
        <MessageCircle size={14} />
        Fiyat Al · WhatsApp
      </a>
    </div>
  );
}
