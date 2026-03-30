import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/products";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/types";

type InventoryRow = {
  sku: string | null;
  quantity: number;
  original_price: number | null;
  sale_price: number | null;
  is_active: boolean;
};

async function fetchProductsWithInventory(): Promise<Product[]> {
  // Fetch CSV products and DB inventory (public view) in parallel
  const [products, inventoryResult] = await Promise.all([
    fetchProducts(),
    supabase.from("inventory_public" as any).select("sku, quantity, original_price, sale_price, is_active"),
  ]);

  const inventory = (inventoryResult.data ?? []) as unknown as InventoryRow[];
  
  if (inventory.length === 0) return products;

  // Build lookup by SKU
  const invMap = new Map(inventory.map(i => [i.sku, i]));

  return products
    .map(p => {
      const inv = invMap.get(p.sku);
      if (!inv) return p;

      // Override with DB values
      return {
        ...p,
        price: inv.original_price != null ? Number(inv.original_price) : p.price,
        salePrice: inv.sale_price != null && Number(inv.sale_price) > 0 
          ? Number(inv.sale_price) 
          : p.salePrice,
        inStock: inv.is_active && inv.quantity > 0,
      };
    })
    .filter(p => {
      // Hide products explicitly deactivated in inventory
      const inv = invMap.get(p.sku);
      return inv ? inv.is_active : true;
    });
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsWithInventory,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}
