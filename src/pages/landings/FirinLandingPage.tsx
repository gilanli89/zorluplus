import {
  Shield, Award, Wrench, Zap, Flame, Timer, Thermometer, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "firin",
  seoTitle: "Fırın Modelleri & Fiyatları | Samsung Ankastre Fırın | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ankastre fırın, set üstü fırın modelleri ve fiyatları. Yetkili bayi güvencesi, 2 yıl garanti, ücretsiz montaj. Zorlu Digital Plaza.",
  heroBadge: "Samsung Yetkili Bayi",
  heroTitle: "Mükemmel Pişirme",
  heroTitleHighlight: "Deneyimi",
  heroDescription: "Samsung ankastre ve set üstü fırın modelleriyle yemeklerinizi profesyonel şeflere yakışır şekilde pişirin. Ücretsiz montaj ve 2 yıl garanti.",
  heroGradient: "from-orange-400 via-amber-400 to-yellow-400",
  ctaButtonText: "Fırın Modellerini Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm fırınlarda" },
    { icon: Wrench, label: "Ücretsiz Montaj", desc: "Profesyonel kurulum" },
    { icon: Zap, label: "Enerji Verimli", desc: "A+ sınıfı" },
  ],
  subtypes: [
    { icon: Flame, name: "Ankastre Fırın", desc: "Gömme elektrikli ve gazlı fırın modelleri", link: "/kategori/ankastre/firin" },
    { icon: Thermometer, name: "Set Üstü Fırın", desc: "Kompakt ve pratik mini fırınlar", link: "/kategori/kucuk-ev-aletleri/firin" },
    { icon: Sparkles, name: "Buharlı Fırın", desc: "Sağlıklı pişirme için buharlı teknoloji", link: "/kategori/ankastre/firin" },
  ],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Montaj", desc: "Ankastre fırınlarınızı profesyonel ekibimiz monte eder." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung yetkili bayi garantisiyle güvende olun." },
    { icon: Timer, title: "Hızlı Pişirme", desc: "Çift fan ve turbo ısıtma ile yemekler daha hızlı pişer." },
    { icon: Flame, title: "Kombi Fırsatları", desc: "Fırın + ocak + davlumbaz alımlarında özel indirimler." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Fırın Almalısınız?",
  benefitsDescription: "Samsung yetkili bayisi olarak en yeni fırın modellerini yetkili garanti ve profesyonel montaj hizmetiyle sunuyoruz.",
  quoteTitle: "Fırın Fiyat Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel fırın teklifimizi sunalım.",
  productsTitle: "Fırın Modelleri",
  productsCategoryLink: "/kategori/ankastre/firin",
  productsCategoryLinkText: "Tüm Fırınları Gör",
  filterProducts: (p) =>
    (p.category === "ankastre" && p.subcategory?.toLowerCase().includes("fırın")) ||
    (p.category === "ankastre" && p.subcategory?.toLowerCase().includes("firin")) ||
    p.subcategory?.toLowerCase().includes("fırın") ||
    p.subcategory?.toLowerCase().includes("firin"),
  faq: [
    { q: "Ankastre fırın montajı dahil mi?", a: "Evet, tüm ankastre fırın alımlarında ücretsiz montaj hizmetimiz mevcuttur." },
    { q: "Elektrikli mi gazlı mı fırın almalıyım?", a: "Elektrikli fırınlar daha hassas ısı kontrolü sunar. Gazlı fırınlar ise daha hızlı ısınır. İhtiyacınıza göre önerebiliriz." },
    { q: "Buharlı fırın ne işe yarar?", a: "Buharlı fırınlar yiyeceklerin nemini koruyarak daha sağlıklı ve lezzetli sonuçlar verir." },
    { q: "Taksit seçenekleri var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Fırın seçimi ve hizmetlerimiz hakkında merak ettikleriniz",
  jsonLdName: "Fırın Modelleri - Zorlu Digital Plaza",
};

export default function FirinLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
