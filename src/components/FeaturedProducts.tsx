import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Flame, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function FeaturedProducts() {
  const { t } = useLanguage();
  const { data: products = [], isLoading } = useProducts();

  const featured = useMemo(() => {
    const feat = products.filter(p => p.isFeatured && p.inStock);
    return feat.length >= 4 ? feat.slice(0, 8) : products.filter(p => p.inStock && p.price > 0).slice(0, 8);
  }, [products]);

  if (!isLoading && featured.length === 0) return null;

  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <motion.div
          className="flex items-end justify-between mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <h2 className="heading-2 text-foreground pulse-heading">
              {t("home.featuredProducts") || "Popüler Ürünler"}
            </h2>
            <Badge className="hidden sm:inline-flex text-[10px] rounded-full px-3 py-1 gap-1 bg-rose-500 hover:bg-rose-600 text-white border-0 shadow-[0_2px_8px_-2px_rgba(244,63,94,0.4)] animate-pulse font-bold">
              <Flame size={12} /> FIRSATLAR
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              {t("home.featuredProductsDesc") || "En çok tercih edilen ürünlerimiz"}
            </p>
          </div>
          <Link to="/kategoriler" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-4">
            {t("general.viewAll")} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : featured.map((p, i) => (
                <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ))
          }
        </div>

        <div className="text-center mt-6 sm:hidden">
          <Link to="/kategoriler">
            <Button variant="outline" className="rounded-full tap-scale">
              {t("general.viewAll")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
