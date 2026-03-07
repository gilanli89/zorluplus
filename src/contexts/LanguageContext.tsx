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

  // About page
  "about.since": { tr: "1999'dan beri", en: "Since 1999" },
  "about.heroTitle1": { tr: "Zorlu Digital Plaza", en: "Zorlu Digital Plaza" },
  "about.heroTitle2": { tr: "Zorlu Digital Trade & Services Ltd.", en: "Zorlu Digital Trade & Services Ltd." },
  "about.heroSubtitle": { tr: "26 Yillik Guven - Teknoloji - Hizmet", en: "26 Years of Trust - Technology - Service" },
  "about.stat.customers": { tr: "Mutlu Musteri", en: "Happy Customers" },
  "about.stat.years": { tr: "Yillik Deneyim", en: "Years of Experience" },
  "about.stat.stores": { tr: "Magaza", en: "Stores" },
  "about.stat.products": { tr: "Binlerce Satilan Urun", en: "Thousands of Products Sold" },
  "about.intro.title": { tr: "Hakkimizda", en: "About Us" },
  "about.intro.p1": { tr: "Zorlu Digital Plaza, Kuzey Kibris'ta teknoloji perakendeciligi, elektronik urun dagitimi ve kurumsal teknoloji cozumleri alaninda faaliyet gosteren Zorlu Digital Trade & Services Ltd. bunyesinde hizmet veren guclu bir teknoloji platformudur.", en: "Zorlu Digital Plaza is a powerful technology platform operating under Zorlu Digital Trade & Services Ltd., active in technology retail, electronic product distribution and corporate technology solutions in Northern Cyprus." },
  "about.intro.p2": { tr: "1999 yilindan bu yana teknoloji sektorunde faaliyet gosteren sirketimiz; 26 yili askin deneyimi, dunya markalariyla kurdugu guclu is birlikleri ve musteri memnuniyetini merkeze alan hizmet anlayisi ile Kuzey Kibris'in guvenilir teknoloji merkezlerinden biri haline gelmistir.", en: "Operating in the technology sector since 1999, our company has become one of the trusted technology centers of Northern Cyprus with over 26 years of experience, strong partnerships with world brands and a service approach centered on customer satisfaction." },
  "about.intro.p3": { tr: "Zorlu Digital Plaza yalnizca bir elektronik magazasi degildir. Biz, teknolojiyi gunluk yasamin konforu ile bulusturan, musterilerine dogru urunu dogru hizmet ile sunmayi amaclayan modern bir teknoloji ekosistemiyiz.", en: "Zorlu Digital Plaza is not just an electronics store. We are a modern technology ecosystem that brings technology together with the comfort of daily life, aiming to offer the right product with the right service to our customers." },
  "about.why.title": { tr: "Neden Zorlu Digital Plaza", en: "Why Zorlu Digital Plaza" },
  "about.why.desc": { tr: "Teknoloji alisverisinde guven, kalite ve dogru hizmet buyuk onem tasir. Zorlu Digital Plaza olarak musterilerimize yalnizca urun degil, butuncul bir teknoloji deneyimi sunuyoruz.", en: "Trust, quality and the right service are crucial in technology shopping. As Zorlu Digital Plaza, we offer our customers not just products, but a holistic technology experience." },
  "about.why.subtitle": { tr: "Bizi Farkli Kilan Ozellikler", en: "What Makes Us Different" },
  "about.why.f1": { tr: "26 yillik sektor deneyimi", en: "26 years of industry experience" },
  "about.why.f2": { tr: "Dunya markalariyla guclu is birlikleri", en: "Strong partnerships with world brands" },
  "about.why.f3": { tr: "Profesyonel satis danismanligi", en: "Professional sales consultancy" },
  "about.why.f4": { tr: "Satis sonrasi teknik servis destegi", en: "After-sales technical service support" },
  "about.why.f5": { tr: "Hizli teslimat ve kurulum hizmeti", en: "Fast delivery and installation service" },
  "about.why.f6": { tr: "Guvenilir alisveris deneyimi", en: "Reliable shopping experience" },
  "about.why.goal": { tr: "Zorlu Digital Plaza olarak hedefimiz, musterilerimize en dogru urunu, en dogru hizmetle ve en dogru fiyat avantajiyla sunmaktir.", en: "Our goal as Zorlu Digital Plaza is to offer our customers the right product, with the right service and the right price advantage." },
  "about.brands.title": { tr: "Markalarimiz", en: "Our Brands" },
  "about.brands.desc": { tr: "Zorlu Digital Plaza, dunya capinda guvenilir teknoloji markalarinin urunlerini musterileriyle bulusturmaktadir.", en: "Zorlu Digital Plaza brings the products of world-renowned reliable technology brands to its customers." },
  "about.brands.global": { tr: "Calistigimiz Global Markalar", en: "Global Brands We Work With" },
  "about.brands.services": { tr: "Bu markalara ait urunler icin musterilerimize satis, kurulum, teknik servis ve yedek parca destegi sunulmaktadir.", en: "Sales, installation, technical service and spare parts support are provided to our customers for products of these brands." },
  "about.brands.mission": { tr: "Zorlu Digital Plaza, dunya markalarinin en yeni teknolojilerini Kuzey Kibris'taki musterileriyle bulusturmayi hedeflemektedir.", en: "Zorlu Digital Plaza aims to bring the latest technologies of world brands to its customers in Northern Cyprus." },
  "about.service.title": { tr: "Teknik Servis", en: "Technical Service" },
  "about.service.desc": { tr: "Zorlu Digital Plaza, Kuzey Kibris genelinde Samsung ve LG basta olmak uzere bircok elektronik urun icin profesyonel teknik servis hizmeti sunmaktadir.", en: "Zorlu Digital Plaza provides professional technical service for many electronic products, especially Samsung and LG, throughout Northern Cyprus." },
  "about.service.subtitle": { tr: "Teknik Servis Hizmetlerimiz", en: "Our Technical Services" },
  "about.service.s1": { tr: "Televizyon teknik servis", en: "Television technical service" },
  "about.service.s2": { tr: "Klima bakim ve onarim", en: "AC maintenance and repair" },
  "about.service.s3": { tr: "Beyaz esya servis hizmetleri", en: "White goods service" },
  "about.service.s4": { tr: "Kucuk ev aletleri servis hizmetleri", en: "Small appliance service" },
  "about.service.s5": { tr: "Yazilim guncelleme ve ariza tespiti", en: "Software update and fault detection" },
  "about.service.s6": { tr: "Orijinal yedek parca degisimi", en: "Original spare parts replacement" },
  "about.service.footer": { tr: "Uzman teknik servis ekibimiz, cihazlarinizin bakim ve onarim sureclerini hizli, guvenilir ve profesyonel sekilde yonetmektedir.", en: "Our expert technical service team manages the maintenance and repair processes of your devices quickly, reliably and professionally." },
  "about.b2b.title": { tr: "Kurumsal Satis", en: "Corporate Sales" },
  "about.b2b.desc": { tr: "Zorlu Digital Plaza, isletmeler ve kurumlar icin B2B kurumsal teknoloji cozumleri sunmaktadir.", en: "Zorlu Digital Plaza offers B2B corporate technology solutions for businesses and institutions." },
  "about.b2b.f1": { tr: "Toplu alim avantajlari", en: "Bulk purchase advantages" },
  "about.b2b.f2": { tr: "Ozel fiyat teklifleri", en: "Special price offers" },
  "about.b2b.f3": { tr: "Proje bazli teknoloji cozumleri", en: "Project-based technology solutions" },
  "about.b2b.f4": { tr: "Satis oncesi danismanlik", en: "Pre-sales consultancy" },
  "about.b2b.f5": { tr: "Satis sonrasi teknik destek", en: "After-sales technical support" },
  "about.b2b.productGroups": { tr: "Kurumsal Urun Gruplari", en: "Corporate Product Groups" },
  "about.b2b.footer": { tr: "Kurumsal musterilerimiz icin teknoloji tedarik surecleri daha hizli, daha verimli ve daha ekonomik hale getirilmektedir.", en: "Technology procurement processes are made faster, more efficient and more economical for our corporate customers." },
  "about.categories.title": { tr: "Kategori Bolumlerimiz", en: "Our Category Sections" },
  "about.cat.tv": { tr: "Goruntu Teknolojileri", en: "Display Technologies" },
  "about.cat.tvSub": { tr: "Smart TV - QLED - OLED - Buyuk Ekran Televizyonlar", en: "Smart TV - QLED - OLED - Large Screen TVs" },
  "about.cat.ac": { tr: "Iklimlendirme", en: "Climate Control" },
  "about.cat.acSub": { tr: "Inverter Klima - Klima Sistemleri - Enerji Verimli Cozumler", en: "Inverter AC - AC Systems - Energy Efficient Solutions" },
  "about.cat.white": { tr: "Beyaz Esya", en: "White Goods" },
  "about.cat.whiteSub": { tr: "Buzdolabi - Camasir Makinesi - Kurutma Makinesi - Bulasik Makinesi", en: "Refrigerator - Washing Machine - Dryer - Dishwasher" },
  "about.cat.small": { tr: "Kucuk Ev Aletleri", en: "Small Appliances" },
  "about.cat.smallSub": { tr: "Kahve Makineleri - Air Fryer - Multi Cooker - Mutfak Teknolojileri", en: "Coffee Machines - Air Fryer - Multi Cooker - Kitchen Technologies" },
  "about.cat.audio": { tr: "Ses Teknolojileri", en: "Audio Technologies" },
  "about.cat.audioSub": { tr: "Soundbar - Bluetooth Hoparlor - Kulaklik", en: "Soundbar - Bluetooth Speaker - Headphones" },
  "about.cat.acc": { tr: "Elektronik Aksesuarlar", en: "Electronic Accessories" },
  "about.cat.accSub": { tr: "TV Duvar Aparati - Yedek Kumanda - Projeksiyon Sistemleri", en: "TV Wall Mount - Remote Control - Projection Systems" },
  "about.testimonials.title": { tr: "Musterilerimiz Ne Diyor?", en: "What Our Customers Say?" },
  "about.contact.title": { tr: "Kurumsal Satis Iletisim", en: "Corporate Sales Contact" },
  "about.contact.desc": { tr: "Kurumsal satis ve toplu alim talepleriniz icin bizimle iletisime gecebilirsiniz.", en: "You can contact us for corporate sales and bulk purchase requests." },
  "about.contact.cta": { tr: "Iletisime Gec", en: "Get in Touch" },
  "about.footer.brand": { tr: "Zorlu Digital Trade & Services Ltd.", en: "Zorlu Digital Trade & Services Ltd." },
  "about.footer.desc": { tr: "Kuzey Kibris'ta teknoloji ve elektronik cozumlerinde guvenilir adres.", en: "Trusted address for technology and electronic solutions in Northern Cyprus." },
  "about.maps.review": { tr: "Google Maps uzerinde", en: "On Google Maps" },
  "about.maps.view": { tr: "Google Maps'te goruntule", en: "View on Google Maps" },

  // B2B page
  "b2b.heroTitle": { tr: "Zorlu Digital Plaza ile Kurumsal Teknoloji Cozumleri", en: "Corporate Technology Solutions with Zorlu Digital Plaza" },
  "b2b.heroDesc1": { tr: "Zorlu Digital Plaza, Kuzey Kibris'ta faaliyet gosteren sirketler, kurumlar ve isletmeler icin profesyonel kurumsal teknoloji tedarik ve B2B satis cozumleri sunmaktadir.", en: "Zorlu Digital Plaza offers professional corporate technology procurement and B2B sales solutions for companies, institutions and businesses operating in Northern Cyprus." },
  "b2b.heroDesc2": { tr: "Sirketinizin ihtiyac duydugu televizyon, klima, beyaz esya, ofis teknolojileri, elektronik cihazlar ve profesyonel ekipmanlara kurumsal fiyat avantajlari ve toplu alim cozumleri ile kolayca ulasabilirsiniz.", en: "You can easily access televisions, air conditioners, white goods, office technologies, electronic devices and professional equipment your company needs with corporate price advantages and bulk purchase solutions." },
  "b2b.procurement": { tr: "Kurumsal Elektronik Urun Tedariki", en: "Corporate Electronic Product Procurement" },
  "b2b.procurementDesc": { tr: "Zorlu Digital Plaza, kucuk isletmelerden buyuk kurumsal firmalara kadar tum isletmeler icin genis bir teknoloji ve elektronik urun portfoyu sunmaktadir. Sirketiniz icin gerekli urunleri toplu alim avantajlari ve ozel kurumsal fiyat teklifleri ile temin edebilirsiniz.", en: "Zorlu Digital Plaza offers a wide technology and electronics product portfolio for all businesses from small enterprises to large corporations. You can procure the products your company needs with bulk purchase advantages and special corporate price offers." },
  "b2b.brands": { tr: "Calistigimiz Markalar", en: "Brands We Work With" },
  "b2b.brandsDesc": { tr: "Zorlu Digital Plaza, dunya capinda guvenilir teknoloji markalarinin urunlerini kurumsal musterilerine sunmaktadir.", en: "Zorlu Digital Plaza offers products from globally trusted technology brands to its corporate customers." },
  "b2b.brandsNote": { tr: "Bu markalara ait urunler icin satis, kurulum, teknik servis ve satis sonrasi destek hizmetleri saglanmaktadir.", en: "Sales, installation, technical service and after-sales support services are provided for products of these brands." },
  "b2b.productGroups": { tr: "Urun Gruplarimiz", en: "Our Product Groups" },
  "b2b.productGroupsDesc": { tr: "Kurumsal musterilerimiz icin sundugumuz urun kategorileri:", en: "Product categories we offer for our corporate customers:" },
  "b2b.advantages": { tr: "B2B Kurumsal Satis Avantajlari", en: "B2B Corporate Sales Advantages" },
  "b2b.advantagesDesc": { tr: "Zorlu Digital Plaza kurumsal satis hizmeti ile isletmeler bircok avantajdan yararlanabilir.", en: "Businesses can benefit from many advantages with Zorlu Digital Plaza corporate sales service." },
  "b2b.advantagesNote": { tr: "Uzman ekiplerimiz, isletmenizin ihtiyaclarini analiz ederek en dogru teknoloji cozumlerini en uygun maliyetlerle sunar.", en: "Our expert teams analyze your business needs and offer the most suitable technology solutions at the best costs." },
  "b2b.customSolutions": { tr: "Kurumlara Ozel Teknolojik Cozumler", en: "Custom Technology Solutions for Institutions" },
  "b2b.customSolutionsDesc": { tr: "Her isletmenin teknoloji ihtiyaclari farklidir. Zorlu Digital Plaza, kurumsal musterilerine ihtiyaclarina uygun ozel teknoloji cozumleri sunmaktadir.", en: "Every business has different technology needs. Zorlu Digital Plaza offers custom technology solutions tailored to its corporate customers' needs." },
  "b2b.customSolutionsNote": { tr: "Profesyonel ekiplerimiz, isletmenizin ihtiyaclarini analiz ederek en verimli teknoloji altyapisini olusturmaniza yardimci olur.", en: "Our professional teams help you create the most efficient technology infrastructure by analyzing your business needs." },
  "b2b.sme": { tr: "KOBI'ler Icin Teknoloji Cozumleri", en: "Technology Solutions for SMEs" },
  "b2b.smeDesc1": { tr: "Kucuk ve orta olcekli isletmelerin buyume sureclerinde dogru teknoloji yatirimlari buyuk onem tasir.", en: "The right technology investments are crucial in the growth process of small and medium-sized enterprises." },
  "b2b.smeDesc2": { tr: "Zorlu Digital Plaza, KOBI'lere yonelik televizyon ve ekran cozumleri, ofis teknolojileri, guvenlik kamera sistemleri, klima ve iklimlendirme sistemleri, mutfak ve kucuk ev aletleri gibi bircok teknolojik urunu uygun fiyat ve kurumsal destek ile sunmaktadir.", en: "Zorlu Digital Plaza offers many technological products to SMEs such as television and screen solutions, office technologies, security camera systems, air conditioning systems, kitchen and small appliances at affordable prices with corporate support." },
  "b2b.enterprise": { tr: "Buyuk Olcekli Firmalara Ozel Cozumler", en: "Solutions for Large Enterprises" },
  "b2b.enterpriseDesc1": { tr: "Kurumsal olcek buyudukce teknoloji altyapisi da daha kapsamli hale gelir.", en: "As corporate scale grows, technology infrastructure becomes more comprehensive." },
  "b2b.enterpriseDesc2": { tr: "Zorlu Digital Plaza, buyuk olcekli kurumlara otel ve turizm sektoru elektronik cozumleri, restoran ve kafe ekipmanlari, toplanti ve konferans teknolojileri, klima ve iklimlendirme sistemleri, profesyonel ekran ve goruntu sistemleri gibi gelismis teknoloji cozumleri sunmaktadir.", en: "Zorlu Digital Plaza offers advanced technology solutions to large-scale institutions including hotel and tourism sector electronics, restaurant and cafe equipment, meeting and conference technologies, air conditioning systems, professional screen and display systems." },
  "b2b.process": { tr: "Kurumsal Satis Sureci", en: "Corporate Sales Process" },
  "b2b.processDesc": { tr: "Zorlu Digital Plaza kurumsal satis sureci profesyonel sekilde yonetilir.", en: "Zorlu Digital Plaza corporate sales process is managed professionally." },
  "b2b.processNote": { tr: "Bu surec sayesinde isletmeler teknoloji yatirimlarini en dogru ve verimli sekilde planlayabilir.", en: "Thanks to this process, businesses can plan their technology investments in the most accurate and efficient way." },
  "b2b.finalTitle": { tr: "Zorlu Digital Plaza Kurumsal Avantajlari", en: "Zorlu Digital Plaza Corporate Advantages" },
  "b2b.trust": { tr: "26 Yillik Guven - Teknoloji - Hizmet", en: "26 Years of Trust - Technology - Service" },
  "b2b.footerDesc": { tr: "Zorlu Digital Plaza, Zorlu Digital Trade & Services Ltd. bunyesinde faaliyet gosteren ve teknoloji perakendeciligi ile kurumsal teknoloji cozumleri alaninda Kuzey Kibris'ta guvenilir bir marka olarak hizmet vermektedir.", en: "Zorlu Digital Plaza operates under Zorlu Digital Trade & Services Ltd. and serves as a reliable brand in Northern Cyprus in technology retail and corporate technology solutions." },
  "b2b.contactTitle": { tr: "Kurumsal Satis Iletisim", en: "Corporate Sales Contact" },
  "b2b.contactDesc": { tr: "Kurumsal satis ve toplu alim talepleriniz icin bizimle iletisime gecebilirsiniz.", en: "You can contact us for corporate sales and bulk purchase requests." },
  "b2b.seoTitle": { tr: "Sik Aranan Kurumsal Hizmetler", en: "Frequently Searched Corporate Services" },

  // Content pages
  "content.kunye.title": { tr: "Kunye & Kurumsal Bilgiler", en: "Imprint & Corporate Information" },
  "content.kunye.officialInfo": { tr: "Resmi Sirket Bilgileri", en: "Official Company Information" },
  "content.kunye.tradeName": { tr: "Ticari Unvan", en: "Trade Name" },
  "content.kunye.hq": { tr: "Merkez Adresi", en: "Headquarters" },
  "content.kunye.taxOffice": { tr: "Vergi Dairesi", en: "Tax Office" },
  "content.kunye.taxNo": { tr: "Vergi Numarasi", en: "Tax Number" },
  "content.kunye.taxId": { tr: "Vergi Kimlik No", en: "Tax ID" },
  "content.kunye.channels": { tr: "Premium Iletisim Kanallari", en: "Premium Contact Channels" },
  "content.kunye.customerLine": { tr: "Musteri Destek Hatti", en: "Customer Support Line" },
  "content.kunye.whatsappLine": { tr: "WhatsApp Siparis & Takip", en: "WhatsApp Order & Tracking" },
  "content.kunye.corporateEmail": { tr: "Kurumsal E-posta", en: "Corporate Email" },
  "content.kunye.standards": { tr: "Hizmet Standartlarimiz", en: "Our Service Standards" },
  "content.kunye.authorizedService": { tr: "Yetkili Servis: Samsung ve LG Profesyonel Hizmet Noktasi.", en: "Authorized Service: Samsung and LG Professional Service Point." },
  "content.kunye.warranty": { tr: "Garanti: Tum urunlerde 2 Yil Premium Garanti.", en: "Warranty: 2 Year Premium Warranty on all products." },
  "content.kunye.installation": { tr: "Montaj: Beyaz esya ve klima gruplarinda Ucretsiz Kurulum.", en: "Installation: Free Installation for white goods and AC groups." },
  "content.kunye.motto": { tr: "Zorlu Digital Plaza | Teknolojiye Guvenli ve Premium Dokunus", en: "Zorlu Digital Plaza | Safe and Premium Touch to Technology" },
  "content.destek.title": { tr: "Samsung & LG Yetkili Servis KKTC", en: "Samsung & LG Authorized Service N.Cyprus" },
  "content.destek.subtitle": { tr: "Profesyonel Teknik Servis - Zorlu Digital Plaza", en: "Professional Technical Service - Zorlu Digital Plaza" },
  "content.destek.motto": { tr: "26 Yillik Guven - Teknoloji - Hizmet", en: "26 Years of Trust - Technology - Service" },
  "content.destek.serviceCenter": { tr: "Samsung ve LG urunleri icin KKTC'de guvenilir teknik servis merkezi.", en: "Trusted technical service center for Samsung and LG products in N.Cyprus." },
  "content.destek.seoTitle": { tr: "Sik Aranan Servis Hizmetleri", en: "Frequently Searched Services" },
  "content.terms.title": { tr: "Kullanim Kosullari", en: "Terms of Use" },
  "content.terms.contact": { tr: "Iletisim", en: "Contact" },
  "content.terms.contactDesc": { tr: "Kullanim kosullari ile ilgili her turlu soru icin bizimle iletisime gecebilirsiniz.", en: "You can contact us for any questions about terms of use." },
  "content.returns.title": { tr: "Premium Iade ve Degisim Politikasi", en: "Premium Return and Exchange Policy" },
  "content.returns.lastUpdate": { tr: "Son Guncelleme Tarihi: 23.12.2025", en: "Last Updated: 23.12.2025" },
  "content.returns.motto": { tr: "Zorlu Digital Plaza | Teknolojiye Premium Dokunus", en: "Zorlu Digital Plaza | Premium Touch to Technology" },
  "content.privacy.title": { tr: "Premium Gizlilik ve Veri Guvenligi Politikasi", en: "Premium Privacy and Data Security Policy" },
  "content.privacy.contactTitle": { tr: "7. Iletisim ve Destek", en: "7. Contact and Support" },
  "content.privacy.contactDesc": { tr: "Gizlilik sureclerimizle ilgili her turlu soru ve talebiniz icin Premium destek ekibimize ulasabilirsiniz:", en: "You can reach our Premium support team for any questions and requests regarding our privacy processes:" },
  "content.privacy.company": { tr: "Sirket Unvani", en: "Company Name" },
  "content.privacy.address": { tr: "Adres", en: "Address" },
  "content.privacy.premiumLine": { tr: "Premium Destek Hatti", en: "Premium Support Line" },
  "content.cookie.title": { tr: "Cerez Politikasi", en: "Cookie Policy" },
  "content.privacy.motto": { tr: "Zorlu Digital Plaza | Teknolojiye Guvenli ve Premium Dokunus", en: "Zorlu Digital Plaza | Safe and Premium Touch to Technology" },
  "content.kvkk.title": { tr: "KVKK / GDPR Uyum Metni", en: "KVKK / GDPR Compliance Text" },
  "content.kvkk.subtitle": { tr: "Kisisel Verilerin Korunmasi ve Gizlilik Bildirimi", en: "Personal Data Protection and Privacy Notice" },
  "content.kvkk.dataController": { tr: "Veri sorumlusu: Zorlu Digital Plaza", en: "Data controller: Zorlu Digital Plaza" },
  "content.kvkk.requestNote": { tr: "Taleplerinizi su adrese iletebilirsiniz:", en: "You can submit your requests to:" },
  "content.distance.title": { tr: "Mesafeli Satis Sozlesmesi", en: "Distance Sales Agreement" },
  "content.distance.seller": { tr: "Satici", en: "Seller" },
  "content.distance.buyer": { tr: "Alici", en: "Buyer" },
  "content.distance.buyerDesc": { tr: "Site uzerinden siparis olusturan kullanici.", en: "User who creates an order through the site." },
  "content.orderTracking.title": { tr: "Premium Siparis Takibi", en: "Premium Order Tracking" },
  "content.orderTracking.desc1": { tr: "Zorlu Digital Plaza'dan verdiginiz tum siparisler, hazirlik asamasindan kapiniza ulasana kadar Premium hizmet guvencemiz altindadir.", en: "All orders you place from Zorlu Digital Plaza are under our Premium service guarantee from preparation to delivery." },
  "content.orderTracking.desc2": { tr: "Siparisinizin guncel durumunu ogrenmek, teslimat detaylarini sorgulamak veya gonderinizle ilgili ozel taleplerinizi iletmek icin size ozel olusturdugumuz hizli destek hattimizi kullanabilirsiniz.", en: "You can use our fast support line created especially for you to learn the current status of your order, query delivery details or submit special requests about your shipment." },
  "content.orderTracking.instantInfo": { tr: "Anlik Bilgi ve Destek", en: "Instant Information and Support" },
  "content.orderTracking.orderNote": { tr: "Sureci hizlandirmak adina, WhatsApp hattimiza mesaj atarken siparis numaranizi belirtmeyi unutmayiniz.", en: "To speed up the process, don't forget to mention your order number when messaging our WhatsApp line." },
  "content.orderTracking.whatsappLine": { tr: "Premium WhatsApp Hatti", en: "Premium WhatsApp Line" },
  "content.orderTracking.emailSupport": { tr: "E-posta Destek", en: "Email Support" },
  "content.orderTracking.motto": { tr: "Siparisiniz yola cikigi andan itibaren, her adimda yaninizdayiz.", en: "From the moment your order is on its way, we are with you every step." },
  "content.payment.title": { tr: "Premium Odeme Secenekleri", en: "Premium Payment Options" },
  "content.payment.desc": { tr: "Zorlu Digital Plaza'da alisveris deneyiminizi kolaylastirmak icin esnek ve guvenilir Premium odeme yontemleri sunuyoruz. Size en uygun yontemi secerek teknolojiye hizla ulasabilirsiniz.", en: "We offer flexible and reliable Premium payment methods to make your shopping experience easier at Zorlu Digital Plaza. You can quickly access technology by choosing the method that suits you best." },
  "content.payment.accepted": { tr: "Kabul Edilen Odeme Yontemleri", en: "Accepted Payment Methods" },
  "content.payment.detailTitle": { tr: "Detayli Bilgi ve Destek", en: "Detailed Information and Support" },
  "content.payment.detailDesc": { tr: "Odeme surecleri, guncel taksit oranlari ve Premium avantajlar hakkinda daha fazla bilgi almak icin bizimle iletisime gecin:", en: "Contact us for more information about payment processes, current installment rates and Premium advantages:" },
  "content.payment.storeVisit": { tr: "Magaza Ziyareti: Sizi agirlamaktan mutluluk duyariz.", en: "Store Visit: We would be happy to welcome you." },
  "content.payment.customerLine": { tr: "Musteri Hatti", en: "Customer Line" },
  "content.sustainability.title": { tr: "Surdurulebilir Teknoloji Yaklasimimiz", en: "Our Sustainable Technology Approach" },
  "content.sustainability.desc1": { tr: "Zorlu Digital Plaza olarak teknolojinin gelecegini sekillendirirken cevresel surdurulebilirligi is modelimizin merkezine koyuyoruz.", en: "As Zorlu Digital Plaza, we put environmental sustainability at the center of our business model while shaping the future of technology." },
  "content.sustainability.desc2": { tr: "Enerji verimliligi, dogal kaynaklarin korunmasi ve elektronik atiklarin geri donusumu konularinda bilincli uygulamalari destekleyerek daha yasanabilir bir gelecek icin sorumluluk aliyoruz.", en: "We take responsibility for a more livable future by supporting conscious practices in energy efficiency, conservation of natural resources and recycling of electronic waste." },
  "content.sustainability.futureTitle": { tr: "Gelecek Icin Teknoloji", en: "Technology for the Future" },
  "content.sustainability.futureDesc": { tr: "Zorlu Digital Plaza, teknoloji sektorunde surdurulebilir bir gelecek olusturmak icin cevre dostu uygulamalari desteklemeye ve musterilerini bilincli tuketim konusunda tesvik etmeye devam etmektedir.", en: "Zorlu Digital Plaza continues to support eco-friendly practices and encourage its customers towards conscious consumption to create a sustainable future in the technology sector." },
  "content.sustainability.motto": { tr: "Zorlu Digital Plaza | Surdurulebilir Teknoloji, Guvenilir Gelecek", en: "Zorlu Digital Plaza | Sustainable Technology, Reliable Future" },
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
