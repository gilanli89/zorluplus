import { useState, useMemo, useCallback } from "react";
import { PRODUCTS as ENRICHED_PRODUCTS, Product as EnrichedProduct } from "@/data/products";
import { getFilterConfig, CategoryFilterConfig } from "@/data/filterTree";
import { getFilterConfigId } from "@/data/categoryFilterMap";
import type { Product } from "@/lib/types";

export interface ActiveFilters {
  [key: string]: string[] | [number, number] | boolean | null;
}

export type SortByOption = "featured" | "price_asc" | "price_desc" | "newest";

// Build SKU lookup for enriched attrs
const enrichedBySku = new Map<string, EnrichedProduct>();
const enrichedByName = new Map<string, EnrichedProduct>();
ENRICHED_PRODUCTS.forEach((p) => {
  if (p.sku) enrichedBySku.set(p.sku, p);
  enrichedByName.set(p.name.toLowerCase(), p);
});

/** Get enriched attrs for a CSV product */
export function getProductAttrs(product: Product): Record<string, string | number | boolean> {
  const enriched = enrichedBySku.get(product.sku) || enrichedByName.get(product.name.toLowerCase());
  if (enriched) return enriched.attrs;

  // Fallback: extract brand as an attr
  const attrs: Record<string, string | number | boolean> = {};
  if (product.brand) attrs.brand = product.brand;
  return attrs;
}

export function useProductFilter(
  products: Product[],
  categorySlug?: string,
  subSlug?: string
) {
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [sortBy, setSortBy] = useState<SortByOption>("featured");

  const filterConfigId = getFilterConfigId(categorySlug, subSlug);
  const config = filterConfigId ? getFilterConfig(filterConfigId) : undefined;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Determine which keys are range filters (from config)
    const rangeKeys = new Set<string>();
    if (config) {
      config.filters.forEach(f => {
        if (f.type === "price_range" || f.type === "size_range") {
          rangeKeys.add(f.key);
        }
      });
    }
    rangeKeys.add("price"); // always treat price as range

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return;

      if (rangeKeys.has(key) && Array.isArray(value) && value.length === 2) {
        const [min, max] = value as [number, number];
        if (key === "price") {
          result = result.filter(
            (p) => (p.salePrice || p.price) >= min && (p.salePrice || p.price) <= max
          );
        } else {
          // Generic range filter on enriched attrs
          result = result.filter((p) => {
            const attrs = getProductAttrs(p);
            const attrVal = attrs[key];
            if (attrVal === undefined) return true; // don't exclude if attr missing
            const numVal = typeof attrVal === "number" ? attrVal : parseFloat(String(attrVal));
            if (isNaN(numVal)) return true;
            return numVal >= min && numVal <= max;
          });
        }
      } else if (key === "brand" && Array.isArray(value)) {
        result = result.filter((p) => {
          const brandUpper = p.brand.toUpperCase();
          return (value as string[]).some(
            (v) => v.toUpperCase() === brandUpper
          );
        });
      } else if (key === "in_stock") {
        if (value) result = result.filter((p) => p.inStock);
      } else if (key === "on_sale") {
        if (value)
          result = result.filter(
            (p) => p.salePrice !== undefined && p.salePrice < p.price
          );
      } else if (Array.isArray(value) && value.length > 0) {
        // Generic attribute filter using enriched attrs
        result = result.filter((p) => {
          const attrs = getProductAttrs(p);
          const attrVal = attrs[key];
          if (attrVal === undefined) return false;
          const strVal =
            typeof attrVal === "boolean"
              ? attrVal
                ? "Evet"
                : "Hayır"
              : String(attrVal);
          return (value as string[]).some(
            (v) => v.toLowerCase() === strVal.toLowerCase()
          );
        });
      }
    });

    // Sort
    switch (sortBy) {
      case "price_asc":
        result.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
        break;
      case "price_desc":
        result.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
        break;
      case "newest":
        result.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const toggleFilter = useCallback((key: string, value: string) => {
    setActiveFilters((prev) => {
      const current = (prev[key] as string[]) || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next.length > 0 ? next : null };
    });
  }, []);

  const setToggleFilter = useCallback((key: string, enabled: boolean) => {
    setActiveFilters((prev) => ({ ...prev, [key]: enabled || null }));
  }, []);

  const setRangeFilter = useCallback((key: string, min: number, max: number) => {
    setActiveFilters((prev) => ({ ...prev, [key]: [min, max] }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setRangeFilter("price", min, max);
  }, [setRangeFilter]);

  const clearFilters = useCallback(() => {
    setActiveFilters({});
    setSortBy("featured");
  }, []);

  const activeCount = useMemo(
    () =>
      Object.values(activeFilters).filter(
        (v) => v !== null && (Array.isArray(v) ? v.length > 0 : true)
      ).length,
    [activeFilters]
  );

  return {
    config,
    filteredProducts,
    activeFilters,
    activeCount,
    sortBy,
    setSortBy,
    toggleFilter,
    setToggleFilter,
    setPriceRange,
    clearFilters,
    totalInCategory: products.length,
  };
}
