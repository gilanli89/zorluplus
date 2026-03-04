import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { CATEGORIES } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/products";
import { FilterState } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import FilterSheet, { applyFilters } from "@/components/FilterSheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const { categorySlug, subSlug } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const [filters, setFilters] = useState<FilterState>({ brands: [], inStock: false, attributes: {}, sort: "popular" });

  const category = CATEGORIES.find(c => c.slug === categorySlug);
  const subcategory = category?.children.find(s => s.slug === subSlug);
  const categoryProducts = useMemo(() => getProductsByCategory(products, categorySlug || "", subSlug), [products, categorySlug, subSlug]);
  const filteredProducts = useMemo(() => applyFilters(categoryProducts, filters), [categoryProducts, filters]);

  const title = subcategory?.name || category?.name || "Ürünler";

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-foreground">Ana Sayfa</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/kategori/${category.slug}`} className="hover:text-foreground">{category.name}</Link>
            {subcategory && <><span>/</span><span className="text-foreground">{subcategory.name}</span></>}
          </>
        )}
      </nav>

      <h1 className="font-display text-2xl font-bold mb-2 text-foreground">{title}</h1>

      {/* Subcategory chips */}
      {category && !subSlug && category.children.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {category.children.map(sub => (
            <Link
              key={sub.slug}
              to={`/kategori/${category.slug}/${sub.slug}`}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <FilterSheet products={categoryProducts} filters={filters} onFiltersChange={setFilters} />

      <p className="text-sm text-muted-foreground my-4">{filteredProducts.length} ürün bulundu</p>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] rounded-lg" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">Bu kriterlere uygun ürün bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
