import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { FilterState } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import { FilterSidebar, MobileFilterTrigger, SortBar, applyFilters } from "@/components/FilterSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { icons } from "lucide-react";

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

  const filteredProducts = useMemo(() => applyFilters(products, filters), [products, filters]);

  return (
    <div className="container py-6 md:py-8">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link to="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
        <span className="text-border">/</span>
        <span className="text-foreground font-medium">Mağaza</span>
      </nav>

      {/* Category icons - sticky */}
      <div className="sticky top-[88px] z-30 bg-background/95 backdrop-blur-sm -mx-4 px-4 py-2 mb-3">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CATEGORIES.map((cat, i) => {
          const IconComp = icons[cat.icon as keyof typeof icons];
          return (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <Link
                to={`/kategori/${cat.slug}`}
                className="flex flex-col items-center gap-1.5 min-w-[72px] rounded-xl border border-border bg-card px-3 py-3 text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all tap-scale"
              >
                {IconComp && <IconComp className="h-5 w-5" />}
                <span className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap">{cat.name}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>


      <div className="flex gap-6">
        <FilterSidebar products={products} filters={filters} onFiltersChange={setFilters} />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <MobileFilterTrigger products={products} filters={filters} onFiltersChange={setFilters} />
            <SortBar filters={filters} onFiltersChange={setFilters} />
            <span className="ml-auto text-sm text-muted-foreground">{filteredProducts.length} ürün</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Bu kriterlere uygun ürün bulunamadı.</p>
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
