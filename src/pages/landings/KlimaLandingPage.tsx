import {
  Shield, Award, Wrench, Zap, Snowflake, Thermometer, Wind, Fan,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "klima",
  seoTitle: "Klima Fiyatları | Samsung & LG Inverter Klima - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung ve LG inverter klima modelleri. Split klima, portatif klima. Ücretsiz montaj, 2 yıl garanti. Yetkili bayi güvencesiyle klima alın.",
  heroBadge: "Samsung & LG Yetkili Bayi",
  heroTitle: "Serinliğin",
  heroTitleHighlight: "En Verimli Hali",
  heroDescription: "Samsung ve LG inverter klima modelleriyle enerji tasarrufu yaparak serinleyin. Ücretsiz montaj ve 2 yıl garanti dahil.",
  heroGradient: "from-cyan-400 via-blue-400 to-indigo-400",
  ctaButtonText: "Klima Modellerini Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm klimalarda" },
    { icon: Wrench, label: "Ücretsiz Montaj", desc: "Profesyonel kurulum" },
    { icon: Zap, label: "Inverter Teknoloji", desc: "%60 enerji tasarrufu" },
  ],
  subtypes: [
    { icon: Snowflake, name: "Split Klima", desc: "Duvar tipi inverter klimalar", link: "/kategori/klima-isitma/split-klima" },
    { icon: Wind, name: "Portatif Klima", desc: "Taşınabilir, montajsız klimalar", link: "/kategori/klima-isitma/portatif-klima" },
    { icon: Fan, name: "Salon Tipi", desc: "Geniş alanlar için yüksek kapasiteli", link: "/kategori/klima-isitma/klima" },
    { icon: Thermometer, name: "Isıtıcılar", desc: "Kış ayları için ısıtma çözümleri", link: "/kategori/klima-isitma/isiticilar" },
  ],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Montaj", desc: "Profesyonel ekibimiz klimanızı monte eder, bakır boru dahil." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung & LG yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Inverter Teknoloji", desc: "A+++ enerji sınıfıyla %60'a varan enerji tasarrufu." },
    { icon: Snowflake, title: "BTU Danışmanlığı", desc: "Odanıza uygun BTU hesaplaması yapıyoruz." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Klima Almalısınız?",
  benefitsDescription: "Samsung & LG yetkili bayisi olarak en yeni inverter klima modellerini ücretsiz montaj ve yetkili garanti ile sunuyoruz.",
  quoteTitle: "Klima Fiyat Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, odanıza uygun klima teklifimizi sunalım.",
  productsTitle: "Klima Modelleri",
  productsCategoryLink: "/kategori/klima-isitma",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "klima-isitma",
  faq: [
    { q: "Klima montajı ücretsiz mi?", a: "Evet, tüm klima alımlarında ücretsiz montaj hizmetimiz mevcuttur. Standart bakır boru dahildir." },
    { q: "Hangi BTU klimayı almalıyım?", a: "Oda büyüklüğüne göre: 15-20 m² için 9000 BTU, 20-30 m² için 12000 BTU, 30-40 m² için 18000 BTU, 40+ m² için 24000 BTU önerilir." },
    { q: "Inverter klima nedir?", a: "Inverter klimalar kompresör hızını ihtiyaca göre ayarlayarak %60'a varan enerji tasarrufu sağlar ve daha sessiz çalışır." },
    { q: "Klima bakım hizmeti var mı?", a: "Evet, periyodik klima bakım ve temizlik hizmetimiz mevcuttur. Yetkili servis güvencesiyle." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Klima seçimi ve hizmetlerimiz hakkında merak ettikleriniz",
  jsonLdName: "Klima Modelleri - Zorlu Digital Plaza",
};

export default function KlimaLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
