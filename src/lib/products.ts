import { Product } from "./types";


export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeCategorySlug(raw: string): { category: string; subcategory: string } {
  // Handle multi-category strings like "Video / Audio > Aksesuar, Aksesuarlar > TV Askı Aparatları"
  // Try each part and return the first match (most specific usually listed last, but "Diğer Ürünler" is generic)
  const parts = raw.split(",").map(s => s.trim()).filter(Boolean);
  // Sort: prefer specific categories over generic "Diğer Ürünler"
  const sorted = [...parts].sort((a, b) => {
    const aGeneric = a.toLowerCase().includes("diğer");
    const bGeneric = b.toLowerCase().includes("diğer");
    if (aGeneric && !bGeneric) return 1;
    if (!aGeneric && bGeneric) return -1;
    return 0;
  });

  // Exact hierarchical WooCommerce category matches (checked first)
  const exactMap: Array<{ match: string; category: string; subcategory: string }> = [
    // Beyaz Eşya
    { match: "beyaz eşya > buz dolapları", category: "beyaz-esya", subcategory: "buzdolabi" },
    { match: "beyaz eşya > mini buzdolapları", category: "beyaz-esya", subcategory: "mini-buzdolabi" },
    { match: "beyaz eşya > çamaşır makineleri", category: "beyaz-esya", subcategory: "camasir-makinesi" },
    { match: "beyaz eşya > bulaşık makineleri", category: "beyaz-esya", subcategory: "bulasik-makinesi" },
    { match: "beyaz eşya > kurutma makineleri", category: "beyaz-esya", subcategory: "kurutma-makinesi" },
    { match: "beyaz eşya > derin dondurucular", category: "beyaz-esya", subcategory: "derin-dondurucu" },
    { match: "beyaz eşya > su sebilleri", category: "beyaz-esya", subcategory: "su-sebili" },
    // Ankastre
    { match: "ankastre > fırınlar", category: "ankastre", subcategory: "firin" },
    { match: "ankastre > ocaklar", category: "ankastre", subcategory: "ocak" },
    { match: "ankastre > davlumbazlar", category: "ankastre", subcategory: "davlumbaz" },
    // İklimlendirme
    { match: "i̇klimlendirme > klimalar > split klima", category: "klima-isitma", subcategory: "split-klima" },
    { match: "iklimlendirme > klimalar > split klima", category: "klima-isitma", subcategory: "split-klima" },
    { match: "i̇klimlendirme > klimalar > portatif klima", category: "klima-isitma", subcategory: "portatif-klima" },
    { match: "iklimlendirme > klimalar > portatif klima", category: "klima-isitma", subcategory: "portatif-klima" },
    { match: "i̇klimlendirme > klimalar", category: "klima-isitma", subcategory: "klima" },
    { match: "iklimlendirme > klimalar", category: "klima-isitma", subcategory: "klima" },
    { match: "i̇klimlendirme > ısıtıcılar", category: "klima-isitma", subcategory: "isiticilar" },
    { match: "iklimlendirme > ısıtıcılar", category: "klima-isitma", subcategory: "isiticilar" },
    { match: "i̇klimlendirme", category: "klima-isitma", subcategory: "klima" },
    { match: "iklimlendirme", category: "klima-isitma", subcategory: "klima" },
    // Video / Audio
    { match: "video / audio > televizyonlar", category: "tv-goruntu", subcategory: "tv" },
    { match: "video / audio > soundbarlar", category: "ses-sistemleri", subcategory: "soundbar" },
    { match: "video / audio > kulaklıklar", category: "ses-sistemleri", subcategory: "kulaklik" },
    { match: "aksesuarlar > tv askı aparatları", category: "tv-goruntu", subcategory: "tv-aski-aparatlari" },
    { match: "video / audio > aksesuar", category: "tv-goruntu", subcategory: "tv-aksesuar" },
    // Ses Sistemleri
    { match: "ses sistemleri > bluetooth hoparlörler", category: "ses-sistemleri", subcategory: "bluetooth-hoparlor" },
    { match: "ses sistemleri > kulaklıklar", category: "ses-sistemleri", subcategory: "kulaklik" },
    { match: "ses sistemleri > soundbar", category: "ses-sistemleri", subcategory: "soundbar" },
    // Mutfak Aletleri
    { match: "mutfak aletleri > air fryer", category: "mutfak-aletleri", subcategory: "air-fryer" },
    { match: "mutfak aletleri > mikrodalga", category: "mutfak-aletleri", subcategory: "mikrodalga" },
    { match: "mutfak aletleri > kahve makineleri", category: "mutfak-aletleri", subcategory: "kahve-makinesi" },
    { match: "mutfak aletleri > pişiriciler", category: "mutfak-aletleri", subcategory: "pisirici" },
    { match: "mutfak aletleri > su sebilleri", category: "mutfak-aletleri", subcategory: "su-sebili" },
    // Ev Aletleri / Küçük Ev Aletleri
    { match: "ev aletleri > süpürgeler", category: "kucuk-ev-aletleri", subcategory: "supurge" },
    { match: "ev aletleri > ütüler", category: "kucuk-ev-aletleri", subcategory: "utu" },
    { match: "küçük ev aletleri > vantilatör", category: "kucuk-ev-aletleri", subcategory: "ventilator" },
    // Aksesuarlar
    { match: "aksesuarlar > temizlik ürünleri", category: "aksesuar", subcategory: "temizlik-urunleri" },
    { match: "aksesuarlar > uydu ekipmanları", category: "aksesuar", subcategory: "uydu-ekipman" },
    // Oyun
    { match: "oyun > aksesuar", category: "oyun", subcategory: "oyun-aksesuar" },
    // Diğer
    { match: "diğer ürünler", category: "diger", subcategory: "" },
  ];

  for (const part of sorted) {
    const partLower = part.toLowerCase().trim();
    for (const entry of exactMap) {
      if (partLower.includes(entry.match)) return { category: entry.category, subcategory: entry.subcategory };
    }
  }

  // If input looks like an existing slug (contains hyphens), skip keyword fallback
  if (raw.includes("-")) {
    return { category: slugify(raw), subcategory: "" };
  }

  // Fallback: keyword-based matching against full string
  const fullLower = raw.toLowerCase();
  const keywordMap: Array<{ match: string; category: string; subcategory: string }> = [
    { match: "buzdolap", category: "beyaz-esya", subcategory: "buzdolabi" },
    { match: "çamaşır", category: "beyaz-esya", subcategory: "camasir-makinesi" },
    { match: "camasir", category: "beyaz-esya", subcategory: "camasir-makinesi" },
    { match: "bulaşık", category: "beyaz-esya", subcategory: "bulasik-makinesi" },
    { match: "kurutma", category: "beyaz-esya", subcategory: "kurutma-makinesi" },
    { match: "derin dondurucu", category: "beyaz-esya", subcategory: "derin-dondurucu" },
    { match: "fırın", category: "ankastre", subcategory: "firin" },
    { match: "ocak", category: "ankastre", subcategory: "ocak" },
    { match: "davlumbaz", category: "ankastre", subcategory: "davlumbaz" },
    { match: "split klima", category: "klima-isitma", subcategory: "split-klima" },
    { match: "portatif klima", category: "klima-isitma", subcategory: "portatif-klima" },
    { match: "klima", category: "klima-isitma", subcategory: "klima" },
    { match: "ısıtıcı", category: "klima-isitma", subcategory: "isiticilar" },
    { match: "televizyon", category: "tv-goruntu", subcategory: "tv" },
    { match: "kulaklık", category: "ses-sistemleri", subcategory: "kulaklik" },
    { match: "soundbar", category: "ses-sistemleri", subcategory: "soundbar" },
    { match: "air fryer", category: "mutfak-aletleri", subcategory: "air-fryer" },
    { match: "mikrodalga", category: "mutfak-aletleri", subcategory: "mikrodalga" },
    { match: "kahve", category: "mutfak-aletleri", subcategory: "kahve-makinesi" },
    { match: "süpürge", category: "kucuk-ev-aletleri", subcategory: "supurge" },
    { match: "ütü", category: "kucuk-ev-aletleri", subcategory: "utu" },
    { match: "hoparlör", category: "ses-sistemleri", subcategory: "bluetooth-hoparlor" },
    { match: "oyun", category: "oyun", subcategory: "oyun-aksesuar" },
    { match: "voltaj", category: "aksesuar", subcategory: "voltaj-regulatoru" },
    { match: "regülatör", category: "aksesuar", subcategory: "voltaj-regulatoru" },
  ];

  for (const entry of keywordMap) {
    if (fullLower.includes(entry.match)) return { category: entry.category, subcategory: entry.subcategory };
  }

  return { category: "diger", subcategory: slugify(raw) };
}

/** Shared name/brand-based category overrides — applies to both CSV and DB products */
export function applyCategoryOverrides(
  name: string,
  brand: string,
  category: string,
  subcategory: string
): { category: string; subcategory: string } {
  const nameLower = name.toLowerCase();
  const brandLower = brand.toLowerCase().trim();

  if (nameLower.includes("kumanda")) {
    return { category: "tv-goruntu", subcategory: "kumanda" };
  }
  if (nameLower.includes("hdmi") && (nameLower.includes("kablo") || nameLower.includes("cable"))) {
    return { category: "tv-goruntu", subcategory: "tv-aksesuar" };
  }
  if (nameLower.includes("soundbar") && !nameLower.includes("kumanda")) {
    return { category: "ses-sistemleri", subcategory: "soundbar" };
  }
  if (nameLower.includes("hoparlör") || nameLower.includes("boombox") || nameLower.includes("xboom")) {
    return { category: "ses-sistemleri", subcategory: "bluetooth-hoparlor" };
  }
  if (nameLower.includes("kulaklık") || nameLower.includes("kulaklik")) {
    return { category: "ses-sistemleri", subcategory: "kulaklik" };
  }
  if (
    brandLower === "brateck" || brandLower === "aksesuar" ||
    nameLower.includes("askı aparat") || nameLower.includes("tv askı") ||
    nameLower.includes("duvar aparat") || nameLower.includes("masaüstü aparat") ||
    nameLower.includes("wall mount") || nameLower.includes("desk mount") ||
    nameLower.includes("aski aparat") || nameLower.includes("tv aski")
  ) {
    return { category: "tv-goruntu", subcategory: "tv-aski-aparatlari" };
  }
  if (nameLower.includes("temizleme") || nameLower.includes("cleaning kit")) {
    return { category: "tv-goruntu", subcategory: "tv-aksesuar" };
  }
  if (nameLower.includes("ütü") || nameLower.includes("utu") || nameLower.includes("iron")) {
    return { category: "kucuk-ev-aletleri", subcategory: "utu" };
  }
  if (nameLower.includes("multi cooker") || nameLower.includes("multicooker") || nameLower.includes("pişirici") || nameLower.includes("çoklu pişirici")) {
    return { category: "kucuk-ev-aletleri", subcategory: "pisirici" };
  }
  if (nameLower.includes("su sebil") || nameLower.includes("sebili") || nameLower.includes("damacana")) {
    return { category: "beyaz-esya", subcategory: "su-sebili" };
  }

  return { category, subcategory };
}



export function getProductsByCategory(products: Product[], categorySlug: string, subSlug?: string): Product[] {
  return products.filter(p => {
    if (subSlug) {
      // Oyun > hdmi-kablo: show HDMI cables from tv-goruntu
      if (categorySlug === "oyun" && subSlug === "hdmi-kablo") {
        return p.category === "tv-goruntu" && p.subcategory === "tv-aksesuar" && 
               (p.name.toLowerCase().includes("hdmi") || p.name.toLowerCase().includes("kablo"));
      }
      return p.category === categorySlug && p.subcategory === subSlug;
    }
    // Oyun category: also include HDMI cables
    if (categorySlug === "oyun") {
      const isHdmi = p.category === "tv-goruntu" && p.subcategory === "tv-aksesuar" &&
                     (p.name.toLowerCase().includes("hdmi") || p.name.toLowerCase().includes("kablo"));
      return p.category === "oyun" || isHdmi;
    }
    return p.category === categorySlug;
  });
}

export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getBrands(products: Product[]): string[] {
  return [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 0 }).format(price) + " TL";
}

export function getWhatsAppLink(product: Product): string {
  const msg = encodeURIComponent(
    `Merhaba, bu ürün hakkında bilgi almak istiyorum:\n\n${product.name}\nSKU: ${product.sku}\n\nLink: ${window.location.origin}/urun/${product.slug}`
  );
  return `https://api.whatsapp.com/send/?phone=905488783131&text=${msg}&type=phone_number&app_absent=0`;
}
