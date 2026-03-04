export const BRAND = {
  name: "Zorlu Digital Plaza",
  shortName: "ZorluPlus",
  phone: "+90 548 878 31 31",
  phoneDisplay: "0548 878 31 31",
  email: "info@zorluplus.com",
  whatsappLink: "https://wa.me/905488783131",
  social: {
    facebook: "https://facebook.com/zorluplus",
    instagram: "https://instagram.com/zorluplus",
    youtube: "https://youtube.com/@zorluplus",
    tiktok: "https://tiktok.com/@zorluplus",
  },
};

export const BRANCHES = [
  {
    id: "lefkosa",
    name: "Zorlu Digital Plaza Lefkoşa",
    address: "Lefkoşa Merkez, KKTC",
    phone: "+90 548 878 31 31",
    hours: "Pazartesi - Cumartesi: 09:00 - 19:00",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.36!3d35.18!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDEwJzQ4LjAiTiAzM8KwMjEnMzYuMCJF!5e0!3m2!1str!2s!4v1",
    mapsLink: "https://maps.google.com/?q=Zorlu+Digital+Plaza+Lefkosa",
  },
  {
    id: "magusa",
    name: "Zorlu Digital Plaza Mağusa",
    address: "Mağusa Merkez, KKTC",
    phone: "+90 548 878 31 31",
    hours: "Pazartesi - Cumartesi: 09:00 - 19:00",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.8!2d33.94!3d35.12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDA3JzEyLjAiTiAzM8KwNTYnMjQuMCJF!5e0!3m2!1str!2s!4v1",
    mapsLink: "https://maps.google.com/?q=Zorlu+Digital+Plaza+Magusa",
  },
];

export const TRUST_BADGES = [
  { icon: "Shield", label: "Yetkili Servis", desc: "Samsung & LG" },
  { icon: "Award", label: "2 Yıl Garanti", desc: "Tüm ürünlerde" },
  { icon: "Wrench", label: "Ücretsiz Montaj", desc: "Uygun ürünlerde" },
];

export const CATEGORIES = [
  {
    slug: "beyaz-esya",
    name: "Beyaz Eşya",
    icon: "Refrigerator",
    children: [
      { slug: "buzdolabi", name: "Buzdolabı" },
      { slug: "camasir-makinesi", name: "Çamaşır Makinesi" },
      { slug: "bulasik-makinesi", name: "Bulaşık Makinesi" },
      { slug: "kurutma-makinesi", name: "Kurutma Makinesi" },
      { slug: "derin-dondurucu", name: "Derin Dondurucu" },
    ],
  },
  {
    slug: "ankastre",
    name: "Ankastre",
    icon: "CookingPot",
    children: [
      { slug: "firin", name: "Fırın" },
      { slug: "ocak", name: "Ocak" },
      { slug: "davlumbaz", name: "Davlumbaz" },
    ],
  },
  {
    slug: "klima-isitma",
    name: "Klima & Isıtma/Soğutma",
    icon: "Snowflake",
    children: [
      { slug: "klima", name: "Klima" },
      { slug: "isiticilar", name: "Isıtıcılar" },
    ],
  },
  {
    slug: "tv-goruntu",
    name: "TV & Görüntü Sistemleri",
    icon: "Tv",
    children: [
      { slug: "tv", name: "Televizyon" },
      { slug: "soundbar", name: "Soundbar / Ses Sistemleri" },
    ],
  },
  {
    slug: "kucuk-ev-aletleri",
    name: "Küçük Ev Aletleri",
    icon: "Zap",
    children: [],
  },
  {
    slug: "elektronik-aksesuar",
    name: "Elektronik & Aksesuar",
    icon: "Smartphone",
    children: [],
  },
];

export const CATALOGUE_URL = "https://online.fliphtml5.com/wcszl/ZDP-March-E-Catalogue/#p=1";

// Placeholder CSV URL — user must publish their Google Sheet as CSV
export const PRODUCT_FEED_URL = "https://docs.google.com/spreadsheets/d/1bRYeqwIHdJceNvQaPnx6FHu9hP5V65LKuISLqdcSkT8/export?format=csv";

export const FOOTER_LINKS = {
  kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Künye", href: "/kunye" },
    { label: "Ekibimiz", href: "/ekibimiz" },
    { label: "Bize Ulaşın", href: "/iletisim" },
    { label: "Şubelerimiz", href: "/subelerimiz" },
  ],
  destek: [
    { label: "Destek", href: "/destek" },
    { label: "Sipariş Takip", href: "/siparis-takip" },
    { label: "Ödeme Yöntemleri", href: "/odeme-yontemleri" },
    { label: "İade Koşulları", href: "/iade-kosullari" },
  ],
  yasal: [
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ],
};
