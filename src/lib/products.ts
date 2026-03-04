import Papa from "papaparse";
import { Product } from "./types";
import { PRODUCT_FEED_URL } from "./constants";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeCategorySlug(raw: string): { category: string; subcategory: string } {
  const lower = raw.toLowerCase();
  const map: Record<string, { category: string; subcategory: string }> = {
    buzdolabı: { category: "beyaz-esya", subcategory: "buzdolabi" },
    buzdolabi: { category: "beyaz-esya", subcategory: "buzdolabi" },
    "çamaşır makinesi": { category: "beyaz-esya", subcategory: "camasir-makinesi" },
    "camasir makinesi": { category: "beyaz-esya", subcategory: "camasir-makinesi" },
    "bulaşık makinesi": { category: "beyaz-esya", subcategory: "bulasik-makinesi" },
    "bulasik makinesi": { category: "beyaz-esya", subcategory: "bulasik-makinesi" },
    "kurutma makinesi": { category: "beyaz-esya", subcategory: "kurutma-makinesi" },
    "derin dondurucu": { category: "beyaz-esya", subcategory: "derin-dondurucu" },
    fırın: { category: "ankastre", subcategory: "firin" },
    firin: { category: "ankastre", subcategory: "firin" },
    ocak: { category: "ankastre", subcategory: "ocak" },
    davlumbaz: { category: "ankastre", subcategory: "davlumbaz" },
    klima: { category: "klima-isitma", subcategory: "klima" },
    ısıtıcı: { category: "klima-isitma", subcategory: "isiticilar" },
    isitici: { category: "klima-isitma", subcategory: "isiticilar" },
    tv: { category: "tv-goruntu", subcategory: "tv" },
    televizyon: { category: "tv-goruntu", subcategory: "tv" },
    soundbar: { category: "tv-goruntu", subcategory: "soundbar" },
    "ses sistemi": { category: "tv-goruntu", subcategory: "soundbar" },
  };

  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val;
  }
  return { category: "elektronik-aksesuar", subcategory: slugify(raw) };
}

function parseRow(row: Record<string, string>, index: number): Product {
  const rawCat = row["Kategori"] || row["Category"] || row["category"] || "";
  const { category, subcategory } = normalizeCategorySlug(rawCat);
  const name = row["Ürün Adı"] || row["Name"] || row["name"] || `Ürün ${index + 1}`;
  const sku = row["SKU"] || row["sku"] || row["ID"] || row["id"] || `SKU-${index}`;
  const price = parseFloat(row["Fiyat"] || row["Price"] || row["price"] || "0") || 0;
  const salePrice = parseFloat(row["İndirimli Fiyat"] || row["Sale Price"] || row["sale_price"] || "0") || undefined;
  const brand = row["Marka"] || row["Brand"] || row["brand"] || "";
  const image = row["Görsel"] || row["Image"] || row["image"] || "/placeholder.svg";
  const images = (row["Görseller"] || row["Images"] || row["images"] || image).split(",").map(s => s.trim()).filter(Boolean);
  const desc = row["Açıklama"] || row["Description"] || row["description"] || "";
  const stock = (row["Stok"] || row["Stock"] || row["stock"] || "evet").toLowerCase();

  // Parse specs from any columns starting with "Spec:" or known spec fields
  const specs: Record<string, string> = {};
  for (const [key, val] of Object.entries(row)) {
    if (key.startsWith("Spec:") || key.startsWith("spec:")) {
      specs[key.replace(/^[Ss]pec:\s*/, "")] = val;
    }
  }
  // Common spec fields
  const specFields = ["Ekran", "BTU", "Kapasite", "Enerji Sınıfı", "Devir", "Panel", "Çözünürlük", "Litre", "No-Frost", "İnverter", "Smart"];
  specFields.forEach(f => { if (row[f]) specs[f] = row[f]; });

  return {
    id: sku,
    sku,
    name,
    slug: `${slugify(sku)}-${slugify(name)}`,
    brand,
    category,
    subcategory,
    price,
    salePrice: salePrice && salePrice > 0 && salePrice < price ? salePrice : undefined,
    currency: "TL",
    image: images[0] || "/placeholder.svg",
    images: images.length > 0 ? images : ["/placeholder.svg"],
    description: desc,
    specs,
    inStock: stock !== "hayır" && stock !== "no" && stock !== "0",
    isNew: (row["Yeni"] || row["New"] || "").toLowerCase() === "evet" || (row["Yeni"] || row["New"] || "").toLowerCase() === "yes",
    isFeatured: (row["Öne Çıkan"] || row["Featured"] || "").toLowerCase() === "evet" || (row["Öne Çıkan"] || row["Featured"] || "").toLowerCase() === "yes",
    tags: (row["Etiketler"] || row["Tags"] || "").split(",").map(s => s.trim()).filter(Boolean),
    createdAt: row["Tarih"] || row["Date"] || new Date().toISOString(),
  };
}

export async function fetchProducts(): Promise<Product[]> {
  if (!PRODUCT_FEED_URL) {
    return generateDemoProducts();
  }
  
  const res = await fetch(PRODUCT_FEED_URL);
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, { header: true, skipEmptyLines: true });
  return parsed.data.map((row, i) => parseRow(row, i));
}

function generateDemoProducts(): Product[] {
  const demos: Partial<Product>[] = [
    { name: "Samsung RS68A8842S9 Gardırop Tipi Buzdolabı", brand: "Samsung", category: "beyaz-esya", subcategory: "buzdolabi", price: 42999, salePrice: 38999, specs: { Litre: "634", "No-Frost": "Evet", "Enerji Sınıfı": "A++" }, isFeatured: true, isNew: true },
    { name: "LG F4WV710S2T Çamaşır Makinesi 10.5 Kg", brand: "LG", category: "beyaz-esya", subcategory: "camasir-makinesi", price: 24999, specs: { Kapasite: "10.5 Kg", Devir: "1400", "Enerji Sınıfı": "A" }, isFeatured: true },
    { name: "Samsung DW60M5050BB Bulaşık Makinesi", brand: "Samsung", category: "beyaz-esya", subcategory: "bulasik-makinesi", price: 16999, salePrice: 14999, specs: { Kapasite: "13 Kişilik", "Enerji Sınıfı": "A+" } },
    { name: "Samsung 65\" QN85C Neo QLED 4K TV", brand: "Samsung", category: "tv-goruntu", subcategory: "tv", price: 54999, salePrice: 49999, specs: { Ekran: "65\"", Panel: "Neo QLED", Çözünürlük: "4K", Smart: "Evet" }, isFeatured: true, isNew: true },
    { name: "LG 55\" OLED C3 4K TV", brand: "LG", category: "tv-goruntu", subcategory: "tv", price: 45999, specs: { Ekran: "55\"", Panel: "OLED", Çözünürlük: "4K", Smart: "Evet" }, isFeatured: true },
    { name: "Samsung AR12TXHQASINEU Klima 12000 BTU", brand: "Samsung", category: "klima-isitma", subcategory: "klima", price: 22999, specs: { BTU: "12000", İnverter: "Evet", "Enerji Sınıfı": "A++" }, isNew: true },
    { name: "LG Dual Inverter Klima 18000 BTU", brand: "LG", category: "klima-isitma", subcategory: "klima", price: 29999, salePrice: 27499, specs: { BTU: "18000", İnverter: "Evet", "Enerji Sınıfı": "A+++" }, isFeatured: true },
    { name: "Samsung NV75N5671RS Ankastre Fırın", brand: "Samsung", category: "ankastre", subcategory: "firin", price: 18999, specs: { Kapasite: "75L" } },
    { name: "LG RC90V9AV2W Kurutma Makinesi 9 Kg", brand: "LG", category: "beyaz-esya", subcategory: "kurutma-makinesi", price: 28999, specs: { Kapasite: "9 Kg", "Enerji Sınıfı": "A+++" } },
    { name: "Samsung HW-Q990C Soundbar", brand: "Samsung", category: "tv-goruntu", subcategory: "soundbar", price: 34999, salePrice: 31999, specs: {}, isFeatured: true },
    { name: "Samsung Derin Dondurucu RZ32M7120WW", brand: "Samsung", category: "beyaz-esya", subcategory: "derin-dondurucu", price: 19999, specs: { Litre: "315", "No-Frost": "Evet" } },
    { name: "LG NanoCell 75\" 4K TV", brand: "LG", category: "tv-goruntu", subcategory: "tv", price: 62999, specs: { Ekran: "75\"", Panel: "NanoCell", Çözünürlük: "4K", Smart: "Evet" }, isNew: true },
  ];

  return demos.map((d, i) => ({
    id: `DEMO-${i + 1}`,
    sku: `DEMO-${i + 1}`,
    slug: slugify(`DEMO-${i + 1}-${d.name || ""}`),
    name: d.name || "",
    brand: d.brand || "",
    category: d.category || "",
    subcategory: d.subcategory || "",
    price: d.price || 0,
    salePrice: d.salePrice,
    currency: "TL",
    image: "/placeholder.svg",
    images: ["/placeholder.svg"],
    description: `${d.brand} ${d.name} - Zorlu Digital Plaza güvencesiyle.`,
    specs: d.specs || {},
    inStock: true,
    isNew: d.isNew || false,
    isFeatured: d.isFeatured || false,
    tags: [],
    createdAt: new Date().toISOString(),
  }));
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
    `Merhaba, bu ürün hakkında bilgi almak istiyorum:\n\n${product.name}\nFiyat: ${formatPrice(product.salePrice || product.price)}\nSKU: ${product.sku}\n\nLink: ${window.location.origin}/urun/${product.slug}`
  );
  return `https://wa.me/905488783131?text=${msg}`;
}
