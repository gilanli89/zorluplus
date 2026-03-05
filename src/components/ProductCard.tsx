import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} sepete eklendi`, { duration: 2000 });
    navigate("/sepet");
  };

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
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* Add to Cart Button */}
      {product.inStock ? (
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-1.5 mx-3.5 mb-3.5 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all duration-200 shadow-sm tap-scale"
        >
          <ShoppingCart size={14} />
          Sepete Ekle
        </button>
      ) : (
        <div className="mx-3.5 mb-3.5 py-2.5 rounded-xl bg-muted text-muted-foreground text-xs font-bold text-center">
          Stokta Yok
        </div>
      )}
    </motion.div>
  );
}
