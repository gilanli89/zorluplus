import { useQuery } from "@tanstack/react-query";
import { fetchProducts, slugify } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/types";

function parseAttributes(attrs: unknown): Record<string, string> {
  if (!attrs || typeof attrs !== "object") return {};
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(attrs as Record<string, unknown>)) {
    if (v != null) {
      const cleanKey = k.replace(/^pa_/, "").replace(/-/g, " ");
      result[cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1)] = String(v);
    }
  }
  return result;
}

function dbToProduct(inv: Record<string, unknown>): Product {
  const sku = String(inv.sku || "");
  const name = String(inv.product_name || "Ürün");
  return {
    id: sku || String(inv.id),
    sku,
    slug: `${slugify(sku)}-${slugify(name)}`,
    name,
    brand: String(inv.brand || ""),
    category: String(inv.category || "diger"),
    subcategory: "",
    price: inv.original_price != null ? Number(inv.original_price) : 0,
    salePrice: inv.sale_price != null && Number(inv.sale_price) > 0 ? Number(inv.sale_price) : undefined,
    currency: "TL",
    image: String(inv.image_url || "/placeholder.svg"),
    images: inv.image_url ? [String(inv.image_url)] : ["/placeholder.svg"],
    description: String(inv.description || ""),
    specs: parseAttributes(inv.attributes),
    inStock: Boolean(inv.is_active) && Number(inv.quantity) > 0,
    isNew: false,
    isFeatured: false,
    tags: [],
    createdAt: new Date().toISOString(),
  };
}

async function fetchProductsWithInventory(): Promise<Product[]> {
  const [csvProducts, inventoryResult] = await Promise.all([
    fetchProducts(),
    supabase.from("inventory_public").select("*"),
  ]);

  const inventory = inventoryResult.data ?? [];
  if (inventory.length === 0) return csvProducts;

  // Build lookup maps
  const invMap = new Map(inventory.filter(i => i.sku).map(i => [i.sku!, i]));
  const csvMap = new Map(csvProducts.map(p => [p.sku, p]));

  const merged: Product[] = [];
  const seenSkus = new Set<string>();

  // 1. Process all CSV products, override with DB where available
  for (const csvP of csvProducts) {
    seenSkus.add(csvP.sku);
    const inv = invMap.get(csvP.sku);
    if (!inv) {
      merged.push(csvP);
      continue;
    }
    // DB overrides CSV for all non-null fields
    if (!inv.is_active) continue; // skip deactivated
    merged.push({
      ...csvP,
      name: inv.product_name || csvP.name,
      brand: inv.brand || csvP.brand,
      category: inv.category || csvP.category,
      description: inv.description || csvP.description,
      image: inv.image_url || csvP.image,
      images: inv.image_url ? [inv.image_url, ...csvP.images.filter(i => i !== inv.image_url)] : csvP.images,
      price: inv.original_price != null ? Number(inv.original_price) : csvP.price,
      salePrice: inv.sale_price != null && Number(inv.sale_price) > 0
        ? Number(inv.sale_price)
        : csvP.salePrice,
      specs: inv.attributes && Object.keys(inv.attributes as object).length > 0
        ? { ...csvP.specs, ...parseAttributes(inv.attributes) }
        : csvP.specs,
      inStock: inv.is_active !== false && (inv.quantity ?? 0) > 0,
    });
  }

  // 2. DB-only products (not in CSV)
  for (const inv of inventory) {
    if (!inv.sku || seenSkus.has(inv.sku)) continue;
    if (!inv.is_active) continue;
    const p = dbToProduct(inv as Record<string, unknown>);
    if (p.price > 0) merged.push(p);
  }

  return merged;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsWithInventory,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
