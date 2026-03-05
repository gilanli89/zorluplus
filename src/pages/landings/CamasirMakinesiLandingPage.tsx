import {
  Shield, Award, Wrench, Zap, WashingMachine, Droplets, Gauge, Timer,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "camasir-makinesi",
  seoTitle: "Çamaşır Makinesi Fiyatları | Samsung & LG - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ve LG çamaşır makinesi modelleri. Yüksek devir, enerji tasarruflu, AI destekli modeller. 2 yıl garanti, ücretsiz kurulum.",
  heroBadge: "Samsung & LG Yetkili Bayi",
  heroTitle: "Çamaşırda",
  heroTitleHighlight: "Akıllı Teknoloji",
  heroDescription: "Samsung ve LG'nin AI destekli, enerji verimli çamaşır makineleriyle mükemmel temizlik. Ücretsiz kurulum ve 2 yıl garanti.",
  heroGradient: "from-violet-400 via-purple-400 to-fuchsia-400",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Wrench, label: "Ücretsiz Kurulum", desc: "Profesyonel montaj" },
    { icon: Zap, label: "Enerji Verimli", desc: "A+++ sınıfı" },
  ],
  subtypes: [],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Kurulum", desc: "Çamaşır makinenizi yerine teslim ediyor, su ve elektrik bağlantısını yapıyoruz." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung & LG yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Enerji Tasarrufu", desc: "A+++ enerji sınıfı modellerle su ve elektrik tasarrufu." },
    { icon: Gauge, title: "Yüksek Devir", desc: "1400 devir ve üzeri modellerle kısa kurutma süresi." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Çamaşır Makinesi Almalısınız?",
  benefitsDescription: "Samsung & LG yetkili bayisi olarak en yeni çamaşır makinesi modellerini yetkili garanti ve profesyonel kurulum hizmetiyle sunuyoruz.",
  quoteTitle: "Çamaşır Makinesi Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Çamaşır Makineleri",
  productsCategoryLink: "/kategori/beyaz-esya/camasir-makinesi",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "camasir-makinesi",
  faq: [
    { q: "Kurulum ücretsiz mi?", a: "Evet, tüm çamaşır makinesi alımlarında ücretsiz kurulum hizmetimiz mevcuttur." },
    { q: "Kaç kg kapasiteli model almalıyım?", a: "1-2 kişilik ev için 7-8 kg, 3-4 kişilik aile için 9-10 kg, kalabalık aileler için 10+ kg önerilir." },
    { q: "Kurutma makinesiyle set olarak alabilir miyim?", a: "Evet, çamaşır + kurutma makinesi set alımlarında özel indirim fırsatlarımız var." },
    { q: "Eski makinemi geri alıyor musunuz?", a: "Evet, yeni alımlarda eski cihazınızı geri alıyoruz." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Çamaşır makinesi seçimi hakkında merak ettikleriniz",
  jsonLdName: "Çamaşır Makinesi Modelleri - Zorlu Digital Plaza",
};

export default function CamasirMakinesiLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
