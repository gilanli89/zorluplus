export const BRAND = {
  name: "Zorlu Digital Plaza",
  shortName: "ZorluPlus",
  phone: "+90 548 878 31 31",
  phoneDisplay: "0548 878 31 31",
  email: "deniz@zorludigitalplaza.com",
  whatsappLink: "https://api.whatsapp.com/send/?phone=905488783131&text&type=phone_number&app_absent=0",
  social: {
    facebook: "https://www.facebook.com/ZorluDigitalPlaza/",
    instagram: "https://www.instagram.com/zorludigitalplaza/",
    youtube: "https://www.youtube.com/@zorludigitalplaza6273",
    tiktok: "https://www.tiktok.com/@zorludigitalplaza",
  },
};

export const BRANCHES = [
  {
    id: "lefkosa",
    name: "Zorlu Digital Plaza Lefkoşa",
    address: "Belediye Bulvarı, Kent Plaza, A Blok No:1, Yenikent, Lefkoşa",
    phone: "+90 392 223 97 39",
    phone2: "+90 548 851 22 22",
    hours: "Pazartesi – Cuma: 09:00 – 18:00 | Cumartesi: 09:00 – 13:00",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.5!2d33.3344!3d35.2024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14de10e9aa9f895b%3A0xce5eb3d4087fff90!2sZORLU%20DIGITAL%20PLAZA!5e0!3m2!1str!2s!4v1",
    mapsLink: "http://google.com/maps?q=ZORLU+DIGITAL+PLAZA,+Belediye+Bulvar%C4%B1+%C3%96zcan+%C3%87a%C4%9Falo%C4%9Flu+Plaza+A+Blok+No:1+Yenikent,+G%C3%B6nyeli",
  },
  {
    id: "magusa",
    name: "Zorlu Digital Plaza Mağusa",
    address: "Eşref Bitlis Caddesi, No:21, Dükkan Sol 2, Mağusa",
    phone: "+90 548 841 36 36",
    phone2: "",
    hours: "Pazartesi – Cuma: 09:00 – 18:00 | Cumartesi: 09:00 – 13:00",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3265.0!2d33.9414!3d35.1254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14dfc9b0f0b0b0b0%3A0x0!2sE%C5%9Fref%20Bitlis%20Caddesi%20No%3A21%20Ma%C4%9Fusa!5e0!3m2!1str!2s!4v1",
    mapsLink: "https://maps.app.goo.gl/zNJkF4RPDBrQ1dxB6",
  },
];

export const TRUST_BADGES = [
  { icon: "Shield", label: "Yetkili Servis", desc: "Samsung & LG" },
  { icon: "Award", label: "2 Yıl Garanti", desc: "Tüm ürünlerde" },
  { icon: "Wrench", label: "Ücretsiz Montaj", desc: "Uygun ürünlerde" },
];

// ── Category Groups ──────────────────────────────────────────────────────
export interface CategoryGroup {
  id: string;
  name: string;
  nameEn: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  { id: "tv-ses", name: "TV & Ses", nameEn: "TV & Audio" },
  { id: "beyaz-esya", name: "Beyaz Eşya", nameEn: "White Goods" },
  { id: "kucuk-ev-iklim", name: "Küçük Ev Aletleri & İklimlendirme", nameEn: "Small Appliances & HVAC" },
];

// ── New Category Tree (flat with group assignment) ───────────────────────
export const CATEGORIES = [
  // ── Grup: TV & Ses ─────────────────────────────────────────────────
  {
    slug: "televizyon",
    name: "Televizyon",
    nameEn: "Television",
    icon: "Tv",
    group: "tv-ses",
    children: [],
  },
  {
    slug: "projeksiyon",
    name: "Projeksiyon",
    nameEn: "Projector",
    icon: "Tv",
    group: "tv-ses",
    children: [],
  },
  {
    slug: "ses-sistemleri",
    name: "Ses Sistemleri",
    nameEn: "Audio Systems",
    icon: "Speaker",
    group: "tv-ses",
    children: [
      { slug: "bluetooth-hoparlor", name: "Bluetooth Hoparlör" },
      { slug: "kulaklik", name: "Kulaklık" },
      { slug: "soundbar", name: "Soundbar" },
      { slug: "party-box", name: "Party Box" },
      { slug: "boombox", name: "Boombox" },
    ],
  },
  {
    slug: "tv-aksesuar",
    name: "TV & Ses Aksesuarları",
    nameEn: "TV & Audio Accessories",
    icon: "Cable",
    group: "tv-ses",
    children: [
      { slug: "hdmi-kablo", name: "HDMI Kablo" },
      { slug: "tv-aski-aparati", name: "TV Askı Aparatı" },
      { slug: "kumanda", name: "Kumandalar" },
      { slug: "uydu-ekipman", name: "Uydu Ekipmanları" },
    ],
  },

  // ── Grup: Beyaz Eşya ──────────────────────────────────────────────
  {
    slug: "buzdolabi",
    name: "Buzdolabı",
    nameEn: "Refrigerator",
    icon: "Refrigerator",
    group: "beyaz-esya",
    subGroup: "Mutfak Grubu",
    children: [
      { slug: "mini-buzdolabi", name: "Mini Buzdolabı" },
    ],
  },
  {
    slug: "derin-dondurucu",
    name: "Derin Dondurucu",
    nameEn: "Freezer",
    icon: "Refrigerator",
    group: "beyaz-esya",
    subGroup: "Mutfak Grubu",
    children: [],
  },
  {
    slug: "bulasik-makinesi",
    name: "Bulaşık Makinesi",
    nameEn: "Dishwasher",
    icon: "CookingPot",
    group: "beyaz-esya",
    subGroup: "Mutfak Grubu",
    children: [],
  },
  {
    slug: "firin-ocak",
    name: "Fırın & Ocak",
    nameEn: "Oven & Cooktop",
    icon: "CookingPot",
    group: "beyaz-esya",
    subGroup: "Mutfak Grubu",
    children: [
      { slug: "firin", name: "Fırın" },
      { slug: "ocak", name: "Ocak" },
    ],
  },
  {
    slug: "davlumbaz",
    name: "Davlumbaz",
    nameEn: "Range Hood",
    icon: "CookingPot",
    group: "beyaz-esya",
    subGroup: "Mutfak Grubu",
    children: [],
  },
  {
    slug: "camasir-makinesi",
    name: "Çamaşır Makinesi",
    nameEn: "Washing Machine",
    icon: "Zap",
    group: "beyaz-esya",
    subGroup: "Yıkama Grubu",
    children: [],
  },
  {
    slug: "kurutma-makinesi",
    name: "Kurutma Makinesi",
    nameEn: "Dryer",
    icon: "Zap",
    group: "beyaz-esya",
    subGroup: "Yıkama Grubu",
    children: [],
  },

  // ── Grup: Küçük Ev Aletleri & İklimlendirme ───────────────────────
  {
    slug: "air-fryer",
    name: "Air Fryer",
    nameEn: "Air Fryer",
    icon: "ChefHat",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "kahve-makinesi",
    name: "Kahve Makinesi",
    nameEn: "Coffee Machine",
    icon: "ChefHat",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "mikrodalga",
    name: "Mikrodalga",
    nameEn: "Microwave",
    icon: "ChefHat",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "supurge",
    name: "Süpürge",
    nameEn: "Vacuum",
    icon: "Zap",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "su-sebili",
    name: "Su Sebili",
    nameEn: "Water Dispenser",
    icon: "Zap",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "klima",
    name: "Klima",
    nameEn: "Air Conditioner",
    icon: "Snowflake",
    group: "kucuk-ev-iklim",
    children: [
      { slug: "split-klima", name: "Split Klima" },
      { slug: "portatif-klima", name: "Portatif Klima" },
    ],
  },
  {
    slug: "isitici",
    name: "Isıtıcılar",
    nameEn: "Heaters",
    icon: "Snowflake",
    group: "kucuk-ev-iklim",
    children: [],
  },
  {
    slug: "ventilator",
    name: "Vantilatör",
    nameEn: "Fan",
    icon: "Zap",
    group: "kucuk-ev-iklim",
    children: [],
  },
];

// ── Legacy slug mapping for backward compatibility ───────────────────────
// Maps old {parent}/{child} slugs to new flat category slugs
export const LEGACY_SLUG_MAP: Record<string, string> = {
  "tv-goruntu": "televizyon",
  "tv-goruntu/tv": "televizyon",
  "tv-goruntu/kumanda": "tv-aksesuar",
  "tv-goruntu/tv-aksesuar": "tv-aksesuar",
  "tv-goruntu/tv-aski-aparatlari": "tv-aksesuar",
  "beyaz-esya": "buzdolabi",
  "beyaz-esya/buzdolabi": "buzdolabi",
  "beyaz-esya/mini-buzdolabi": "buzdolabi",
  "beyaz-esya/derin-dondurucu": "derin-dondurucu",
  "beyaz-esya/camasir-makinesi": "camasir-makinesi",
  "beyaz-esya/kurutma-makinesi": "kurutma-makinesi",
  "beyaz-esya/bulasik-makinesi": "bulasik-makinesi",
  "beyaz-esya/su-sebili": "su-sebili",
  "ankastre": "firin-ocak",
  "ankastre/firin": "firin-ocak",
  "ankastre/ocak": "firin-ocak",
  "ankastre/davlumbaz": "davlumbaz",
  "klima-isitma": "klima",
  "klima-isitma/klima": "klima",
  "klima-isitma/split-klima": "klima",
  "klima-isitma/portatif-klima": "klima",
  "klima-isitma/isiticilar": "isitici",
  "mutfak-aletleri": "air-fryer",
  "mutfak-aletleri/air-fryer": "air-fryer",
  "mutfak-aletleri/mikrodalga": "mikrodalga",
  "mutfak-aletleri/kahve-makinesi": "kahve-makinesi",
  "mutfak-aletleri/pisirici": "air-fryer",
  "kucuk-ev-aletleri": "supurge",
  "kucuk-ev-aletleri/supurge": "supurge",
  "kucuk-ev-aletleri/ventilator": "ventilator",
  "kucuk-ev-aletleri/utu": "supurge",
  "kucuk-ev-aletleri/pisirici": "air-fryer",
  "aksesuar": "tv-aksesuar",
  "aksesuar/uydu-ekipman": "tv-aksesuar",
  "aksesuar/temizlik-urunleri": "tv-aksesuar",
  "aksesuar/voltaj-regulatoru": "tv-aksesuar",
  "oyun": "tv-aksesuar",
  "oyun/oyun-aksesuar": "tv-aksesuar",
  "oyun/hdmi-kablo": "tv-aksesuar",
};

/** Resolve a legacy category slug to the new flat slug */
export function resolveCategorySlug(parentSlug: string, childSlug?: string): string {
  const key = childSlug ? `${parentSlug}/${childSlug}` : parentSlug;
  return LEGACY_SLUG_MAP[key] || LEGACY_SLUG_MAP[parentSlug] || parentSlug;
}

export const CATALOGUE_URL = "https://online.fliphtml5.com/wcszl/ZDP-March-E-Catalogue/#p=1";

// Placeholder CSV URL — user must publish their Google Sheet as CSV
export const PRODUCT_FEED_URL = "https://docs.google.com/spreadsheets/d/1bPLd5ILPMggj7PbvqRj_dnbt-AUfLJUvtyZ5A_Q8I20/export?format=csv";

export const FOOTER_LINKS = {
  kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Künye", href: "/kunye" },
    { label: "Ekibimiz", href: "/ekibimiz" },
    { label: "Bize Ulaşın", href: "/iletisim" },
    { label: "B2B Kurumsal Satış", href: "/b2b" },
    { label: "Şubelerimiz", href: "/subelerimiz" },
  ],
  destek: [
    { label: "Destek", href: "/destek" },
    { label: "Sipariş Takip", href: "/siparis-takip" },
    { label: "Ödeme Yöntemleri", href: "/odeme-yontemleri" },
    { label: "İade Koşulları", href: "/iade-kosullari" },
  ],
  kategoriler: [
    { label: "Televizyon", href: "/kategori/televizyon" },
    { label: "Ses Sistemleri", href: "/kategori/ses-sistemleri" },
    { label: "TV Aksesuarları", href: "/kategori/tv-aksesuar" },
    { label: "Buzdolabı", href: "/kategori/buzdolabi" },
    { label: "Çamaşır Makinesi", href: "/kategori/camasir-makinesi" },
    { label: "Bulaşık Makinesi", href: "/kategori/bulasik-makinesi" },
    { label: "Kurutma Makinesi", href: "/kategori/kurutma-makinesi" },
    { label: "Fırın & Ocak", href: "/kategori/firin-ocak" },
    { label: "Davlumbaz", href: "/kategori/davlumbaz" },
    { label: "Klima", href: "/kategori/klima" },
    { label: "Isıtıcılar", href: "/kategori/isitici" },
    { label: "Air Fryer", href: "/kategori/air-fryer" },
    { label: "Mikrodalga", href: "/kategori/mikrodalga" },
    { label: "Kahve Makinesi", href: "/kategori/kahve-makinesi" },
    { label: "Süpürge", href: "/kategori/supurge" },
    { label: "Su Sebili", href: "/kategori/su-sebili" },
    { label: "Vantilatör", href: "/kategori/ventilator" },
  ],
  yasal: [
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ],
};
