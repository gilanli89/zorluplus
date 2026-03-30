/**
 * Product Normalization Layer
 * Extracts and standardizes product attributes for consistent filtering.
 */
import { Product } from "./types";
import { getFilterProfile, FilterFieldConfig } from "./filterConfig";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */

export interface NormalizedAttributes {
  // TV
  screenSize: number | null;
  panelType: string | null;
  resolution: string | null;
  refreshRate: number | null;
  os: string | null;
  smartTv: boolean | null;
  satellite: boolean | null;
  smartRemote: boolean | null;
  lumen: number | null;
  hdmiCount: string | null;
  usbCount: string | null;

  // Audio
  modelType: string | null;
  watt: number | null;
  powerType: string | null;

  // Accessories
  cableLength: string | null;
  mountType: string | null;
  compatibleInch: string | null;
  vesa: string | null;
  remoteType: string | null;

  // White Goods
  btu: number | null;
  capacityKg: number | null;
  capacityLt: number | null;
  capacityPerson: number | null;
  fridgeType: string | null;
  freezerType: string | null;
  applianceType: string | null;
  inverter: boolean | null;
  waterDispenser: boolean | null;
  color: string | null;
  material: string | null;
  programCount: number | null;
  suctionPower: string | null;
  ovenType: string | null;
  hasDryer: boolean | null;

  // Small Appliances
  coffeeType: string | null;
  grill: boolean | null;
  vacuumType: string | null;
  dispenserType: string | null;

  // HVAC
  acType: string | null;
  wifi: boolean | null;
  remoteControl: boolean | null;
}

export interface NormalizedProduct extends Product {
  _norm: NormalizedAttributes;
}

export interface FilterOption {
  value: string;
  count: number;
  numericValue?: number;
}

export interface FilterGroup {
  key: string;
  label: string;
  type?: "enum" | "boolean" | "numeric";
  options: { value: string; count: number }[];
}

/** @deprecated Use FilterGroup instead */
export type DynamicFilterGroup = FilterGroup;

/* ═══════════════════════════════════════════════════════════════════════════
   BOOLEAN FIELD SET (used for filter matching)
   ═══════════════════════════════════════════════════════════════════════════ */

const BOOLEAN_FIELDS = new Set<keyof NormalizedAttributes>([
  "smartTv", "satellite", "smartRemote", "inverter", "waterDispenser",
  "hasDryer", "grill", "wifi", "remoteControl",
]);

const NUMERIC_FIELDS_WITH_UNIT: Record<string, string> = {
  screenSize: '"',
  refreshRate: " Hz",
  lumen: " Lümen",
  watt: " W",
  btu: " BTU",
  capacityKg: " KG",
  capacityLt: " Lt",
  capacityPerson: " Kişilik",
  programCount: "",
};

/* ═══════════════════════════════════════════════════════════════════════════
   SINGLE-PASS ATTRIBUTE EXTRACTION
   ═══════════════════════════════════════════════════════════════════════════ */

function extractAllAttributes(product: Product): NormalizedAttributes {
  const name = product.name || "";
  const desc = product.description || "";
  const specs = product.specs || {};

  // Build combined text for searching
  const specsText = Object.entries(specs).map(([k, v]) => `${k}: ${v}`).join(" ");
  const allText = `${name} ${desc} ${specsText}`;
  const allUpper = allText.toUpperCase();
  const nameUpper = name.toUpperCase();
  const nameDescUpper = `${name} ${desc}`.toUpperCase();
  const nameDesc = `${name} ${desc}`;

  // Helper: find a spec value by partial key match (case-insensitive)
  const findSpec = (partial: string): string | null => {
    const entry = Object.entries(specs).find(([k]) => k.toLowerCase().includes(partial.toLowerCase()));
    return entry ? entry[1] : null;
  };

  /* ─── Screen Size ─── */
  let screenSize: number | null = null;
  const m1 = name.match(/(\d{2,3})\s*[\u0022\u201C\u201D\u201E\u2033\u2032\u0027\u2018\u2019\u0060\u00B4\u2034″′''""]/);
  if (m1) {
    screenSize = Math.round(parseFloat(m1[1]));
  } else {
    const m2 = name.match(/(\d{2,3})\s*[-]?\s*(?:inch|inç|inc)/i);
    if (m2) {
      screenSize = Math.round(parseFloat(m2[1]));
    } else {
      const mCm = name.match(/\((\d{2,3})\s*cm\)/i);
      if (mCm) {
        const inch = Math.round(parseInt(mCm[1]) / 2.54);
        if (inch >= 24 && inch <= 120) screenSize = inch;
      } else {
        const specSize = specs["Ekran"] || specs["Ekran Boyutu"] || specs["Screen Size"] || "";
        const mSpec = specSize.match(/(\d{2,3})/);
        if (mSpec) screenSize = Math.round(parseFloat(mSpec[1]));
      }
    }
  }

  /* ─── Panel Type ─── */
  let panelType: string | null = null;
  if (nameDescUpper.includes("NEO QLED")) panelType = "Neo QLED";
  else if (nameDescUpper.includes("QNED")) panelType = "QNED";
  else if (nameDescUpper.includes("QLED")) panelType = "QLED";
  else if (nameDescUpper.includes("OLED EVO")) panelType = "OLED evo";
  else if (nameDescUpper.includes("OLED")) panelType = "OLED";
  else if (nameDescUpper.includes("NANOCELL")) panelType = "NanoCell";
  else if (nameDescUpper.includes("CRYSTAL") || nameDescUpper.includes("KRİSTAL")) panelType = "Crystal UHD";
  else if (nameDescUpper.includes("LED TV") || nameDescUpper.includes("LED")) panelType = "LED";
  else {
    const specPanel = specs["Panel"] || specs["Panel Tipi"] || "";
    if (specPanel) panelType = specPanel.trim();
  }

  /* ─── Resolution ─── */
  let resolution: string | null = null;
  if (nameDescUpper.includes("8K")) resolution = "8K";
  else if (nameDescUpper.includes("4K") || nameDescUpper.includes("UHD")) resolution = "4K";
  else if (nameDescUpper.includes("FULL HD") || nameDescUpper.includes("1080P")) resolution = "Full HD";
  else if (nameDescUpper.includes("HD READY") || nameDescUpper.includes("720P")) resolution = "HD Ready";

  /* ─── Refresh Rate ─── */
  let refreshRate: number | null = null;
  const mHz = allText.match(/(\d+)\s*Hz/i);
  if (mHz) refreshRate = parseInt(mHz[1]);

  /* ─── OS ─── */
  let os: string | null = null;
  const allLower = allText.toLowerCase();
  if (allLower.includes("google tv")) os = "Google TV";
  else if (allLower.includes("android tv")) os = "Android TV";
  else if (allLower.includes("webos")) os = "WebOS";
  else if (allLower.includes("tizen")) os = "Tizen";

  /* ─── Smart TV ─── */
  const smartTv = allLower.includes("smart") || os !== null ? true : null;

  /* ─── Satellite ─── */
  const hasSatellite = allLower.includes("uydu") || allLower.includes("satellite") || allUpper.includes("DVB-S");
  const satellite = hasSatellite ? true : null;

  /* ─── Smart Remote ─── */
  const hasSmartRemote = allLower.includes("akıllı kumanda") || allLower.includes("magic remote") || allLower.includes("one remote");
  const smartRemote = hasSmartRemote ? true : null;

  /* ─── Lumen ─── */
  let lumen: number | null = null;
  const mLumen = allText.match(/(\d+)\s*(?:lm|lümen|lumen)/i);
  if (mLumen) lumen = parseInt(mLumen[1]);

  /* ─── HDMI / USB Counts ─── */
  const hdmiCount = findSpec("hdmi");
  const usbCount = findSpec("usb");

  /* ─── Audio: Model Type ─── */
  let modelType: string | null = null;
  const nameLower = name.toLowerCase();
  if (nameLower.includes("party box") || nameLower.includes("partybox")) modelType = "Party Box";
  else if (nameLower.includes("soundbar")) modelType = "Soundbar";
  else if (nameLower.includes("boombox")) modelType = "Boombox";
  else if (nameLower.includes("hoparlör") || nameLower.includes("speaker")) modelType = "Hoparlör";
  else if (nameLower.includes("kulaklık") || nameLower.includes("headphone")) modelType = "Kulaklık";

  /* ─── Watt ─── */
  let watt: number | null = null;
  const mWatt = allText.match(/(\d+)\s*[Ww](?:att)?/);
  if (mWatt) watt = parseInt(mWatt[1]);

  /* ─── Power Type ─── */
  let powerType: string | null = null;
  if (allLower.includes("şarjlı") || allLower.includes("sarjli")) powerType = "Şarjlı";
  else if (allLower.includes("elektrikli") || allLower.includes("kablolu")) powerType = "Elektrikli";

  /* ─── Cable Length ─── */
  let cableLength: string | null = null;
  const mCable = name.match(/(\d+[.,]?\d*)\s*m\b/i);
  if (mCable) cableLength = mCable[1].replace(",", ".") + " m";

  /* ─── Mount Type ─── */
  let mountType: string | null = null;
  if (allLower.includes("hareketli")) mountType = "Hareketli";
  else if (allLower.includes("sabit")) mountType = "Sabit";
  else if (allLower.includes("tavan")) mountType = "Tavan";

  /* ─── Compatible Inch ─── */
  let compatibleInch: string | null = null;
  const specCompat = findSpec("uyumlu");
  if (specCompat) {
    compatibleInch = specCompat.trim();
  } else {
    const mInch = name.match(/(\d{2,3})\s*[-–]\s*(\d{2,3})/);
    if (mInch) compatibleInch = `${mInch[1]}-${mInch[2]}`;
  }

  /* ─── VESA ─── */
  let vesa: string | null = null;
  const specVesa = findSpec("vesa");
  if (specVesa) {
    vesa = specVesa.trim();
  } else {
    const mVesa = allText.match(/VESA\s*(\d+\s*[xX]\s*\d+)/i);
    if (mVesa) vesa = mVesa[1].replace(/\s/g, "");
  }

  /* ─── Remote Type ─── */
  let remoteType: string | null = null;
  const tvBrands = ["samsung", "lg", "sony", "philips", "vestel", "tcl", "hisense", "toshiba"];
  const brandLower = (product.brand || "").toLowerCase();
  if (tvBrands.some(b => brandLower.includes(b))) remoteType = "TV";
  else if (brandLower.includes("beko") || brandLower.includes("arçelik")) remoteType = "Beyaz Eşya";

  /* ─── BTU ─── */
  let btu: number | null = null;
  const mBtu = nameDesc.match(/(\d{4,6})\s*BTU/i);
  if (mBtu) btu = parseInt(mBtu[1]);

  /* ─── Capacity: KG / LT / Person ─── */
  let capacityKg: number | null = null;
  let capacityLt: number | null = null;
  let capacityPerson: number | null = null;

  const mKg = nameDesc.match(/(\d+(?:[.,]\d+)?)\s*(?:KG|kg|Kg)/);
  if (mKg) capacityKg = parseFloat(mKg[1].replace(",", "."));

  const mLt = nameDesc.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|lt|L|Litre)\b/i);
  if (mLt) capacityLt = parseFloat(mLt[1].replace(",", "."));

  const mPerson = nameDesc.match(/(\d+)\s*(?:Kişilik|kişilik)/i);
  if (mPerson) capacityPerson = parseInt(mPerson[1]);

  /* ─── Fridge Type ─── */
  let fridgeType: string | null = null;
  if (allLower.includes("side by side")) fridgeType = "Side by Side";
  else if (allLower.includes("french door")) fridgeType = "French Door";
  else if (allLower.includes("alttan")) fridgeType = "Alttan Donduruculu";
  else if (allLower.includes("buzdolabı") || allLower.includes("buzdolabi")) fridgeType = "Statik";

  /* ─── Freezer Type ─── */
  let freezerType: string | null = null;
  if (allLower.includes("sandık")) freezerType = "Sandık Tipi";
  else if (allLower.includes("dikey")) freezerType = "Dikey";

  /* ─── Appliance Type ─── */
  let applianceType: string | null = null;
  if (allLower.includes("yarı ankastre")) applianceType = "Yarı Ankastre";
  else if (allLower.includes("ankastre")) applianceType = "Ankastre";
  else if (allLower.includes("solo")) applianceType = "Solo";

  /* ─── Inverter ─── */
  const hasInverter = allLower.includes("inverter") || allLower.includes("inventer");
  const inverter = hasInverter ? true : null;

  /* ─── Water Dispenser ─── */
  const hasWaterDispenser = allLower.includes("su pınarı") || allLower.includes("water dispenser") || allLower.includes("su sebili");
  const waterDispenser = hasWaterDispenser ? true : null;

  /* ─── Color ─── */
  let color: string | null = null;
  const specColor = findSpec("renk") || findSpec("color");
  if (specColor) {
    color = specColor.trim();
  } else {
    if (allLower.includes("inox")) color = "Inox";
    else if (allLower.includes("beyaz")) color = "Beyaz";
    else if (allLower.includes("siyah")) color = "Siyah";
    else if (allLower.includes("gri")) color = "Gri";
  }

  /* ─── Material ─── */
  let material: string | null = null;
  if (allLower.includes("cam")) material = "Cam";
  else if (allLower.includes("emaye")) material = "Emaye";

  /* ─── Program Count ─── */
  let programCount: number | null = null;
  const mProgram = allText.match(/(\d+)\s*program/i);
  if (mProgram) programCount = parseInt(mProgram[1]);

  /* ─── Suction Power ─── */
  let suctionPower: string | null = null;
  const specSuction = findSpec("emiş");
  if (specSuction) {
    suctionPower = specSuction.trim();
  } else {
    const mSuction = allText.match(/(\d+)\s*m[³3]\/h/i);
    if (mSuction) suctionPower = `${mSuction[1]} m³/h`;
  }

  /* ─── Oven Type ─── */
  let ovenType: string | null = null;
  if (allLower.includes("indüksiyon") || allLower.includes("induksiyon")) ovenType = "İndüksiyon";
  else if (allLower.includes("gazlı") || allLower.includes("gazli")) ovenType = "Gazlı";
  else if (allLower.includes("elektrikli fırın") || allLower.includes("elektrikli ocak")) ovenType = "Elektrikli";

  /* ─── Has Dryer ─── */
  const hasDryerVal = allLower.includes("kurutmalı") || allLower.includes("washer dryer");
  const hasDryer = hasDryerVal ? true : null;

  /* ─── Coffee Type ─── */
  let coffeeType: string | null = null;
  if (allLower.includes("kapsül") || allLower.includes("kartuş")) coffeeType = "Kartuşlu";
  else if (allLower.includes("filtre")) coffeeType = "Filtre";

  /* ─── Grill ─── */
  const hasGrill = allLower.includes("grill") || allLower.includes("ızgara");
  const grill = hasGrill ? true : null;

  /* ─── Vacuum Type ─── */
  let vacuumType: string | null = null;
  if (allLower.includes("şarjlı") || allLower.includes("sarjli")) vacuumType = "Şarjlı";
  else if (allLower.includes("şarjsız") || allLower.includes("kablolu")) vacuumType = "Elektrikli";

  /* ─── Dispenser Type ─── */
  let dispenserType: string | null = null;
  if (allLower.includes("üstten")) dispenserType = "Üstten Damacanalı";
  else if (allLower.includes("alttan damacana") || (allLower.includes("alttan") && allLower.includes("damacana"))) dispenserType = "Alttan Damacanalı";
  else if (allLower.includes("yarım boy") || allLower.includes("yarım")) dispenserType = "Yarım Boy";

  /* ─── AC Type ─── */
  let acType: string | null = null;
  if (allLower.includes("portatif")) acType = "Portatif";
  else if (allLower.includes("artcool")) acType = "Artcool";
  else if (allLower.includes("split")) acType = "Split";

  /* ─── WiFi ─── */
  const hasWifi = allLower.includes("wi-fi") || allLower.includes("wifi") || allLower.includes("wi̇-fi");
  const wifi = hasWifi ? true : null;

  /* ─── Remote Control (fans/heaters) ─── */
  const hasRemoteControl = allLower.includes("uzaktan kumanda") || allLower.includes("remote control");
  const remoteControl = hasRemoteControl ? true : null;

  return {
    screenSize,
    panelType,
    resolution,
    refreshRate,
    os,
    smartTv,
    satellite,
    smartRemote,
    lumen,
    hdmiCount,
    usbCount,
    modelType,
    watt,
    powerType,
    cableLength,
    mountType,
    compatibleInch,
    vesa,
    remoteType,
    btu,
    capacityKg,
    capacityLt,
    capacityPerson,
    fridgeType,
    freezerType,
    applianceType,
    inverter,
    waterDispenser,
    color,
    material,
    programCount,
    suctionPower,
    ovenType,
    hasDryer,
    coffeeType,
    grill,
    vacuumType,
    dispenserType,
    acType,
    wifi,
    remoteControl,
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN NORMALIZATION
   ═══════════════════════════════════════════════════════════════════════════ */

export function normalizeProduct(p: Product): NormalizedProduct {
  return {
    ...p,
    brand: p.brand.trim(),
    _norm: extractAllAttributes(p),
  };
}

export function normalizeProducts(products: Product[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}

/* ═══════════════════════════════════════════════════════════════════════════
   DYNAMIC FILTER OPTION GENERATION (config-driven)
   ═══════════════════════════════════════════════════════════════════════════ */

export function getDynamicFilters(
  products: NormalizedProduct[],
  categorySlug?: string,
  subSlug?: string
): FilterGroup[] {
  const slug = subSlug || categorySlug || "";
  const profile = getFilterProfile(slug);
  const groups: FilterGroup[] = [];

  for (const field of profile) {
    /* ── Brand: special handling with counts ── */
    if (field.key === "brand") {
      const brandCounts = new Map<string, number>();
      for (const p of products) {
        if (p.brand) brandCounts.set(p.brand, (brandCounts.get(p.brand) || 0) + 1);
      }
      if (brandCounts.size > 0) {
        groups.push({
          key: "brand",
          label: field.label,
          type: field.type,
          options: [...brandCounts.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(([value, count]) => ({ value, count })),
        });
      }
      continue;
    }

    /* ── All other fields ── */
    const valueCounts = new Map<string, number>();

    for (const p of products) {
      let val: unknown;

      if (field.extractFrom === "norm") {
        val = p._norm[field.key as keyof NormalizedAttributes];
      } else {
        // Look in specs with case-insensitive key match
        const entry = Object.entries(p.specs || {}).find(
          ([k]) => k.toLowerCase().includes(field.key.toLowerCase())
        );
        val = entry ? entry[1] : undefined;
      }

      if (val === null || val === undefined) continue;

      if (typeof val === "boolean") {
        const label = val ? "Evet" : "Hayır";
        valueCounts.set(label, (valueCounts.get(label) || 0) + 1);
      } else {
        const strVal = String(val);
        if (strVal && strVal !== "0") {
          const displayVal = field.unit ? `${strVal} ${field.unit}` : strVal;
          valueCounts.set(displayVal, (valueCounts.get(displayVal) || 0) + 1);
        }
      }
    }

    if (valueCounts.size > 0) {
      let options = [...valueCounts.entries()].map(([value, count]) => ({ value, count }));

      if (field.numericSort) {
        options.sort((a, b) => parseFloat(a.value) - parseFloat(b.value));
      } else {
        options.sort((a, b) => b.count - a.count);
      }

      groups.push({ key: field.key, label: field.label, type: field.type, options });
    }
  }

  return groups;
}

/* ═══════════════════════════════════════════════════════════════════════════
   FILTER APPLICATION
   ═══════════════════════════════════════════════════════════════════════════ */

export function applyNormalizedFilters(
  products: NormalizedProduct[],
  filters: Record<string, string[]>,
  inStock: boolean,
  sort: string
): NormalizedProduct[] {
  let result = products;

  for (const [key, selectedValues] of Object.entries(filters)) {
    if (!selectedValues || selectedValues.length === 0) continue;

    result = result.filter(p => {
      // Brand
      if (key === "brand") {
        return p.brand !== null && selectedValues.includes(p.brand);
      }

      // Check _norm field
      const normKey = key as keyof NormalizedAttributes;
      const normVal = p._norm[normKey];

      if (normVal === null || normVal === undefined) return false;

      // Boolean fields: compare "Evet"/"Hayır"
      if (BOOLEAN_FIELDS.has(normKey)) {
        const label = normVal ? "Evet" : "Hayır";
        return selectedValues.includes(label);
      }

      // Numeric fields with units
      if (normKey in NUMERIC_FIELDS_WITH_UNIT) {
        const unit = NUMERIC_FIELDS_WITH_UNIT[normKey];
        const displayVal = `${normVal}${unit}`;
        // Try with unit first, then raw value
        return selectedValues.includes(displayVal) || selectedValues.some(sv => {
          // Strip common unit suffixes and compare numeric value
          const stripped = sv.replace(/\s*("|inç|Hz|Lümen|W|BTU|KG|Lt|Kişilik)\s*/gi, "").trim();
          return stripped === String(normVal);
        });
      }

      // String fields: direct comparison
      const strVal = String(normVal);
      return selectedValues.includes(strVal);
    });
  }

  if (inStock) result = result.filter(p => p.inStock);

  // Sort
  switch (sort) {
    case "price-asc":
      result = [...result].sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case "price-desc":
      result = [...result].sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case "newest":
      result = [...result].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
      break;
    case "oldest":
      result = [...result].sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime());
      break;
    case "name-asc":
      result = [...result].sort((a, b) => a.name.localeCompare(b.name, "tr"));
      break;
    case "name-desc":
      result = [...result].sort((a, b) => b.name.localeCompare(a.name, "tr"));
      break;
    case "sale":
      result = result.filter(p => p.salePrice && p.salePrice < p.price);
      break;
  }

  return result;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DEBUG INFO
   ═══════════════════════════════════════════════════════════════════════════ */

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

      if (key === "brand") {
        val = p.brand;
      } else {
        const normKey = key as keyof NormalizedAttributes;
        const normVal = p._norm[normKey];

        if (normVal === null || normVal === undefined) {
          val = null;
        } else if (BOOLEAN_FIELDS.has(normKey)) {
          val = normVal ? "Evet" : "Hayır";
        } else if (normKey in NUMERIC_FIELDS_WITH_UNIT) {
          const unit = NUMERIC_FIELDS_WITH_UNIT[normKey];
          val = `${normVal}${unit}`;
        } else {
          val = String(normVal);
        }
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
