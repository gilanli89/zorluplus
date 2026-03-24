import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { FilterState } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { FilterSidebar, MobileFilterTrigger, SortBar, applyFilters } from "@/components/FilterSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import CategoryIconBar from "@/components/CategoryIconBar";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function ShopPage() {
  const { data: products = [], isLoading } = useProducts();
  const [filters, setFilters] = useState<FilterState>({ brands: [], inStock: false, attributes: {}, sort: "popular" });
  const { t } = useLanguage();

  const filteredProducts = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <div className="container py-6 md:py-8">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link to="/" className="hover:text-foreground transition-colors">{t("general.homePage")}</Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">{t("shop.title")}</span>
      </nav>

      <CategoryIconBar />


      <div className="flex gap-6">
        <FilterSidebar products={products} filters={filters} onFiltersChange={setFilters} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <MobileFilterTrigger products={products} filters={filters} onFiltersChange={setFilters} />
            <SortBar filters={filters} onFiltersChange={setFilters} />
            <span className="ml-auto text-sm text-muted-foreground">{filteredProducts.length} {t("general.products")}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">{t("general.noProducts")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
