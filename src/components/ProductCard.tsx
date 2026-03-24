import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { MessageCircle, Eye } from "lucide-react";
import { getWhatsAppLink, formatPrice } from "@/lib/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductTranslation } from "@/hooks/useProductTranslation";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = false;
  const { t } = useLanguage();
  const { translateProduct } = useProductTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="card-lift group flex flex-col rounded-2xl border border-border bg-card overflow-hidden relative"
    >
      <Link to={`/urun/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-5 group-hover:scale-105 transition-transform duration-500 ease-out"
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
              <Badge className="bg-primary text-primary-foreground text-[10px] rounded-full px-2.5 shadow-sm">{t("product.new")}</Badge>
            )}
          </div>
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="text-sm font-semibold text-muted-foreground">{t("product.outOfStock")}</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-3.5 flex-1">
          <p className="text-[11px] font-semibold text-primary/70 uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {translateProduct(product.name)}
          </h3>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="mx-3.5 mb-3.5">
        <Link
          to={`/urun/${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-bold hover:bg-muted transition-all duration-200 tap-scale"
        >
          <Eye size={14} />
          {t("product.view")}
        </Link>
      </div>
    </motion.div>
  );
}
