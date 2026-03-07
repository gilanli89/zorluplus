import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "tr" | "en";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  greeting: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getGreeting(lang: Lang): string {
  const hour = new Date().getHours();
  if (lang === "tr") {
    if (hour >= 5 && hour < 12) return "Günaydın ☀️";
    if (hour >= 12 && hour < 17) return "İyi Günler 🌤️";
    if (hour >= 17 && hour < 21) return "İyi Akşamlar 🌆";
    return "İyi Geceler 🌙";
  }
  if (hour >= 5 && hour < 12) return "Good Morning ☀️";
  if (hour >= 12 && hour < 17) return "Good Afternoon 🌤️";
  if (hour >= 17 && hour < 21) return "Good Evening 🌆";
  return "Good Night 🌙";
}

function detectLang(): Lang {
  const saved = localStorage.getItem("lang") as Lang | null;
  if (saved === "tr" || saved === "en") return saved;
  const browserLang = navigator.language || (navigator as any).userLanguage || "tr";
  return browserLang.startsWith("tr") ? "tr" : "en";
}

// Translation dictionary
const translations: Record<string, Record<Lang, string>> = {
  // Header
  "header.authorized": { tr: "Samsung & LG Yetkili Bayi", en: "Samsung & LG Authorized Dealer" },
  "header.warranty": { tr: "2 Yıl Garanti", en: "2 Year Warranty" },
  "header.search": { tr: "Ürün ara...", en: "Search products..." },
  "header.voiceSearch": { tr: "Sesle ara", en: "Voice search" },
  "header.stopListening": { tr: "Dinlemeyi durdur", en: "Stop listening" },
  "header.serviceRequest": { tr: "Servis Talebi", en: "Service Request" },
  "header.store": { tr: "Mağaza", en: "Store" },
  "header.eCatalogue": { tr: "E-Katalog", en: "E-Catalogue" },
  "header.branches": { tr: "Şubelerimiz", en: "Our Branches" },
  "header.contactUs": { tr: "Bize Ulaşın", en: "Contact Us" },

  // Mobile bottom bar
  "nav.home": { tr: "Ana Sayfa", en: "Home" },
  "nav.categories": { tr: "Kategoriler", en: "Categories" },
  "nav.eCatalogue": { tr: "E-Katalog", en: "E-Catalogue" },
  "nav.cart": { tr: "Sepet", en: "Cart" },

  // Footer
  "footer.description": { tr: "Kuzey Kıbrıs'ın güvenilir elektronik mağazası. Samsung & LG yetkili servis.", en: "North Cyprus' trusted electronics store. Samsung & LG authorized service." },
  "footer.corporate": { tr: "Kurumsal", en: "Corporate" },
  "footer.support": { tr: "Destek", en: "Support" },
  "footer.contact": { tr: "İletişim", en: "Contact" },
  "footer.categories": { tr: "Kategoriler", en: "Categories" },
  "footer.rights": { tr: "©ZorluPlus bir Zorlu Digital Trade & Services Ltd. kuruluşudur. Tüm hakları saklıdır.", en: "©ZorluPlus is a Zorlu Digital Trade & Services Ltd. company. All rights reserved." },

  // Trust badges
  "trust.authorizedService": { tr: "Yetkili Servis", en: "Authorized Service" },
  "trust.authorizedServiceDesc": { tr: "Samsung & LG", en: "Samsung & LG" },
  "trust.warranty": { tr: "2 Yıl Garanti", en: "2 Year Warranty" },
  "trust.warrantyDesc": { tr: "Tüm ürünlerde", en: "On all products" },
  "trust.freeInstall": { tr: "Ücretsiz Montaj", en: "Free Installation" },
  "trust.freeInstallDesc": { tr: "Uygun ürünlerde", en: "On eligible products" },

  // Cart
  "cart.myCart": { tr: "Sepetim", en: "My Cart" },
  "cart.empty": { tr: "Sepetiniz boş", en: "Your cart is empty" },
  "cart.checkout": { tr: "Ödemeye Geç", en: "Checkout" },
  "cart.subtotal": { tr: "Ara Toplam", en: "Subtotal" },
  "cart.total": { tr: "Toplam", en: "Total" },

  // Floating
  "floating.contactUs": { tr: "Bize Ulaşın 👋", en: "Contact Us 👋" },
  "floating.contactDesc": { tr: "WhatsApp, Instagram ve tüm iletişim kanallarımız için tıklayın.", en: "Click for WhatsApp, Instagram and all our contact channels." },
  "floating.openChannels": { tr: "İletişim Kanalları", en: "Contact Channels" },

  // Home page
  "home.categoryWidgets.tv": { tr: "TV & Görüntü Sistemleri", en: "TV & Display Systems" },
  "home.categoryWidgets.tvSub": { tr: "Samsung & LG OLED, QLED, NanoCell", en: "Samsung & LG OLED, QLED, NanoCell" },
  "home.categoryWidgets.whiteGoods": { tr: "Beyaz Eşya", en: "White Goods" },
  "home.categoryWidgets.whiteGoodsSub": { tr: "Buzdolabı, Çamaşır & Bulaşık Makinesi", en: "Refrigerator, Washing & Dishwasher" },
  "home.categoryWidgets.builtin": { tr: "Ankastre Setler", en: "Built-in Sets" },
  "home.categoryWidgets.builtinSub": { tr: "Fırın, Ocak & Davlumbaz", en: "Oven, Cooktop & Hood" },
  "home.categoryWidgets.ac": { tr: "Klima & İklimlendirme", en: "AC & Climate Control" },
  "home.categoryWidgets.acSub": { tr: "Split Klima, Inverter Teknoloji", en: "Split AC, Inverter Technology" },
  "home.explore": { tr: "Keşfet", en: "Explore" },
  "home.branches": { tr: "Mağazalarımız", en: "Our Stores" },
  "home.branchesDesc": { tr: "Size en yakın Zorlu Digital Plaza mağazasını ziyaret edin.", en: "Visit the nearest Zorlu Digital Plaza store." },
  "home.visitBranches": { tr: "Tüm Şubeler", en: "All Branches" },
  "home.getDirections": { tr: "Yol Tarifi", en: "Get Directions" },

  // General
  "general.loading": { tr: "Yükleniyor...", en: "Loading..." },
  "general.viewAll": { tr: "Tümünü Gör", en: "View All" },

  // Footer links
  "footer.about": { tr: "Hakkımızda", en: "About Us" },
  "footer.imprint": { tr: "Künye", en: "Imprint" },
  "footer.team": { tr: "Ekibimiz", en: "Our Team" },
  "footer.contactLink": { tr: "Bize Ulaşın", en: "Contact Us" },
  "footer.branchesLink": { tr: "Şubelerimiz", en: "Our Branches" },
  "footer.supportLink": { tr: "Destek", en: "Support" },
  "footer.orderTracking": { tr: "Sipariş Takip", en: "Order Tracking" },
  "footer.paymentMethods": { tr: "Ödeme Yöntemleri", en: "Payment Methods" },
  "footer.returnPolicy": { tr: "İade Koşulları", en: "Return Policy" },
  "footer.terms": { tr: "Kullanım Koşulları", en: "Terms of Use" },
  "footer.privacy": { tr: "Gizlilik Politikası", en: "Privacy Policy" },

  // Categories (names)
  "cat.beyaz-esya": { tr: "Beyaz Eşya", en: "White Goods" },
  "cat.ankastre": { tr: "Ankastre", en: "Built-in" },
  "cat.klima-isitma": { tr: "İklimlendirme", en: "Climate Control" },
  "cat.tv-goruntu": { tr: "TV & Görüntü Sistemleri", en: "TV & Display Systems" },
  "cat.mutfak-aletleri": { tr: "Mutfak Aletleri", en: "Kitchen Appliances" },
  "cat.kucuk-ev-aletleri": { tr: "Küçük Ev Aletleri", en: "Small Appliances" },
  "cat.ses-sistemleri": { tr: "Ses Sistemleri", en: "Audio Systems" },
  "cat.aksesuar": { tr: "Aksesuarlar", en: "Accessories" },
  "cat.oyun": { tr: "Oyun", en: "Gaming" },
  "cat.elektronik-aksesuar": { tr: "Diğer Ürünler", en: "Other Products" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  const [greeting, setGreeting] = useState(() => getGreeting(detectLang()));

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.lang = newLang;
  };

  // Update greeting every minute
  useEffect(() => {
    setGreeting(getGreeting(lang));
    const interval = setInterval(() => setGreeting(getGreeting(lang)), 60000);
    return () => clearInterval(interval);
  }, [lang]);

  // Set html lang on mount
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["tr"] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, greeting }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
