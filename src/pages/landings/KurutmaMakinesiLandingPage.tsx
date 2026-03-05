import {
  Shield, Award, Wrench, Zap, Wind, Timer, Gauge, Shirt,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "kurutma-makinesi",
  seoTitle: "Kurutma Makinesi Fiyatları | Samsung & LG - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ve LG kurutma makinesi modelleri. Isı pompalı, enerji verimli modeller. 2 yıl garanti, ücretsiz kurulum. Zorlu Digital Plaza.",
  heroBadge: "Samsung & LG Yetkili Bayi",
  heroTitle: "Çamaşırlarınız",
  heroTitleHighlight: "Hızla Kurusun",
  heroDescription: "Samsung ve LG ısı pompalı kurutma makineleriyle çamaşırlarınız kısa sürede kurur. Ücretsiz kurulum ve 2 yıl garanti.",
  heroGradient: "from-amber-400 via-orange-400 to-red-400",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Wrench, label: "Ücretsiz Kurulum", desc: "Profesyonel montaj" },
    { icon: Zap, label: "Isı Pompalı", desc: "A+++ enerji sınıfı" },
  ],
  subtypes: [],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Kurulum", desc: "Kurutma makinenizi yerine teslim ediyor, bağlantısını yapıyoruz." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung & LG yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Isı Pompalı Teknoloji", desc: "A+++ enerji sınıfıyla düşük elektrik tüketimi." },
    { icon: Shirt, title: "Kıyafet Koruma", desc: "Hassas kurutma programlarıyla kıyafetleriniz uzun ömürlü." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Kurutma Makinesi Almalısınız?",
  benefitsDescription: "Samsung & LG yetkili bayisi olarak en yeni kurutma makinesi modellerini yetkili garanti ve profesyonel kurulum hizmetiyle sunuyoruz.",
  quoteTitle: "Kurutma Makinesi Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Kurutma Makineleri",
  productsCategoryLink: "/kategori/beyaz-esya/kurutma-makinesi",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "kurutma-makinesi",
  faq: [
    { q: "Isı pompalı kurutma makinesi nedir?", a: "Isı pompalı kurutma makineleri, havayı geri dönüştürerek çok daha az enerji tüketir ve A+++ enerji sınıfına sahiptir." },
    { q: "Çamaşır makinesiyle uyumlu mu?", a: "Evet, çamaşır makinenizin üzerine koyabileceğiniz bağlantı aparatı dahildir." },
    { q: "Kurulum ücretsiz mi?", a: "Evet, tüm kurutma makinesi alımlarında ücretsiz kurulum hizmetimiz mevcuttur." },
    { q: "Çamaşır + kurutma seti alabilir miyim?", a: "Evet, set alımlarında özel fiyat avantajlarımız var. Detaylar için bizi arayın." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Kurutma makinesi seçimi hakkında merak ettikleriniz",
  jsonLdName: "Kurutma Makinesi Modelleri - Zorlu Digital Plaza",
};

export default function KurutmaMakinesiLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
