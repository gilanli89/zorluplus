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

export const CATEGORIES = [
  {
    slug: "tv-goruntu",
    name: "TV & Görüntü Sistemleri",
    icon: "Tv",
    children: [
      { slug: "tv", name: "Televizyon" },
      { slug: "projeksiyon", name: "Projeksiyon Makinesi" },
    ],
  },
  {
    slug: "aksesuar",
    name: "Aksesuarlar",
    icon: "Cable",
    children: [
      { slug: "duvar-masaustu-aparatlari", name: "TV Aparatları & Ayakları" },
      { slug: "hdmi-kablo", name: "HDMI Kablolar" },
      { slug: "temizlik-urunleri", name: "Ekran Temizleme Kitleri" },
      { slug: "kumanda", name: "Kumandalar" },
      { slug: "uydu-ekipman", name: "Uydu Ekipmanları" },
      { slug: "regulatorler", name: "Voltaj Regülatörleri" },
    ],
  },
  {
    slug: "ses-sistemleri",
    name: "Ses Sistemleri",
    icon: "Speaker",
    children: [
      { slug: "soundbar-ses-sistemleri", name: "Soundbar" },
      { slug: "bluetooth-hoparlor", name: "Bluetooth Hoparlör" },
      { slug: "kulaklik", name: "Kulaklık" },
    ],
  },
  {
    slug: "oyun",
    name: "Oyun",
    icon: "Gamepad2",
    children: [
      { slug: "oyun-aksesuar", name: "Aksesuar" },
    ],
  },
  {
    slug: "beyaz-esya",
    name: "Beyaz Eşya",
    icon: "Refrigerator",
    children: [
      { slug: "buzdolabi", name: "Buzdolapları" },
      { slug: "derin-dondurucu", name: "Derin Dondurucu" },
      { slug: "mini-buzdolabi", name: "Mini Buzdolabı" },
      { slug: "camasir-makinesi", name: "Çamaşır Makineleri" },
      { slug: "kurutma-makinesi", name: "Kurutma Makinesi" },
      { slug: "bulasik-makinesi", name: "Bulaşık Makinesi" },
    ],
  },
  {
    slug: "ankastre",
    name: "Ankastre",
    icon: "CookingPot",
    children: [
      { slug: "ocak", name: "Ocak" },
      { slug: "firin", name: "Fırın" },
      { slug: "davlumbaz", name: "Davlumbaz" },
    ],
  },
  {
    slug: "mutfak-aletleri",
    name: "Mutfak Aletleri",
    icon: "ChefHat",
    children: [
      { slug: "air-fryer", name: "Air Fryer" },
      { slug: "pisirici", name: "Pişiriciler" },
      { slug: "mikrodalga", name: "Solo Mikrodalga" },
      { slug: "su-sebili", name: "Su Sebili" },
      { slug: "kahve-makinesi", name: "Kahve Makinesi" },
    ],
  },
  {
    slug: "kucuk-ev-aletleri",
    name: "Küçük Ev Aletleri",
    icon: "Zap",
    children: [
      { slug: "utu", name: "Ütü" },
      { slug: "supurge", name: "Süpürge" },
    ],
  },
  {
    slug: "klima-isitma",
    name: "İklimlendirme",
    icon: "Snowflake",
    children: [
      { slug: "ventilator", name: "Vantilatör" },
      { slug: "split-klima", name: "Split Klimalar" },
      { slug: "portatif-klima", name: "Portatif Klimalar" },
      { slug: "isiticilar", name: "Konvektör Isıtıcılar" },
    ],
  },
];

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
    { label: "Beyaz Eşya", href: "/beyaz-esya" },
    { label: "Ankastre", href: "/ankastre" },
    { label: "Klima", href: "/klima" },
    { label: "Televizyon", href: "https://zorluplus.com/kategori/tv-goruntu" },
    { label: "Çamaşır Makinesi", href: "/camasir-makinesi" },
    { label: "Bulaşık Makinesi", href: "/bulasik-makinesi" },
    { label: "Kurutma Makinesi", href: "/kurutma-makinesi" },
    { label: "Mikrodalga", href: "/mikrodalga" },
    { label: "Kahve Makinesi", href: "/kahve-makinesi" },
    { label: "Ev Aletleri", href: "/ev-aletleri" },
    { label: "Airfryer", href: "/airfryer" },
    { label: "Fırın", href: "/firin" },
    { label: "Projeksiyon Makinesi", href: "/kategori/elektronik-aksesuar" },
    { label: "Ses Sistemi", href: "/kategori/elektronik-aksesuar" },
    { label: "Soundbar", href: "/kategori/elektronik-aksesuar" },
    { label: "Duvar Aparatı", href: "/kategori/elektronik-aksesuar" },
    { label: "Yedek Kumanda", href: "/kategori/elektronik-aksesuar" },
    { label: "Davlumbaz", href: "/kategori/ankastre" },
    { label: "Ocak", href: "/kategori/ankastre" },
    { label: "Konvektör Isıtıcı", href: "/kategori/klima-isitma" },
  ],
  yasal: [
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ],
};
