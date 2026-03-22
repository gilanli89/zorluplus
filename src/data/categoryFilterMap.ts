// Maps existing site category/subcategory slugs to filterTree category IDs
// This bridges the CSV-based product system with the enriched filter tree

export const SUBCATEGORY_TO_FILTER_ID: Record<string, string> = {
  // TV & Görüntü (only TV + Projeksiyon)
  "tv": "televizyonlar",
  "tv-goruntu": "televizyonlar",
  "projeksiyon": "projeksiyon",
  // Aksesuarlar
  "duvar-masaustu-aparatlari": "tv-askisi",
  "hdmi-kablo": "hdmi-kablo",
  "kumanda": "kumanda",
  "regulatorler": "voltaj-regulatoru",
  // Ses Sistemleri
  "kulaklik": "ses-sistemleri",
  "soundbar": "ses-sistemleri",
  "soundbar-ses": "ses-sistemleri",
  "soundbar-ses-sistemleri": "ses-sistemleri",
  "bluetooth-hoparlor": "ses-sistemleri",
  "ses-sistemleri": "ses-sistemleri",
  // Beyaz Eşya
  "buzdolabi": "buzdolabi",
  "mini-buzdolabi": "buzdolabi",
  "derin-dondurucu": "derin-dondurucu",
  "camasir-makinesi": "camasir-makinesi",
  "kurutma-makinesi": "kurutma-makinesi",
  "bulasik-makinesi": "bulasik-makinesi",
  // Ankastre
  "ocak": "ankastre-ocak",
  "firin": "ankastre-firin",
  "davlumbaz": "ankastre-davlumbaz",
  // Mutfak
  "air-fryer": "air-fryer",
  "mikrodalga": "mikrodalga",
  "kahve-makinesi": "kahve-makinesi",
  "su-sebili": "su-sebili",
  // Küçük Ev Aletleri
  "supurge": "supurge",
  "utu": "supurge",
  "ventilator": "vantilatör",
  // İklimlendirme
  "klima": "klima",
  "split-klima": "klima",
  "portatif-klima": "klima",
  "isiticilar": "konvektor-isitici",
  // Oyun
  "oyun-aksesuar": "hdmi-kablo",
};

// Parent categories with mixed subcategories use fallback (brand + stock only)
export const CATEGORY_TO_FILTER_ID: Record<string, string> = {
  "tv-goruntu": "televizyonlar",
  "ses-sistemleri": "ses-sistemleri",
};

export function getFilterConfigId(categorySlug?: string, subSlug?: string): string | undefined {
  if (subSlug) {
    return SUBCATEGORY_TO_FILTER_ID[subSlug];
  }
  if (categorySlug) {
    return CATEGORY_TO_FILTER_ID[categorySlug] || SUBCATEGORY_TO_FILTER_ID[categorySlug];
  }
  return undefined;
}
