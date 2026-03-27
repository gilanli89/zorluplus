import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { ShoppingCart, Eye, Sparkles } from "lucide-react";
import { PremiumBadgeIcon } from "@/components/PremiumIcon";
import { formatPrice } from "@/lib/products";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductTranslation } from "@/hooks/useProductTranslation";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useRef, useState, useCallback } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage();
  const { translateProduct } = useProductTranslation();
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} ${t("cart.addedToCart")}`);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.2s ease-out",
      }}
      className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden relative shine-on-hover will-change-transform card-premium"
    >
      <Link to={`/urun/${product.slug}`} className="flex flex-col flex-1">
        {/* Image */}
        <div className="relative aspect-square bg-muted/50 overflow-hidden">
          {!imgLoaded && (
            <div className="absolute inset-0 skeleton-shimmer" />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-contain p-5 group-hover:scale-105 transition-transform duration-500 ease-out ${imgLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={(e) => {
              const target = e.currentTarget;
              setImgLoaded(true);
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
              <Badge variant="premium" className="text-[10px] rounded-full px-2.5 gap-1">
                <PremiumBadgeIcon icon={Sparkles} size={10} /> {t("product.new")}
              </Badge>
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
          {product.price > 0 && (
            <div className="flex items-center gap-2 mt-1">
              {product.salePrice && product.salePrice > 0 ? (
                <>
                  <span className="text-sm font-bold text-primary">{formatPrice(product.salePrice)}</span>
                  <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-sm font-bold text-foreground">{formatPrice(product.price)}</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="mx-3.5 mb-3.5 flex gap-2">
        <Link
          to={`/urun/${product.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-bold hover:bg-muted transition-all duration-200 tap-scale"
        >
          <Eye size={14} className="text-primary drop-shadow-[0_1px_2px_hsl(var(--primary)/0.3)] filter brightness-110" />
          {t("product.view")}
        </Link>
        {product.inStock && product.price > 0 && (
          <Button
            size="sm"
            className="flex-1 rounded-xl text-xs font-bold gap-1.5 tap-scale"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={14} className="drop-shadow-[0_1px_2px_hsl(var(--primary-foreground)/0.4)] filter brightness-110" />
            {t("cart.addToCart")}
          </Button>
        )}
      </div>
    </motion.div>
  );
}
