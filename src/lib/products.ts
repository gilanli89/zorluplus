import Papa from "papaparse";
import { Product } from "./types";
import { PRODUCT_FEED_URL } from "./constants";

const CLOUDINARY_CLOUD = "dj2oamfxf";

function cloudinaryFetch(url: string, width = 600): string {
  if (!url || url.startsWith("/") || url.includes("res.cloudinary.com")) return url;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/fetch/f_auto,q_auto,w_${width}/${url}`;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "tv-goruntu": "/products/samsung-oled-tv.png",
  "klima-isitma": "/products/klima.png",
  "beyaz-esya": "/products/samsung-buzdolabi.png",
  "kucuk-ev-aletleri": "/products/midea-su-sebili.png",
};

const SUBCATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  "tv": "/products/samsung-oled-tv.png",
  "soundbar": "/products/lg-oled-tv.png",
  "klima": "/products/klima.png",
  "isiticilar": "/products/klima.png",
  "buzdolabi": "/products/samsung-buzdolabi.png",
  "camasir-makinesi": "/products/lg-camasir.png",
  "kurutma-makinesi": "/products/lg-camasir.png",
  "bulasik-makinesi": "/products/lg-camasir.png",
  "derin-dondurucu": "/products/samsung-buzdolabi.png",
  "su-sebili": "/products/midea-su-sebili.png",
};

function getFallbackImage(category: string, subcategory: string): string {
  return SUBCATEGORY_FALLBACK_IMAGES[subcategory] || CATEGORY_FALLBACK_IMAGES[category] || "/placeholder.svg";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeCategorySlug(raw: string): { category: string; subcategory: string } {
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
    { match: "aksesuarlar > tv askı aparatları", category: "tv-goruntu", subcategory: "duvar-masaustu-aparatlari" },
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
    { match: "tv", category: "tv-goruntu", subcategory: "tv" },
    { match: "soundbar", category: "ses-sistemleri", subcategory: "soundbar" },
    { match: "air fryer", category: "mutfak-aletleri", subcategory: "air-fryer" },
    { match: "mikrodalga", category: "mutfak-aletleri", subcategory: "mikrodalga" },
    { match: "kahve", category: "mutfak-aletleri", subcategory: "kahve-makinesi" },
    { match: "süpürge", category: "kucuk-ev-aletleri", subcategory: "supurge" },
    { match: "ütü", category: "kucuk-ev-aletleri", subcategory: "utu" },
    { match: "hoparlör", category: "ses-sistemleri", subcategory: "bluetooth-hoparlor" },
    { match: "oyun", category: "oyun", subcategory: "oyun-aksesuar" },
  ];

  for (const entry of keywordMap) {
    if (fullLower.includes(entry.match)) return { category: entry.category, subcategory: entry.subcategory };
  }

  return { category: "diger", subcategory: slugify(raw) };
}

function parseRow(row: Record<string, string>, index: number): Product {
  const rawCat = row["Kategoriler"] || row["Kategori"] || row["Category"] || row["category"] || "";
  let { category, subcategory } = normalizeCategorySlug(rawCat);
  const name = row["İsim"] || row["Ürün Adı"] || row["Name"] || row["name"] || `Ürün ${index + 1}`;
  const brand = row["Markalar"] || row["Marka"] || row["Brand"] || row["brand"] || "";

  // Override: route mount/bracket products to duvar-masaustu-aparatlari
  const nameLower = name.toLowerCase();
  const brandLower = brand.toLowerCase().trim();
  if (
    brandLower === "brateck" || brandLower === "aksesuar" ||
    nameLower.includes("askı aparat") || nameLower.includes("tv askı") ||
    nameLower.includes("duvar aparat") || nameLower.includes("masaüstü aparat") ||
    nameLower.includes("wall mount") || nameLower.includes("desk mount")
  ) {
    category = "tv-goruntu";
    subcategory = "duvar-masaustu-aparatlari";
  }
  const sku = (row["Stok kodu (SKU)"] || row["SKU"] || row["sku"] || row["Kimlik"] || row["ID"] || row["id"] || `SKU-${index}`).trim();
  const price = parseFloat(row["Normal fiyat"] || row["Fiyat"] || row["Price"] || row["price"] || "0") || 0;
  const salePrice = parseFloat(row["İndirimli satış fiyatı"] || row["İndirimli Fiyat"] || row["Sale Price"] || "0") || undefined;
  const fallback = getFallbackImage(category, subcategory);
  const rawImage = row["Görseller"] || row["Image"] || row["Görsel"] || row["image"] || "";
  const images = rawImage ? rawImage.split(",").map(s => s.trim()).filter(Boolean).map(u => cloudinaryFetch(u)) : [];
  const image = images[0] || fallback;
  const desc = row["Kısa açıklama"] || row["Kısa Açıklama"] || row["Açıklama"] || row["Description"] || "";
  const fullDesc = row["Açıklama"] || row["Description"] || "";
  const stock = (row["Stokta?"] || row["Stok"] || row["Stock"] || row["stock"] || "1").toLowerCase();
  const tags = (row["Etiketler"] || row["Tags"] || "").split(",").map(s => s.trim()).filter(Boolean);

  // Parse specs from attribute columns and known spec fields
  const specs: Record<string, string> = {};
  for (let i = 1; i <= 5; i++) {
    const attrName = row[`Nitelik ${i} ismi`];
    const attrVal = row[`Nitelik ${i} değer(ler)i`];
    if (attrName && attrVal) {
      specs[attrName.trim()] = attrVal.trim();
    }
  }
  for (const [key, val] of Object.entries(row)) {
    if (key.startsWith("Spec:") || key.startsWith("spec:")) {
      specs[key.replace(/^[Ss]pec:\s*/, "")] = val;
    }
  }
  const specFields = ["Ekran", "BTU", "Kapasite", "Enerji Sınıfı", "Devir", "Panel", "Çözünürlük", "Litre", "No-Frost", "İnverter", "Smart"];
  specFields.forEach(f => { if (row[f]) specs[f] = row[f]; });

  // Detect featured/new from tags and WooCommerce columns
  const tagsLower = tags.map(t => t.toLowerCase());
  const isFeatured = tagsLower.some(t => t.includes("öne çıkan") || t.includes("featured")) || 
    (row["Öne çıkan?"] || row["Öne Çıkan"] || row["Featured"] || "").trim() === "1" ||
    (row["Öne çıkan?"] || row["Öne Çıkan"] || row["Featured"] || "").toLowerCase() === "evet";
  const isNew = tagsLower.some(t => t.includes("yeni") || t.includes("new")) ||
    (row["Yeni"] || row["New"] || "").toLowerCase() === "evet";

  return {
    id: sku,
    sku,
    slug: `${slugify(sku)}-${slugify(name)}`,
    name,
    brand: brand.trim(),
    category,
    subcategory,
    price,
    salePrice: salePrice && salePrice > 0 && salePrice < price ? salePrice : undefined,
    currency: "TL",
    image,
    images: images.length > 0 ? images : [fallback],
    description: desc || fullDesc,
    specs,
    inStock: stock !== "hayır" && stock !== "no" && stock !== "0",
    isNew,
    isFeatured,
    tags,
    createdAt: row["Tarih"] || row["Date"] || new Date().toISOString(),
  };
}

const LOCAL_CSV = "/data/products.csv";

export async function fetchProducts(): Promise<Product[]> {
  // Try local CSV first (WooCommerce export), then Google Sheets fallback
  const urls = [LOCAL_CSV, PRODUCT_FEED_URL].filter(Boolean);
  
  for (const url of urls) {
    try {
      const res = await fetch(url!);
      if (!res.ok) continue;
      const text = await res.text();
      const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
      const products = parsed.data
        .filter(row => {
          // Skip unpublished products
          const published = (row["Yayımlanmış"] || row["Published"] || "1").toString().trim();
          return published !== "0" && published.toLowerCase() !== "hayır";
        })
        .map((row, i) => parseRow(row, i))
        .filter(p => p.name && p.price > 0 && p.brand && p.image && p.image !== "/placeholder.svg");
      if (products.length > 0) return products;
    } catch {
      continue;
    }
  }
  
  return [];
}


export function getProductsByCategory(products: Product[], categorySlug: string, subSlug?: string): Product[] {
  return products.filter(p => {
    if (subSlug) return p.category === categorySlug && p.subcategory === subSlug;
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
