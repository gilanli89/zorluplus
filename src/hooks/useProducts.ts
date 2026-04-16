import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { slugify, normalizeCategorySlug, applyCategoryOverrides } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import { createClient } from "@supabase/supabase-js";
import type { Product } from "@/lib/types";

// Dedicated anon-only client for public product fetching.
// Never sends an auth token — prevents 401 errors when admin session JWT is expired.
const anonClient = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false, storageKey: "sb-anon-products" } }
);

function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  return url.replace("https://zorluplus.com/wp-content/", "https://cms.zorluplus.com/wp-content/");
}

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
  const brand = String(inv.brand || "");
  const rawCat = String(inv.category || "diger");
  const normalized = normalizeCategorySlug(rawCat);
  const { category, subcategory } = applyCategoryOverrides(name, brand, normalized.category, normalized.subcategory);
  return {
    id: sku || String(inv.id),
    sku,
    slug: sku ? `${slugify(sku)}-${slugify(name)}` : slugify(name),
    name,
    brand,
    category,
    subcategory,
    price: inv.original_price != null ? Number(inv.original_price) : 0,
    salePrice: inv.sale_price != null && Number(inv.sale_price) > 0 ? Number(inv.sale_price) : undefined,
    currency: "TL",
    image: normalizeImageUrl(inv.image_url as string) || "/placeholder.svg",
    images: inv.image_url ? [normalizeImageUrl(inv.image_url as string)] : ["/placeholder.svg"],
    description: String(inv.description || ""),
    specs: parseAttributes(inv.attributes),
    inStock: Boolean(inv.is_active),
    isNew: false,
    isFeatured: false,
    tags: [],
    createdAt: new Date().toISOString(),
  };
}

async function fetchProductsFromDB(): Promise<Product[]> {
  const { data: inventory, error } = await anonClient
    .from("inventory_public")
    .select("id,sku,product_name,brand,category,description,original_price,sale_price,quantity,is_active,image_url,attributes,updated_at");

  if (error) {
    console.error("Failed to fetch inventory:", error);
    throw error;
  }

  const products: Product[] = [];
  const seenKeys = new Set<string>();
  for (const inv of inventory ?? []) {
    if (!inv.is_active) continue;
    const dedupeKey = (inv.sku as string) || (inv.id as string);
    if (seenKeys.has(dedupeKey)) continue; // deduplicate by SKU or ID
    seenKeys.add(dedupeKey);
    const p = dbToProduct(inv as Record<string, unknown>);
    if (p.price > 0) products.push(p);
  }

  return products;
}

export function useProducts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('inventory-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inventory' },
        () => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsFromDB,
    staleTime: 2 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 3,
    placeholderData: (prev) => prev,
  });
}
