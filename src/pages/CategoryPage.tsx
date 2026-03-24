import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/products";
import { FilterState } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { FilterSidebar, MobileFilterTrigger, SortBar, useNormalizedFiltering } from "@/components/FilterSheet";
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

export default function CategoryPage() {
  const { t } = useLanguage();
  const { categorySlug, subSlug } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const [filters, setFilters] = useState<FilterState>({ brands: [], inStock: false, attributes: {}, sort: "popular" });

  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const subcategory = category?.children.find(s => s.slug === subSlug);
  const categoryProducts = useMemo(() => getProductsByCategory(products, categorySlug || "", subSlug), [products, categorySlug, subSlug]);
  const { filtered: filteredProducts, debugInfo } = useNormalizedFiltering(categoryProducts, filters, categorySlug, subSlug);

  const catName = category ? (t(`cat.${category.slug}`) !== `cat.${category.slug}` ? t(`cat.${category.slug}`) : category.name) : "";
  const title = subcategory?.name || catName || t("general.products");

  return (
    <div className="container py-6 md:py-8">
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
        <Link to="/" className="hover:text-foreground transition-colors">{t("general.homePage")}</Link>
        <span className="text-border">/</span>
        {category && (
          <>
            <Link to={`/kategori/${category.slug}`} className="hover:text-foreground transition-colors">{catName}</Link>
            {subcategory && <><span className="text-border">/</span><span className="text-foreground font-medium">{subcategory.name}</span></>}
          </>
        )}
      </nav>

      <CategoryIconBar />

      <h1 className="font-display text-2xl md:text-3xl font-bold mb-3 text-foreground">{title}</h1>

      {category && !subSlug && category.children.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {category.children.map(sub => (
            <Link key={sub.slug} to={`/kategori/${category.slug}/${sub.slug}`} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all">
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        <FilterSidebar products={categoryProducts} filters={filters} onFiltersChange={setFilters} categorySlug={categorySlug} subSlug={subSlug} />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <MobileFilterTrigger products={categoryProducts} filters={filters} onFiltersChange={setFilters} categorySlug={categorySlug} subSlug={subSlug} />
            <SortBar filters={filters} onFiltersChange={setFilters} />
            <span className="ml-auto text-sm text-muted-foreground">{filteredProducts.length} {t("general.products")}</span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {Array.from({ length: 9 }).map((_, i) => (<Skeleton key={i} className="aspect-[3/4] rounded-2xl" />))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Bu filtrelere uygun ürün bulunamadı</p>
              <button
                onClick={() => setFilters({ brands: [], inStock: false, attributes: {}, sort: "popular" })}
                className="mt-3 text-sm text-primary hover:underline"
              >
                Filtreleri temizle
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
              {filteredProducts.map((p, i) => (
                <motion.div key={p.id} custom={i} initial="hidden" animate="visible" variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FilterDebugPanel debugInfo={debugInfo} />
    </div>
  );
}
