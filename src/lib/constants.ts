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
      { slug: "kumanda", name: "Kumandalar" },
      { slug: "tv-aksesuar", name: "TV Aksesuarları" },
      { slug: "tv-aski-aparatlari", name: "Askı Aparatları" },
    ],
  },
  {
    slug: "ses-sistemleri",
    name: "Ses Sistemleri",
    icon: "Speaker",
    children: [
      { slug: "bluetooth-hoparlor", name: "Bluetooth Hoparlör" },
      { slug: "kulaklik", name: "Kulaklık" },
      { slug: "soundbar", name: "Soundbar" },
    ],
  },
  {
    slug: "beyaz-esya",
    name: "Beyaz Eşya",
    icon: "Refrigerator",
    children: [
      { slug: "buzdolabi", name: "Buzdolapları" },
      { slug: "mini-buzdolabi", name: "Mini Buzdolabı" },
      { slug: "derin-dondurucu", name: "Derin Dondurucu" },
      { slug: "camasir-makinesi", name: "Çamaşır Makineleri" },
      { slug: "kurutma-makinesi", name: "Kurutma Makinesi" },
      { slug: "bulasik-makinesi", name: "Bulaşık Makinesi" },
      { slug: "su-sebili", name: "Su Sebili" },
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
    name: "İklimlendirme",
    icon: "Snowflake",
    children: [
      { slug: "klima", name: "Klimalar" },
      { slug: "split-klima", name: "Split Klimalar" },
      { slug: "portatif-klima", name: "Portatif Klimalar" },
      { slug: "isiticilar", name: "Konvektör Isıtıcılar" },
    ],
  },
  {
    slug: "mutfak-aletleri",
    name: "Mutfak Aletleri",
    icon: "ChefHat",
    children: [
      { slug: "air-fryer", name: "Air Fryer" },
      { slug: "mikrodalga", name: "Mikrodalga" },
      { slug: "kahve-makinesi", name: "Kahve Makinesi" },
      { slug: "pisirici", name: "Pişiriciler" },
    ],
  },
  {
    slug: "kucuk-ev-aletleri",
    name: "Küçük Ev Aletleri",
    icon: "Zap",
    children: [
      { slug: "utu", name: "Ütü" },
      { slug: "supurge", name: "Süpürge" },
      { slug: "ventilator", name: "Vantilatör" },
      { slug: "pisirici", name: "Çok Amaçlı Pişirici" },
    ],
  },
  {
    slug: "aksesuar",
    name: "Aksesuarlar",
    icon: "Cable",
    children: [
      { slug: "uydu-ekipman", name: "Uydu Ekipmanları" },
      { slug: "temizlik-urunleri", name: "Temizlik Ürünleri" },
      { slug: "voltaj-regulatoru", name: "Voltaj Regülatörü" },
    ],
  },
  {
    slug: "oyun",
    name: "Oyun",
    icon: "Gamepad2",
    children: [
      { slug: "oyun-aksesuar", name: "Aksesuar" },
      { slug: "hdmi-kablo", name: "HDMI Kablolar" },
    ],
  },
];

export const CATALOGUE_URL = "https://online.fliphtml5.com/wcszl/ZDP-March-E-Catalogue/#p=1";

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
    { label: "Beyaz Eşya", href: "/kategori/beyaz-esya" },
    { label: "Ankastre", href: "/kategori/ankastre" },
    { label: "Klima", href: "/kategori/klima-isitma/klima" },
    { label: "Televizyon", href: "/kategori/tv-goruntu/tv" },
    { label: "Çamaşır Makinesi", href: "/kategori/beyaz-esya/camasir-makinesi" },
    { label: "Bulaşık Makinesi", href: "/kategori/beyaz-esya/bulasik-makinesi" },
    { label: "Kurutma Makinesi", href: "/kategori/beyaz-esya/kurutma-makinesi" },
    { label: "Mikrodalga", href: "/kategori/mutfak-aletleri/mikrodalga" },
    { label: "Kahve Makinesi", href: "/kategori/mutfak-aletleri/kahve-makinesi" },
    { label: "Ev Aletleri", href: "/kategori/kucuk-ev-aletleri" },
    { label: "Airfryer", href: "/kategori/mutfak-aletleri/air-fryer" },
    { label: "Fırın", href: "/kategori/ankastre/firin" },
    { label: "Ses Sistemi", href: "/kategori/ses-sistemleri" },
    { label: "Soundbar", href: "/kategori/ses-sistemleri/soundbar" },
    { label: "Duvar Aparatı", href: "/kategori/tv-goruntu/tv-aski-aparatlari" },
    { label: "Yedek Kumanda", href: "/kategori/tv-goruntu/kumanda" },
    { label: "Davlumbaz", href: "/kategori/ankastre/davlumbaz" },
    { label: "Ocak", href: "/kategori/ankastre/ocak" },
    { label: "Konvektör Isıtıcı", href: "/kategori/klima-isitma/isiticilar" },
  ],
  yasal: [
    { label: "Kullanım Koşulları", href: "/kullanim-kosullari" },
    { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ],
};
