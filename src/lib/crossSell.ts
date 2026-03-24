import { Product } from "./types";

/**
 * Accessory type definitions with matching keywords and priority.
 * Lower priority number = shown first.
 */
interface AccessoryType {
  id: string;
  label: string;
  keywords: string[];
  categories: string[]; // category slugs to search in
  subcategories: string[]; // subcategory slugs to search in
  priority: number;
  compatibilityLabel?: (tv: Product) => string;
}

const TV_ACCESSORY_TYPES: AccessoryType[] = [
  {
    id: "wall-mount",
    label: "TV Askı Aparatı",
    keywords: ["askı", "aparat", "mount", "brateck"],
    categories: ["tv-goruntu", "aksesuar"],
    subcategories: ["duvar-masaustu-aparatlari", "tv-aski-aparatlari"],
    priority: 1,
    compatibilityLabel: (tv) => {
      const size = extractScreenSize(tv);
      return size ? `${size} inç uyumlu` : "Uyumlu TV Askısı";
    },
  },
  {
    id: "hdmi",
    label: "HDMI Kablo",
    keywords: ["hdmi"],
    categories: ["tv-goruntu", "aksesuar", "oyun"],
    subcategories: ["tv-aksesuar", "oyun-aksesuar"],
    priority: 2,
    compatibilityLabel: () => "Yüksek Hızlı HDMI 2.1",
  },
  {
    id: "voltage-regulator",
    label: "Voltaj Regülatörü",
    keywords: ["voltaj", "regülatör", "regulator"],
    categories: ["diger", "aksesuar"],
    subcategories: [],
    priority: 3,
    compatibilityLabel: () => "TV koruma için önerilir",
  },
  {
    id: "soundbar",
    label: "Soundbar",
    keywords: ["soundbar"],
    categories: ["ses-sistemleri", "tv-goruntu"],
    subcategories: ["soundbar"],
    priority: 4,
    compatibilityLabel: () => "TV ile uyumlu ses sistemi",
  },
  {
    id: "cleaning",
    label: "Temizleme Kiti",
    keywords: ["temizl", "cleaning"],
    categories: ["aksesuar"],
    subcategories: ["temizlik-urunleri"],
    priority: 5,
    compatibilityLabel: () => "Ekran temizleme kiti",
  },
  {
    id: "remote",
    label: "Kumanda",
    keywords: ["kumanda", "remote"],
    categories: ["tv-goruntu", "aksesuar"],
    subcategories: ["tv-aksesuar"],
    priority: 6,
    compatibilityLabel: (tv) => tv.brand ? `${tv.brand} uyumlu` : "Uyumlu kumanda",
  },
  {
    id: "satellite",
    label: "Uydu Ekipmanı",
    keywords: ["lnb", "uydu", "digiturk"],
    categories: ["aksesuar"],
    subcategories: ["uydu-ekipman"],
    priority: 7,
    compatibilityLabel: () => "Uydu alıcı ekipmanı",
  },
];

function extractScreenSize(product: Product): string | null {
  const nameMatch = product.name.match(/(\d{2,3})\s*["''″]|(\d{2,3})\s*inç/i);
  if (nameMatch) return nameMatch[1] || nameMatch[2];

  // Check specs
  for (const [key, val] of Object.entries(product.specs)) {
    if (key.toLowerCase().includes("ekran") || key.toLowerCase().includes("boyut")) {
      const m = val.match(/(\d{2,3})/);
      if (m) return m[1];
    }
  }
  return null;
}

function isWallMountCompatible(mount: Product, tvSize: string | null): boolean {
  if (!tvSize) return true; // no data, show it
  const size = parseInt(tvSize);
  // Try to extract range from mount name e.g. "(42–50")"
  const rangeMatch = mount.name.match(/(\d{2,3})\s*[–\-]\s*(\d{2,3})/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]);
    const max = parseInt(rangeMatch[2]);
    return size >= min && size <= max;
  }
  return true;
}

export interface CrossSellItem {
  product: Product;
  compatibilityLabel: string;
  priority: number;
}

/**
 * Returns cross-sell accessories for a TV product.
 */
export function getTVCrossSellItems(
  currentProduct: Product,
  allProducts: Product[],
  maxItems = 6
): CrossSellItem[] {
  // Only for TV products
  if (currentProduct.subcategory !== "tv" && currentProduct.category !== "tv-goruntu") {
    // Check if it's actually a TV by name
    const nameLower = currentProduct.name.toLowerCase();
    if (!nameLower.includes("televizyon") && !nameLower.includes(" tv ") && !nameLower.endsWith(" tv")) {
      return [];
    }
  }
  // Skip if current product IS an accessory
  if (currentProduct.subcategory !== "tv") return [];

  const tvSize = extractScreenSize(currentProduct);
  const results: CrossSellItem[] = [];
  const usedIds = new Set<string>([currentProduct.id]);

  for (const accType of TV_ACCESSORY_TYPES) {
    // Find matching products
    const candidates = allProducts.filter(p => {
      if (usedIds.has(p.id)) return false;
      if (!p.inStock) return false;
      if (p.price <= 0) return false;

      const nameLower = p.name.toLowerCase();

      // Check if product matches this accessory type
      const keywordMatch = accType.keywords.some(kw => nameLower.includes(kw));
      const categoryMatch =
        accType.subcategories.includes(p.subcategory) ||
        accType.categories.includes(p.category);

      if (!keywordMatch && !categoryMatch) return false;
      // At least one must match
      if (!keywordMatch && !categoryMatch) return false;

      // For wall mounts, check size compatibility
      if (accType.id === "wall-mount" && !isWallMountCompatible(p, tvSize)) return false;

      // For remotes, prefer same brand
      if (accType.id === "remote" && currentProduct.brand) {
        const brandMatch = nameLower.includes(currentProduct.brand.toLowerCase());
        if (!brandMatch) return false;
      }

      return true;
    });

    // Sort: prefer same brand, then by price (ascending for cables, mid-range for mounts)
    candidates.sort((a, b) => {
      const aBrand = a.brand === currentProduct.brand ? -1 : 0;
      const bBrand = b.brand === currentProduct.brand ? -1 : 0;
      if (aBrand !== bBrand) return aBrand - bBrand;
      return a.price - b.price;
    });

    // Pick top 1-2 per type
    const maxPerType = accType.id === "hdmi" ? 1 : accType.id === "wall-mount" ? 2 : 1;
    const picked = candidates.slice(0, maxPerType);

    for (const p of picked) {
      usedIds.add(p.id);
      results.push({
        product: p,
        compatibilityLabel: accType.compatibilityLabel?.(currentProduct) || "",
        priority: accType.priority,
      });
    }
  }

  return results
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxItems);
}

/**
 * Returns 2-3 quick upsell accessories for TV items in cart.
 */
export function getCartUpsellItems(
  cartProductIds: string[],
  allProducts: Product[],
  maxItems = 3
): CrossSellItem[] {
  const cartProducts = allProducts.filter(p => cartProductIds.includes(p.id));
  const tvProducts = cartProducts.filter(
    p => p.subcategory === "tv"
  );

  if (tvProducts.length === 0) return [];

  // Get cross-sell for the first TV, exclude items already in cart
  const allCrossSell = getTVCrossSellItems(tvProducts[0], allProducts, maxItems + cartProductIds.length);
  return allCrossSell
    .filter(item => !cartProductIds.includes(item.product.id))
    .slice(0, maxItems);
}
