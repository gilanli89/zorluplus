/**
 * Product Normalization Layer
 * Extracts and standardizes product attributes for consistent filtering.
 */
import { Product } from "./types";

export interface NormalizedAttributes {
  screenSize: number | null;       // e.g. 43, 55, 75
  panelType: string | null;        // e.g. "OLED", "QLED", "Neo QLED", "LED", "NanoCell", "QNED"
  btu: number | null;              // e.g. 9000, 12000
  capacityKg: number | null;       // e.g. 8, 9, 10
  capacityLt: number | null;       // e.g. 5, 10
  capacityPerson: number | null;   // e.g. 6 (kişilik)
  resolution: string | null;       // e.g. "4K", "8K", "Full HD"
}

export interface NormalizedProduct extends Product {
  _norm: NormalizedAttributes;
}

/* ─── Extractors ─── */

function extractScreenSize(name: string, specs: Record<string, string>): number | null {
  const text = name;
  
  // Pattern: 43" or 43" or 43″ or 43' 
  const m1 = text.match(/(\d{2,3})\s*[""″′'']/);
  if (m1) return Math.round(parseFloat(m1[1]));

  // Pattern: 43 inch, 43-inch, 43inç
  const m2 = text.match(/(\d{2,3})\s*[-]?\s*(?:inch|inç|inc)/i);
  if (m2) return Math.round(parseFloat(m2[1]));

  // Pattern: (80 cm) → derive inch: 80/2.54 ≈ 31.5 → 32
  const mCm = text.match(/\((\d{2,3})\s*cm\)/i);
  if (mCm) {
    const inch = Math.round(parseInt(mCm[1]) / 2.54);
    // Only use if it's a reasonable TV size
    if (inch >= 24 && inch <= 120) return inch;
  }

  // Check specs
  const specSize = specs["Ekran"] || specs["Ekran Boyutu"] || specs["Screen Size"] || "";
  const mSpec = specSize.match(/(\d{2,3})/);
  if (mSpec) return Math.round(parseFloat(mSpec[1]));

  return null;
}

function extractPanelType(name: string, description: string, specs: Record<string, string>): string | null {
  const text = `${name} ${description}`.toUpperCase();
  
  // Order matters: most specific first
  if (text.includes("NEO QLED")) return "Neo QLED";
  if (text.includes("QNED")) return "QNED";
  if (text.includes("QLED")) return "QLED";
  if (text.includes("OLED EVO")) return "OLED evo";
  if (text.includes("OLED")) return "OLED";
  if (text.includes("NANOCELL")) return "NanoCell";
  if (text.includes("CRYSTAL") || text.includes("KRİSTAL")) return "Crystal UHD";
  if (text.includes("LED TV") || text.includes("LED")) return "LED";

  // Check specs
  const panel = specs["Panel"] || specs["Panel Tipi"] || "";
  if (panel) return panel.trim();

  return null;
}

function extractResolution(name: string, description: string): string | null {
  const text = `${name} ${description}`.toUpperCase();
  if (text.includes("8K")) return "8K";
  if (text.includes("4K") || text.includes("UHD")) return "4K";
  if (text.includes("FULL HD") || text.includes("1080P")) return "Full HD";
  if (text.includes("HD READY") || text.includes("720P")) return "HD Ready";
  return null;
}

function extractBTU(name: string, description: string): number | null {
  const text = `${name} ${description}`;
  const m = text.match(/(\d{4,6})\s*BTU/i);
  return m ? parseInt(m[1]) : null;
}

function extractCapacity(name: string, description: string): { kg: number | null; lt: number | null; person: number | null } {
  const text = `${name} ${description}`;
  
  let kg: number | null = null;
  let lt: number | null = null;
  let person: number | null = null;

  const mKg = text.match(/(\d+(?:[.,]\d+)?)\s*(?:KG|kg|Kg)/);
  if (mKg) kg = parseFloat(mKg[1].replace(",", "."));

  const mLt = text.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|lt|L|Litre)\b/i);
  if (mLt) lt = parseFloat(mLt[1].replace(",", "."));

  const mPerson = text.match(/(\d+)\s*(?:Kişilik|kişilik)/i);
  if (mPerson) person = parseInt(mPerson[1]);

  return { kg, lt, person };
}

/* ─── Main Normalization ─── */

export function normalizeProduct(p: Product): NormalizedProduct {
  const cap = extractCapacity(p.name, p.description);
  
  return {
    ...p,
    brand: p.brand.trim(),
    _norm: {
      screenSize: extractScreenSize(p.name, p.specs),
      panelType: extractPanelType(p.name, p.description, p.specs),
      resolution: extractResolution(p.name, p.description),
      btu: extractBTU(p.name, p.description),
      capacityKg: cap.kg,
      capacityLt: cap.lt,
      capacityPerson: cap.person,
    },
  };
}

export function normalizeProducts(products: Product[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}

/* ─── Dynamic Filter Option Generation ─── */

export interface FilterOption {
  value: string;
  count: number;
  numericValue?: number; // for sorting
}

export interface DynamicFilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

function buildGroup(
  key: string,
  label: string,
  products: NormalizedProduct[],
  extractor: (p: NormalizedProduct) => string | null,
  numericSort = false
): DynamicFilterGroup | null {
  const counts: Record<string, { count: number; numVal?: number }> = {};
  
  for (const p of products) {
    const val = extractor(p);
    if (val) {
      if (!counts[val]) counts[val] = { count: 0 };
      counts[val].count++;
    }
  }
  
  const entries = Object.entries(counts);
  if (entries.length === 0) return null;

  const options: FilterOption[] = entries.map(([value, { count }]) => ({
    value,
    count,
    numericValue: numericSort ? parseFloat(value.replace(/[^\d.]/g, "")) || 0 : undefined,
  }));

  if (numericSort) {
    options.sort((a, b) => (a.numericValue || 0) - (b.numericValue || 0));
  } else {
    options.sort((a, b) => b.count - a.count);
  }

  return { key, label, options };
}

export function getDynamicFilters(products: NormalizedProduct[], categorySlug?: string, subSlug?: string): DynamicFilterGroup[] {
  const groups: DynamicFilterGroup[] = [];
  const slug = subSlug || categorySlug;

  // Brand - always show
  const brandGroup = buildGroup("brand", "filter.brand", products, p => p.brand || null);
  if (brandGroup) groups.push(brandGroup);

  // TV-specific
  if (slug === "tv-goruntu" || slug === "tv") {
    const sizeGroup = buildGroup("screenSize", "Ekran Boyutu", products, 
      p => p._norm.screenSize ? `${p._norm.screenSize}"` : null, true);
    if (sizeGroup) groups.push(sizeGroup);

    const panelGroup = buildGroup("panelType", "Panel Tipi", products, p => p._norm.panelType);
    if (panelGroup) groups.push(panelGroup);

    const resGroup = buildGroup("resolution", "Çözünürlük", products, p => p._norm.resolution);
    if (resGroup) groups.push(resGroup);
  }

  // Klima
  if (["klima-isitma", "klima", "split-klima", "portatif-klima"].includes(slug || "")) {
    const btuGroup = buildGroup("btu", "BTU", products, 
      p => p._norm.btu ? `${p._norm.btu} BTU` : null, true);
    if (btuGroup) groups.push(btuGroup);
  }

  // Beyaz Eşya
  if (["beyaz-esya", "camasir-makinesi", "kurutma-makinesi"].includes(slug || "")) {
    const kgGroup = buildGroup("capacityKg", "Kapasite", products,
      p => p._norm.capacityKg ? `${p._norm.capacityKg} KG` : null, true);
    if (kgGroup) groups.push(kgGroup);
  }

  if (["bulasik-makinesi"].includes(slug || "")) {
    const ltGroup = buildGroup("capacityLt", "Kapasite (LT)", products,
      p => p._norm.capacityLt ? `${p._norm.capacityLt} LT` : null, true);
    if (ltGroup) groups.push(ltGroup);
    
    const personGroup = buildGroup("capacityPerson", "Kapasite", products,
      p => p._norm.capacityPerson ? `${p._norm.capacityPerson} Kişilik` : null, true);
    if (personGroup) groups.push(personGroup);
  }

  if (["buzdolabi", "mini-buzdolabi", "derin-dondurucu"].includes(slug || "")) {
    const ltGroup = buildGroup("capacityLt", "Kapasite (LT)", products,
      p => p._norm.capacityLt ? `${p._norm.capacityLt} LT` : null, true);
    if (ltGroup) groups.push(ltGroup);
  }

  return groups;
}

/* ─── Filter Application using normalized data ─── */

export function applyNormalizedFilters(
  products: NormalizedProduct[],
  filters: Record<string, string[]>,
  inStock: boolean,
  sort: string
): NormalizedProduct[] {
  let result = products;

  // Apply each filter group with AND between groups, OR within
  for (const [key, selectedValues] of Object.entries(filters)) {
    if (!selectedValues || selectedValues.length === 0) continue;

    result = result.filter(p => {
      let productValue: string | null = null;

      switch (key) {
        case "brand":
          productValue = p.brand;
          break;
        case "screenSize":
          productValue = p._norm.screenSize ? `${p._norm.screenSize}"` : null;
          break;
        case "panelType":
          productValue = p._norm.panelType;
          break;
        case "resolution":
          productValue = p._norm.resolution;
          break;
        case "btu":
          productValue = p._norm.btu ? `${p._norm.btu} BTU` : null;
          break;
        case "capacityKg":
          productValue = p._norm.capacityKg ? `${p._norm.capacityKg} KG` : null;
          break;
        case "capacityLt":
          productValue = p._norm.capacityLt ? `${p._norm.capacityLt} LT` : null;
          break;
        case "capacityPerson":
          productValue = p._norm.capacityPerson ? `${p._norm.capacityPerson} Kişilik` : null;
          break;
      }

      // OR logic within group: product matches if its value is in selected values
      return productValue !== null && selectedValues.includes(productValue);
    });
  }

  if (inStock) result = result.filter(p => p.inStock);

  // Sort
  switch (sort) {
    case "price-asc": result = [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)); break;
    case "price-desc": result = [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)); break;
    case "newest": result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case "sale": result = result.filter(p => p.salePrice && p.salePrice < p.price); break;
  }

  return result;
}

/* ─── Debug info ─── */
export interface DebugInfo {
  productName: string;
  sku: string;
  raw: { name: string; description: string; specs: Record<string, string> };
  normalized: NormalizedAttributes;
  excluded: boolean;
  excludeReasons: string[];
}

export function getDebugInfo(
  products: NormalizedProduct[],
  filters: Record<string, string[]>,
  inStock: boolean
): DebugInfo[] {
  return products.map(p => {
    const reasons: string[] = [];

    for (const [key, selectedValues] of Object.entries(filters)) {
      if (!selectedValues || selectedValues.length === 0) continue;
      
      let val: string | null = null;
      switch (key) {
        case "brand": val = p.brand; break;
        case "screenSize": val = p._norm.screenSize ? `${p._norm.screenSize}"` : null; break;
        case "panelType": val = p._norm.panelType; break;
        case "resolution": val = p._norm.resolution; break;
        case "btu": val = p._norm.btu ? `${p._norm.btu} BTU` : null; break;
        case "capacityKg": val = p._norm.capacityKg ? `${p._norm.capacityKg} KG` : null; break;
        case "capacityLt": val = p._norm.capacityLt ? `${p._norm.capacityLt} LT` : null; break;
        case "capacityPerson": val = p._norm.capacityPerson ? `${p._norm.capacityPerson} Kişilik` : null; break;
      }

      if (val === null) {
        reasons.push(`${key}: değer bulunamadı (seçilen: ${selectedValues.join(", ")})`);
      } else if (!selectedValues.includes(val)) {
        reasons.push(`${key}: "${val}" seçili değil (seçilen: ${selectedValues.join(", ")})`);
      }
    }

    if (inStock && !p.inStock) reasons.push("Stokta yok");

    return {
      productName: p.name,
      sku: p.sku,
      raw: { name: p.name, description: p.description, specs: p.specs },
      normalized: p._norm,
      excluded: reasons.length > 0,
      excludeReasons: reasons,
    };
  });
}
