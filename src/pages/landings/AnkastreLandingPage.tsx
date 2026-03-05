import {
  Shield, Award, Wrench, Zap, Flame, Fan, CookingPot, Gauge,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "ankastre",
  seoTitle: "Ankastre Fırın, Ocak, Davlumbaz Fiyatları | Samsung - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ankastre fırın, seramik ocak, davlumbaz modelleri. Yetkili bayi güvencesi, 2 yıl garanti, ücretsiz montaj. Zorlu Digital Plaza.",
  heroBadge: "Samsung Yetkili Bayi",
  heroTitle: "Mutfağınızı",
  heroTitleHighlight: "Yeniden Tasarlayın",
  heroDescription: "Samsung ankastre fırın, ocak ve davlumbaz modelleriyle modern mutfağınızı oluşturun. Ücretsiz montaj ve 2 yıl garanti dahil.",
  heroGradient: "from-orange-400 via-red-400 to-rose-400",
  ctaButtonText: "Ankastre Ürünleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm ankastrede" },
    { icon: Wrench, label: "Ücretsiz Montaj", desc: "Profesyonel kurulum" },
    { icon: Gauge, label: "Enerji Verimli", desc: "A+ sınıfı ürünler" },
  ],
  subtypes: [
    { icon: Flame, name: "Ankastre Fırın", desc: "Elektrikli ve gazlı fırın modelleri", link: "/kategori/ankastre/firin" },
    { icon: CookingPot, name: "Ankastre Ocak", desc: "Seramik ve indüksiyonlu ocaklar", link: "/kategori/ankastre/ocak" },
    { icon: Fan, name: "Davlumbaz", desc: "Sessiz ve güçlü emişli davlumbazlar", link: "/kategori/ankastre/davlumbaz" },
  ],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Montaj", desc: "Ankastre ürünlerinizi profesyonel ekibimiz monte eder." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Enerji Tasarrufu", desc: "A+ enerji sınıfı ürünlerle tasarruf edin." },
    { icon: Flame, title: "Kombi Fırsatları", desc: "Fırın + ocak + davlumbaz alımlarında özel indirimler." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Ankastre Almalısınız?",
  benefitsDescription: "Samsung yetkili bayisi olarak en yeni ankastre modellerini yetkili garanti ve profesyonel montaj hizmetiyle sunuyoruz.",
  quoteTitle: "Ankastre Fiyat Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel ankastre teklifimizi sunalım.",
  productsTitle: "Ankastre Modelleri",
  productsCategoryLink: "/kategori/ankastre",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "ankastre",
  faq: [
    { q: "Ankastre montajı dahil mi?", a: "Evet, tüm ankastre alımlarında ücretsiz montaj hizmetimiz mevcuttur." },
    { q: "Fırın + ocak + davlumbaz seti alabilir miyim?", a: "Evet, set alımlarında özel indirim fırsatlarımız var. Detaylar için bizi arayın." },
    { q: "Ankastre ölçüleri nasıl belirlenir?", a: "Standart ankastre ölçüler mevcuttur. Ekibimiz ölçü kontrolü yaparak size uygun modeli önerir." },
    { q: "Taksit seçenekleri var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Ankastre seçimi ve hizmetlerimiz hakkında merak ettikleriniz",
  jsonLdName: "Ankastre Modelleri - Zorlu Digital Plaza",
};

export default function AnkastreLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
