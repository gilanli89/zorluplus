import { Product } from "./types";

/**
 * Generic accessory/cross-sell mapping for all product types.
 * Maps primary product subcategory → list of compatible accessory subcategories.
 */
const PRODUCT_ACCESSORIES: Record<string, string[]> = {
  // TV & Display
  "tv": ["tv-aski-aparatlari", "kumanda", "tv-aksesuar", "hdmi-kablo", "temizlik-urunleri", "voltaj-regulatoru", "soundbar"],
  
  // White Goods
  "buzdolabi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "mini-buzdolabi": ["voltaj-regulatoru"],
  "derin-dondurucu": ["voltaj-regulatoru"],
  "camasir-makinesi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "kurutma-makinesi": ["voltaj-regulatoru"],
  "bulasik-makinesi": ["voltaj-regulatoru", "temizlik-urunleri"],
  "su-sebili": ["temizlik-urunleri"],
  
  // Climate Control
  "klima": ["voltaj-regulatoru"],
  "split-klima": ["voltaj-regulatoru"],
  "portatif-klima": ["voltaj-regulatoru"],
  "isiticilar": ["voltaj-regulatoru"],
  
  // Built-in Appliances
  "firin": ["voltaj-regulatoru", "temizlik-urunleri"],
  "ocak": ["temizlik-urunleri"],
  "davlumbaz": ["temizlik-urunleri"],
  
  // Kitchen Appliances
  "mikrodalga": ["voltaj-regulatoru", "temizlik-urunleri"],
  "air-fryer": ["temizlik-urunleri"],
  "kahve-makinesi": ["temizlik-urunleri"],
  
  // Audio
  "bluetooth-hoparlor": ["kulaklik"],
  "soundbar": ["hdmi-kablo"],
  "kulaklik": ["bluetooth-hoparlor"],
};

/**
 * Compatibility label generators per product type.
 * Returns a human-readable badge text for each accessory.
 */
const COMPATIBILITY_LABELS: Record<string, (main: Product, accessory: Product) => string> = {
  "tv": (main, acc) => {
    const size = extractScreenSize(main);
    const accName = acc.name.toLowerCase();
    
    if (accName.includes("askı") || accName.includes("mount")) {
      return size ? `${size} inç uyumlu` : "Uyumlu TV Askısı";
    }
    if (accName.includes("hdmi")) return "Yüksek Hızlı HDMI 2.1";
    if (accName.includes("kumanda")) return main.brand ? `${main.brand} uyumlu` : "Uyumlu kumanda";
    if (accName.includes("soundbar")) return "TV ile uyumlu ses sistemi";
    if (accName.includes("voltaj") || accName.includes("regülatör")) return "TV koruma için önerilir";
    if (accName.includes("temizl")) return "Ekran temizleme kiti";
    return "Uyumlu aksesuar";
  },
  
  "buzdolabi": (main, acc) => {
    const accName = acc.name.toLowerCase();
    if (accName.includes("voltaj") || accName.includes("regülatör")) return "Buzdolabı koruması";
    if (accName.includes("temizl")) return "Buzdolabı temizleme";
    return "Uyumlu aksesuar";
  },
  
  "mini-buzdolabi": (main, acc) => {
    if (acc.name.toLowerCase().includes("voltaj")) return "Mini buzdolabı koruması";
    return "Uyumlu aksesuar";
  },
  
  "camasir-makinesi": (main, acc) => {
    const accName = acc.name.toLowerCase();
    if (accName.includes("voltaj")) return "Çamaşır makinesi koruması";
    if (accName.includes("temizl")) return "Çamaşır makinesi bakımı";
    return "Uyumlu aksesuar";
  },
  
  "klima": (main, acc) => {
    if (acc.name.toLowerCase().includes("voltaj")) return "Klima koruması";
    return "Uyumlu aksesuar";
  },
  
  "mikrodalga": (main, acc) => {
    const accName = acc.name.toLowerCase();
    if (accName.includes("voltaj")) return "Mikrodalga koruması";
    if (accName.includes("temizl")) return "Mikrodalga temizleme";
    return "Uyumlu aksesuar";
  },
  
  // Generic fallback for other types
  "default": (main, acc) => {
    const accName = acc.name.toLowerCase();
    if (accName.includes("voltaj")) return "Elektronik cihaz koruması";
    if (accName.includes("temizl")) return "Temizlik ürünü";
    return "Uyumlu aksesuar";
  },
};

function extractScreenSize(product: Product): string | null {
  const nameMatch = product.name.match(/(\d{2,3})\s*["''″]|(\d{2,3})\s*inç/i);
  if (nameMatch) return nameMatch[1] || nameMatch[2];

  // Check specs
  for (const [key, val] of Object.entries(product.specs || {})) {
    if (key.toLowerCase().includes("ekran") || key.toLowerCase().includes("boyut")) {
      const m = val.match(/(\d{2,3})/);
      if (m) return m[1];
    }
  }
  return null;
}

function isWallMountCompatible(mount: Product, tvSize: string | null): boolean {
  if (!tvSize) return true;
  const size = parseInt(tvSize);
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
 * Returns cross-sell accessories for ANY product type (generalized, not just TV).
 * Works for TV, buzdolabı, klima, çamaşır makinesi, etc.
 */
export function getProductCrossSellItems(
  currentProduct: Product,
  allProducts: Product[],
  maxItems = 6
): CrossSellItem[] {
  const subcategory = currentProduct.subcategory;
  if (!subcategory) return [];
  
  // Get compatible accessory subcategories for this product type
  const accessorySubcats = PRODUCT_ACCESSORIES[subcategory];
  if (!accessorySubcats || accessorySubcats.length === 0) return [];
  
  const results: CrossSellItem[] = [];
  const usedIds = new Set<string>([currentProduct.id]);
  
  // Get compatibility label generator (product-type-specific or default)
  const labelGen = COMPATIBILITY_LABELS[subcategory] || COMPATIBILITY_LABELS["default"];
  
  // Find accessories in each compatible subcategory
  for (const accSubcat of accessorySubcats) {
    const candidates = allProducts.filter(p => {
      if (usedIds.has(p.id)) return false;
      if (!p.inStock) return false;
      if (p.price <= 0) return false;
      if (p.subcategory !== accSubcat) return false;
      
      // Special logic for TV wall mounts (size compatibility)
      if (subcategory === "tv" && accSubcat === "tv-aski-aparatlari") {
        const tvSize = extractScreenSize(currentProduct);
        if (!isWallMountCompatible(p, tvSize)) return false;
      }
      
      // Special logic for remotes (brand match)
      if (accSubcat === "kumanda" && currentProduct.brand) {
        const brandMatch = p.name.toLowerCase().includes(currentProduct.brand.toLowerCase());
        if (!brandMatch) return false;
      }
      
      return true;
    });
    
    // Sort: prefer same brand, then by price
    candidates.sort((a, b) => {
      const aBrand = a.brand === currentProduct.brand ? -1 : 0;
      const bBrand = b.brand === currentProduct.brand ? -1 : 0;
      if (aBrand !== bBrand) return aBrand - bBrand;
      return a.price - b.price;
    });
    
    // Pick top items (prioritize variety: 1-2 per accessory type)
    const maxPerType = accSubcat === "tv-aski-aparatlari" ? 2 : 1;
    const picked = candidates.slice(0, maxPerType);
    
    for (const p of picked) {
      usedIds.add(p.id);
      results.push({
        product: p,
        compatibilityLabel: labelGen(currentProduct, p),
        priority: accessorySubcats.indexOf(accSubcat), // Order by accessory list
      });
    }
  }
  
  return results
    .sort((a, b) => a.priority - b.priority)
    .slice(0, maxItems);
}

/**
 * Legacy function name for backwards compatibility.
 * Now just calls the generalized function.
 */
export function getTVCrossSellItems(
  currentProduct: Product,
  allProducts: Product[],
  maxItems = 6
): CrossSellItem[] {
  return getProductCrossSellItems(currentProduct, allProducts, maxItems);
}

/**
 * Returns 2-3 quick upsell accessories for cart items.
 * Now works for any product type, not just TV.
 */
export function getCartUpsellItems(
  cartProductIds: string[],
  allProducts: Product[],
  maxItems = 3
): CrossSellItem[] {
  const cartProducts = allProducts.filter(p => cartProductIds.includes(p.id));
  
  // Prioritize products with accessories (TV, buzdolabı, klima, etc)
  const eligibleProducts = cartProducts.filter(p => 
    p.subcategory && PRODUCT_ACCESSORIES[p.subcategory]
  );
  
  if (eligibleProducts.length === 0) return [];
  
  // Get cross-sell for the first eligible product
  const allCrossSell = getProductCrossSellItems(eligibleProducts[0], allProducts, maxItems + cartProductIds.length);
  return allCrossSell
    .filter(item => !cartProductIds.includes(item.product.id))
    .slice(0, maxItems);
}
