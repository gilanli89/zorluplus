/**
 * Data-driven filter configuration for each category.
 * Instead of a hardcoded switch, each category slug maps to an array of filter field configs.
 * getDynamicFilters() in normalizeProducts.ts reads this config to build filter groups.
 */

export interface FilterFieldConfig {
  /** Key in NormalizedAttributes or product.specs */
  key: string;
  /** Turkish label */
  label: string;
  /** English label */
  labelEn: string;
  /** UI rendering type: enum=checkboxes, boolean=toggle, numeric=sorted checkboxes */
  type: "enum" | "boolean" | "numeric";
  /** Data source: "norm" = NormalizedAttributes, "specs" = product.specs */
  extractFrom: "norm" | "specs";
  /** Unit suffix for display (e.g., "inç", "Hz", "Watt") */
  unit?: string;
  /** Sort options numerically */
  numericSort?: boolean;
}

// Brand filter is always first - reusable
const BRAND: FilterFieldConfig = {
  key: "brand", label: "Marka", labelEn: "Brand", type: "enum", extractFrom: "norm",
};

const COLOR: FilterFieldConfig = {
  key: "color", label: "Renk", labelEn: "Color", type: "enum", extractFrom: "norm",
};

const INVERTER: FilterFieldConfig = {
  key: "inverter", label: "Inverter", labelEn: "Inverter", type: "boolean", extractFrom: "norm",
};

const WIFI: FilterFieldConfig = {
  key: "wifi", label: "Wi-Fi", labelEn: "Wi-Fi", type: "boolean", extractFrom: "norm",
};

// ═══════════════════════════════════════════════════════════════════════════
// FILTER PROFILES per category slug
// ═══════════════════════════════════════════════════════════════════════════

export const FILTER_PROFILES: Record<string, FilterFieldConfig[]> = {
  // ── TV & Ses ──────────────────────────────────────────────────────────
  televizyon: [
    BRAND,
    { key: "screenSize", label: "Ekran Boyutu", labelEn: "Screen Size", type: "numeric", extractFrom: "norm", unit: "inç", numericSort: true },
    { key: "resolution", label: "Çözünürlük", labelEn: "Resolution", type: "enum", extractFrom: "norm" },
    { key: "refreshRate", label: "Yenileme Hızı", labelEn: "Refresh Rate", type: "numeric", extractFrom: "norm", unit: "Hz", numericSort: true },
    { key: "panelType", label: "Panel Tipi", labelEn: "Panel Type", type: "enum", extractFrom: "norm" },
    { key: "os", label: "İşletim Sistemi", labelEn: "Operating System", type: "enum", extractFrom: "norm" },
    { key: "smartTv", label: "Smart TV", labelEn: "Smart TV", type: "boolean", extractFrom: "norm" },
    { key: "satellite", label: "Dahili Uydu Alıcı", labelEn: "Built-in Satellite", type: "boolean", extractFrom: "norm" },
    { key: "hdmiCount", label: "HDMI Sayısı", labelEn: "HDMI Ports", type: "enum", extractFrom: "norm" },
    { key: "usbCount", label: "USB Sayısı", labelEn: "USB Ports", type: "enum", extractFrom: "norm" },
    { key: "smartRemote", label: "Akıllı Kumanda", labelEn: "Smart Remote", type: "boolean", extractFrom: "norm" },
  ],

  projeksiyon: [
    BRAND,
    { key: "screenSize", label: "Ekran Boyutu", labelEn: "Screen Size", type: "numeric", extractFrom: "norm", unit: "inç", numericSort: true },
    { key: "resolution", label: "Çözünürlük", labelEn: "Resolution", type: "enum", extractFrom: "norm" },
    { key: "panelType", label: "Panel Tipi", labelEn: "Panel Type", type: "enum", extractFrom: "norm" },
    { key: "lumen", label: "Işık Gücü", labelEn: "Brightness", type: "numeric", extractFrom: "norm", unit: "Lümen", numericSort: true },
    { key: "smartTv", label: "Smart", labelEn: "Smart", type: "boolean", extractFrom: "norm" },
  ],

  "ses-sistemleri": [
    BRAND,
    { key: "modelType", label: "Model Tipi", labelEn: "Model Type", type: "enum", extractFrom: "norm" },
    { key: "watt", label: "Watt Gücü", labelEn: "Watt Power", type: "numeric", extractFrom: "norm", unit: "W", numericSort: true },
    { key: "powerType", label: "Güç Tipi", labelEn: "Power Type", type: "enum", extractFrom: "norm" },
  ],

  // ── TV Aksesuarlari ───────────────────────────────────────────────────
  "hdmi-kablo": [
    BRAND,
    { key: "cableLength", label: "Kablo Uzunluğu", labelEn: "Cable Length", type: "enum", extractFrom: "norm" },
  ],

  "tv-aski-aparati": [
    BRAND,
    { key: "mountType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "compatibleInch", label: "Uyumlu İnç Aralığı", labelEn: "Compatible Size", type: "enum", extractFrom: "norm" },
    { key: "vesa", label: "VESA", labelEn: "VESA", type: "enum", extractFrom: "norm" },
  ],

  kumanda: [
    BRAND,
    { key: "remoteType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
  ],

  // Fallback for tv-aksesuar parent
  "tv-aksesuar": [
    BRAND,
  ],

  // ── Beyaz Esya - Mutfak Grubu ─────────────────────────────────────────
  buzdolabi: [
    BRAND,
    { key: "fridgeType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    INVERTER,
    { key: "waterDispenser", label: "Su Pınarı", labelEn: "Water Dispenser", type: "boolean", extractFrom: "norm" },
    { key: "capacityLt", label: "Hacim", labelEn: "Volume", type: "numeric", extractFrom: "norm", unit: "Lt", numericSort: true },
    COLOR,
  ],

  "derin-dondurucu": [
    BRAND,
    { key: "freezerType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "capacityLt", label: "Hacim", labelEn: "Volume", type: "numeric", extractFrom: "norm", unit: "Lt", numericSort: true },
    INVERTER,
    COLOR,
  ],

  "bulasik-makinesi": [
    BRAND,
    { key: "applianceType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "programCount", label: "Program Sayısı", labelEn: "Programs", type: "numeric", extractFrom: "norm", numericSort: true },
    COLOR,
  ],

  "firin-ocak": [
    BRAND,
    { key: "ovenType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "material", label: "Malzeme", labelEn: "Material", type: "enum", extractFrom: "norm" },
    COLOR,
    { key: "capacityLt", label: "Hacim", labelEn: "Volume", type: "numeric", extractFrom: "norm", unit: "Lt", numericSort: true },
    { key: "programCount", label: "Program Sayısı", labelEn: "Programs", type: "numeric", extractFrom: "norm", numericSort: true },
  ],

  davlumbaz: [
    BRAND,
    { key: "suctionPower", label: "Emiş Gücü", labelEn: "Suction Power", type: "enum", extractFrom: "norm" },
    COLOR,
  ],

  // ── Beyaz Esya - Yikama Grubu ─────────────────────────────────────────
  "camasir-makinesi": [
    BRAND,
    { key: "capacityKg", label: "Kapasite", labelEn: "Capacity", type: "numeric", extractFrom: "norm", unit: "KG", numericSort: true },
    { key: "hasDryer", label: "Kurutmalı", labelEn: "Has Dryer", type: "boolean", extractFrom: "norm" },
    INVERTER,
    COLOR,
  ],

  "kurutma-makinesi": [
    BRAND,
    { key: "capacityKg", label: "Kapasite", labelEn: "Capacity", type: "numeric", extractFrom: "norm", unit: "KG", numericSort: true },
    INVERTER,
    COLOR,
  ],

  // ── Kucuk Ev Aletleri ─────────────────────────────────────────────────
  "air-fryer": [
    BRAND,
    { key: "capacityLt", label: "Kapasite", labelEn: "Capacity", type: "numeric", extractFrom: "norm", unit: "Lt", numericSort: true },
    { key: "capacityPerson", label: "Kişi Sayısı", labelEn: "Servings", type: "numeric", extractFrom: "norm", numericSort: true },
    WIFI,
  ],

  "kahve-makinesi": [
    BRAND,
    { key: "coffeeType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
  ],

  mikrodalga: [
    BRAND,
    { key: "applianceType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "grill", label: "Grill", labelEn: "Grill", type: "boolean", extractFrom: "norm" },
    { key: "capacityLt", label: "Hacim", labelEn: "Volume", type: "numeric", extractFrom: "norm", unit: "Lt", numericSort: true },
    COLOR,
  ],

  supurge: [
    BRAND,
    { key: "vacuumType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    COLOR,
  ],

  "su-sebili": [
    BRAND,
    { key: "dispenserType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
  ],

  // ── Iklimlendirme ─────────────────────────────────────────────────────
  klima: [
    BRAND,
    { key: "acType", label: "Tip", labelEn: "Type", type: "enum", extractFrom: "norm" },
    { key: "btu", label: "BTU", labelEn: "BTU", type: "numeric", extractFrom: "norm", numericSort: true },
    WIFI,
    COLOR,
  ],

  isitici: [
    BRAND,
    { key: "watt", label: "Watt Gücü", labelEn: "Watt Power", type: "numeric", extractFrom: "norm", unit: "W", numericSort: true },
    WIFI,
  ],

  ventilator: [
    BRAND,
    { key: "remoteControl", label: "Uzaktan Kumanda", labelEn: "Remote Control", type: "boolean", extractFrom: "norm" },
    COLOR,
  ],
};

/**
 * Get filter profile for a category slug.
 * Falls back to brand-only profile if no specific config exists.
 */
export function getFilterProfile(slug: string): FilterFieldConfig[] {
  return FILTER_PROFILES[slug] || [BRAND];
}
