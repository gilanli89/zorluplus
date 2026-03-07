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
  "footer.description": { tr: "Teknoloji. Güven. 26 Yıllık Deneyim.", en: "Technology. Trust. 26 Years of Experience." },
  "footer.corporate": { tr: "Kurumsal", en: "Corporate" },
  "footer.support": { tr: "Destek", en: "Support" },
  "footer.contact": { tr: "İletişim", en: "Contact" },
  "footer.categories": { tr: "Kategoriler", en: "Categories" },
  "footer.rights": { tr: "©ZorluPlus bir Zorlu Digital Trade & Services Ltd. kuruluşudur. Tüm hakları saklıdır.", en: "©ZorluPlus is a Zorlu Digital Trade & Services Ltd. company. All rights reserved." },
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
  "footer.cookiePolicy": { tr: "Çerez Politikası", en: "Cookie Policy" },
  "footer.distanceSales": { tr: "Mesafeli Satış Sözleşmesi", en: "Distance Sales Agreement" },
  "footer.sustainability": { tr: "Sürdürülebilirlik", en: "Sustainability" },
  "footer.b2b": { tr: "B2B Kurumsal Satış", en: "B2B Corporate Sales" },

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
  "cart.startShopping": { tr: "Alışverişe Başla", en: "Start Shopping" },
  "cart.goToCart": { tr: "Sepete Git", en: "Go to Cart" },
  "cart.checkout": { tr: "Ödemeye Geç", en: "Checkout" },
  "cart.subtotal": { tr: "Ara Toplam", en: "Subtotal" },
  "cart.total": { tr: "Toplam", en: "Total" },
  "cart.emptyTitle": { tr: "Sepetiniz Boş", en: "Your Cart is Empty" },
  "cart.emptyDesc": { tr: "Alışverişe başlamak için ürünleri keşfedin.", en: "Explore products to start shopping." },
  "cart.continueShopping": { tr: "Alışverişe Devam Et", en: "Continue Shopping" },
  "cart.items": { tr: "ürün", en: "items" },
  "cart.delete": { tr: "Sil", en: "Delete" },
  "cart.extendedWarranty": { tr: "+2 Yıl Ekstra Garanti", en: "+2 Year Extended Warranty" },
  "cart.extendedWarrantyDesc": { tr: "Toplam 4 yıl garanti kapsamı", en: "Total 4 years warranty coverage" },
  "cart.warrantyFee": { tr: "Garanti Ücreti", en: "Warranty Fee" },
  "cart.expressInstall": { tr: "Express Kurulum (Bugün)", en: "Express Installation (Today)" },
  "cart.expressInstallDesc": { tr: "Aynı gün teslimat ve kurulum", en: "Same day delivery and installation" },
  "cart.expressFee": { tr: "Express Ücreti", en: "Express Fee" },
  "cart.recommended": { tr: "Birlikte Öneriliyor", en: "Recommended Together" },
  "cart.addToCart": { tr: "Sepete Ekle", en: "Add to Cart" },
  "cart.addedToCart": { tr: "sepete eklendi", en: "added to cart" },
  "cart.customerInfo": { tr: "Müşteri Bilgileri", en: "Customer Information" },
  "cart.fullName": { tr: "Ad Soyad *", en: "Full Name *" },
  "cart.phone": { tr: "Telefon *", en: "Phone *" },
  "cart.email": { tr: "E-posta", en: "Email" },
  "cart.address": { tr: "Teslimat Adresi *", en: "Delivery Address *" },
  "cart.paymentMethod": { tr: "Ödeme Yöntemi", en: "Payment Method" },
  "cart.creditCard": { tr: "Kredi Kartı", en: "Credit Card" },
  "cart.creditCardDesc": { tr: "3D Secure güvenli ödeme", en: "3D Secure payment" },
  "cart.bankTransfer": { tr: "Havale / EFT", en: "Bank Transfer" },
  "cart.bankTransferDesc": { tr: "Banka havalesi ile ödeme", en: "Pay by bank transfer" },
  "cart.cashOnDelivery": { tr: "Kapıda Ödeme", en: "Cash on Delivery" },
  "cart.cashOnDeliveryDesc": { tr: "Nakit veya POS ile", en: "Cash or POS" },
  "cart.bankInfo": { tr: "Banka Hesap Bilgileri", en: "Bank Account Information" },
  "cart.orderNote": { tr: "Açıklama kısmına sipariş numaranızı yazınız.", en: "Please write your order number in the description." },
  "cart.orderSummary": { tr: "Sipariş Özeti", en: "Order Summary" },
  "cart.products": { tr: "Ürünler", en: "Products" },
  "cart.callForPrice": { tr: "Fiyat bilgisi için bizi arayın", en: "Call us for price information" },
  "cart.payWithCard": { tr: "Kredi Kartı ile Öde", en: "Pay with Credit Card" },
  "cart.orderWithTransfer": { tr: "Havale ile Sipariş Ver", en: "Order with Transfer" },
  "cart.orderWithCash": { tr: "Kapıda Ödeme ile Sipariş Ver", en: "Order with Cash on Delivery" },
  "cart.fillRequired": { tr: "Lütfen ad, telefon ve adres bilgilerinizi giriniz.", en: "Please fill in name, phone and address." },
  "cart.orderCreated": { tr: "Siparişiniz oluşturuldu!", en: "Your order has been created!" },
  "cart.transferNote": { tr: "Siparişiniz oluşturuldu! Havale sonrası onaylanacaktır.", en: "Your order has been created! Will be confirmed after transfer." },

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
  "home.explore": { tr: "Ürünleri İncele", en: "Browse Products" },
  "home.branches": { tr: "Mağazalarımız", en: "Our Stores" },
  "home.branchesDesc": { tr: "Ürünleri yerinde görün, uzman ekibimizle tanışın", en: "See products in person, meet our expert team" },
  "home.visitBranches": { tr: "Tüm Şubeler", en: "All Branches" },
  "home.getDirections": { tr: "Yol Tarifi", en: "Get Directions" },
  "home.call": { tr: "Ara", en: "Call" },
  "home.authorizedBrands": { tr: "Yetkili Bayi & Servis Markalarımız", en: "Authorized Dealer & Service Brands" },

  // General
  "general.loading": { tr: "Yükleniyor...", en: "Loading..." },
  "general.viewAll": { tr: "Tümünü Gör", en: "View All" },
  "general.homePage": { tr: "Ana Sayfa", en: "Home" },
  "general.products": { tr: "ürün", en: "products" },
  "general.noProducts": { tr: "Bu kriterlere uygun ürün bulunamadı.", en: "No products found matching these criteria." },
  "general.resultsFound": { tr: "sonuç bulundu", en: "results found" },

  // Categories
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

  // Team page
  "team.title": { tr: "Ekibimiz", en: "Our Team" },
  "team.description": { tr: "Zorlu Digital Plaza ailesi, alanında uzman satış danışmanları ve teknik servis ekibinden oluşmaktadır. Müşteri memnuniyetini ön planda tutan ekibimiz, size en doğru ürünü seçmenizde yardımcı olur.", en: "The Zorlu Digital Plaza family consists of expert sales consultants and a technical service team. Our team, which prioritizes customer satisfaction, helps you choose the right product." },
  "team.role.ceo": { tr: "CEO & Kurucu", en: "CEO & Founder" },
  "team.role.coordinator": { tr: "Koordinatör", en: "Coordinator" },
  "team.role.storeManager": { tr: "Mağaza Müdürü", en: "Store Manager" },
  "team.role.salesRep": { tr: "Satış Temsilcisi", en: "Sales Representative" },
  "team.role.whiteGoodsChef": { tr: "Beyaz Eşya Şefi", en: "White Goods Chef" },
  "team.role.acTechnician": { tr: "Klima Teknisyeni", en: "Air Conditioning Technician" },
  "team.role.acChef": { tr: "Klima Şefi", en: "Air Conditioning Chef" },
  "team.role.tvTechnician": { tr: "TV Teknisyeni", en: "TV Technician" },
  "team.role.tvAvChief": { tr: "TV/AV Servis Şefi", en: "TV/AV Service Chief" },
  "team.role.aiAssistant": { tr: "Yapay Zeka Asistan", en: "AI Assistant" },

  // Contact page
  "contact.title": { tr: "Bize Ulaşın", en: "Contact Us" },
  "contact.phone": { tr: "Telefon", en: "Phone" },
  "contact.email": { tr: "E-posta", en: "Email" },
  "contact.getQuote": { tr: "Genel Teklif Al", en: "Get a Quote" },

  // Branches page
  "branches.title": { tr: "Şubelerimiz", en: "Our Branches" },
  "branches.subtitle": { tr: "Ürünleri yerinde görün, uzman ekibimizle tanışın", en: "See products in person, meet our expert team" },
  "branches.getDirections": { tr: "Yol Tarifi Al", en: "Get Directions" },
  "branches.call": { tr: "Ara", en: "Call" },

  // Shop page
  "shop.title": { tr: "Mağaza", en: "Store" },

  // Search page
  "search.title": { tr: "Ürün Ara", en: "Search Products" },
  "search.placeholder": { tr: "Ürün adı, marka veya kategori...", en: "Product name, brand or category..." },
  "search.stopListening": { tr: "Dinlemeyi durdur", en: "Stop listening" },
  "search.voiceSearch": { tr: "Sesle ara", en: "Voice search" },

  // Product page
  "product.notFound": { tr: "Ürün bulunamadı", en: "Product not found" },
  "product.goHome": { tr: "Ana Sayfaya Dön", en: "Go to Home" },
  "product.similar": { tr: "Benzer Ürünler", en: "Similar Products" },
  "product.callForPrice": { tr: "Fiyat bilgisi için bizi arayın", en: "Call us for price information" },
  "product.inStock": { tr: "Stokta", en: "In Stock" },
  "product.outOfStock": { tr: "Stokta Yok", en: "Out of Stock" },
  "product.authorizedService": { tr: "Yetkili Servis", en: "Authorized Service" },
  "product.warranty": { tr: "2 Yıl Garanti", en: "2 Year Warranty" },
  "product.freeInstall": { tr: "Ücretsiz Montaj", en: "Free Installation" },
  "product.orderWhatsApp": { tr: "WhatsApp ile Sipariş Ver", en: "Order via WhatsApp" },
  "product.specs": { tr: "Teknik Özellikler", en: "Technical Specifications" },
  "product.description": { tr: "Ürün Açıklaması", en: "Product Description" },
  "product.getQuote": { tr: "Bu Ürün İçin Teklif Al", en: "Get a Quote for This Product" },
  "product.recentlyViewed": { tr: "Son Görüntülenen", en: "Recently Viewed" },
  "product.new": { tr: "Yeni", en: "New" },
  "product.view": { tr: "İncele", en: "View" },

  // Quote form
  "quote.title": { tr: "Teklif Al", en: "Get a Quote" },
  "quote.subtitle": { tr: "Bilgilerinizi bırakın, size en uygun teklifi sunalım.", en: "Leave your info and we'll send you the best offer." },
  "quote.name": { tr: "Adınız Soyadınız *", en: "Your Full Name *" },
  "quote.phone": { tr: "Telefon *", en: "Phone *" },
  "quote.email": { tr: "E-posta", en: "Email" },
  "quote.address": { tr: "Adres", en: "Address" },
  "quote.branch": { tr: "Tercih Ettiğiniz Şube", en: "Preferred Branch" },
  "quote.notes": { tr: "Notlarınız", en: "Your Notes" },
  "quote.submit": { tr: "Teklif Al", en: "Get Quote" },
  "quote.sending": { tr: "Gönderiliyor...", en: "Sending..." },
  "quote.success": { tr: "Talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.", en: "Your request has been received! We'll contact you soon." },
  "quote.error": { tr: "Lütfen adınızı ve telefon numaranızı girin.", en: "Please enter your name and phone number." },

  // E-Catalogue
  "ecatalogue.title": { tr: "E-Katalog", en: "E-Catalogue" },
  "ecatalogue.browseProducts": { tr: "Katalogdaki Ürünleri İncele", en: "Browse Catalogue Products" },

  // Checkout
  "checkout.backToCart": { tr: "Sepete Dön", en: "Back to Cart" },
  "checkout.securePayment": { tr: "Güvenli Ödeme", en: "Secure Payment" },
  "checkout.secureDesc": { tr: "3D Secure ile güvenli ödeme", en: "Secure payment with 3D Secure" },
  "checkout.cardName": { tr: "Kart Üzerindeki İsim", en: "Name on Card" },
  "checkout.cardNumber": { tr: "Kart Numarası", en: "Card Number" },
  "checkout.month": { tr: "Ay", en: "Month" },
  "checkout.year": { tr: "Yıl", en: "Year" },
  "checkout.completePayment": { tr: "Ödemeyi Tamamla", en: "Complete Payment" },
  "checkout.processing": { tr: "İşleniyor...", en: "Processing..." },
  "checkout.encrypted": { tr: "256-bit SSL ile şifrelenmektedir", en: "Encrypted with 256-bit SSL" },

  // Payment result
  "payment.success": { tr: "Ödeme Başarılı!", en: "Payment Successful!" },
  "payment.successDesc": { tr: "Siparişiniz başarıyla oluşturuldu.", en: "Your order has been created successfully." },
  "payment.failed": { tr: "Ödeme Başarısız", en: "Payment Failed" },
  "payment.failedDesc": { tr: "Ödeme işlemi sırasında bir hata oluştu.", en: "An error occurred during the payment process." },
  "payment.retryDesc": { tr: "Lütfen kart bilgilerinizi kontrol ederek tekrar deneyiniz veya destek hattımızı arayınız.", en: "Please check your card details and try again or contact our support line." },
  "payment.orderNo": { tr: "Sipariş No:", en: "Order No:" },
  "payment.authCode": { tr: "Onay Kodu:", en: "Auth Code:" },
  "payment.transId": { tr: "İşlem No:", en: "Transaction No:" },
  "payment.backToStore": { tr: "Mağazaya Dön", en: "Back to Store" },

  // Filter
  "filter.title": { tr: "Ürün Filtrele", en: "Filter Products" },
  "filter.brand": { tr: "Marka", en: "Brand" },
  "filter.stock": { tr: "Stok Durumu", en: "Stock Status" },
  "filter.inStockOnly": { tr: "Sadece stokta olanlar", en: "In stock only" },
  "filter.clear": { tr: "Temizle", en: "Clear" },
  "filter.apply": { tr: "Uygula", en: "Apply" },
  "filter.filters": { tr: "Filtreler", en: "Filters" },
  "filter.filterBtn": { tr: "Filtrele", en: "Filter" },
  "filter.screenSize": { tr: "Ekran Boyutu", en: "Screen Size" },
  "filter.panelType": { tr: "Panel Tipi", en: "Panel Type" },
  "filter.btu": { tr: "BTU", en: "BTU" },
  "filter.capacity": { tr: "Kapasite", en: "Capacity" },
  "sort.popular": { tr: "En Popüler", en: "Most Popular" },
  "sort.newest": { tr: "Yeni Gelenler", en: "New Arrivals" },

  // Category landing template
  "landing.productsListing": { tr: "ürün listeleniyor", en: "products listed" },
  "landing.productsLoading": { tr: "Ürünler yükleniyor...", en: "Products loading..." },
  "landing.getInfo": { tr: "Hemen Bilgi Al", en: "Get Info Now" },
  "landing.whatsappOrder": { tr: "WhatsApp ile Sipariş", en: "Order via WhatsApp" },
  "landing.whatsappOrderDesc": { tr: "Hızlı sipariş ve bilgi almak için WhatsApp'tan yazın.", en: "Write on WhatsApp for quick orders and info." },
  "landing.writeWhatsapp": { tr: "WhatsApp'a Yaz", en: "Write on WhatsApp" },
  "landing.callUs": { tr: "Telefonla Arayın", en: "Call Us" },
  "landing.callUsDesc": { tr: "Uzman danışmanlarımız size yardımcı olsun.", en: "Let our expert consultants help you." },
  "landing.askWhatsapp": { tr: "WhatsApp ile Sorun", en: "Ask via WhatsApp" },
  "landing.suitableProduct": { tr: "İhtiyacınıza Uygun Ürün", en: "Product for Your Needs" },

  // Hero banner
  "hero.badge1": { tr: "Samsung & LG Yetkili Bayi", en: "Samsung & LG Authorized Dealer" },
  "hero.title1": { tr: "Evinize Teknoloji,", en: "Technology for Your Home," },
  "hero.subtitle1": { tr: "Hayatınıza Konfor.", en: "Comfort for Your Life." },
  "hero.desc1": { tr: "OLED TV, Soundbar ve daha fazlası — yetkili garantiyle evinize gelsin.", en: "OLED TV, Soundbar and more — delivered with authorized warranty." },
  "hero.cta1": { tr: "TV & Görüntü Keşfet", en: "Explore TV & Display" },
  "hero.badge2": { tr: "Mutfağınızı Yenileyin", en: "Upgrade Your Kitchen" },
  "hero.title2": { tr: "Beyaz Eşyada", en: "White Goods" },
  "hero.subtitle2": { tr: "En İyi Fiyatlar.", en: "Best Prices." },
  "hero.desc2": { tr: "2 yıl garanti, ücretsiz montaj ve kişiye özel fiyatlarla hayalinizdeki ürünlere ulaşın.", en: "Get your dream products with 2 year warranty, free installation and personalized prices." },
  "hero.cta2": { tr: "Beyaz Eşya Keşfet", en: "Explore White Goods" },
  "hero.badge3": { tr: "Yaz Kampanyası", en: "Summer Campaign" },
  "hero.title3": { tr: "Klima & İklimlendirme", en: "AC & Climate" },
  "hero.subtitle3": { tr: "Serinliğin Adresi.", en: "Stay Cool." },
  "hero.desc3": { tr: "Split klima, portatif klima ve ısıtıcılarda özel fiyatlar sizi bekliyor.", en: "Special prices on split AC, portable AC and heaters await you." },
  "hero.cta3": { tr: "Klimaları İncele", en: "Browse ACs" },
  "hero.badge4": { tr: "Yetkili Servis Merkezi", en: "Authorized Service Center" },
  "hero.title4": { tr: "Samsung & LG", en: "Samsung & LG" },
  "hero.subtitle4": { tr: "Yetkili Servis.", en: "Authorized Service." },
  "hero.desc4": { tr: "Orijinal yedek parça, uzman teknisyen kadrosu ve garanti kapsamında profesyonel teknik servis hizmeti.", en: "Original spare parts, expert technicians and professional technical service under warranty." },
  "hero.cta4": { tr: "Servis Talebi Oluştur", en: "Create Service Request" },
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
