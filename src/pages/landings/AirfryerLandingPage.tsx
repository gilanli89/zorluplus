import {
  Shield, Award, Zap, Flame, Timer, Sparkles, Heart, Gauge,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "airfryer",
  seoTitle: "Airfryer Fiyatları | Philips Air Fryer - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Philips airfryer modelleri. Yağsız fritöz ile sağlıklı pişirme. 2 yıl garanti. Zorlu Digital Plaza güvencesiyle air fryer alın.",
  heroBadge: "Philips Yetkili Satış",
  heroTitle: "Sağlıklı Pişirmenin",
  heroTitleHighlight: "En Lezzetli Yolu",
  heroDescription: "Philips Air Fryer ile yağsız, sağlıklı ve lezzetli yemekler hazırlayın. %90 daha az yağ kullanımı.",
  heroGradient: "from-red-400 via-orange-400 to-yellow-400",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Satış", desc: "Philips" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Heart, label: "Sağlıklı Pişirme", desc: "%90 az yağ" },
    { icon: Zap, label: "Hızlı Teslimat", desc: "Aynı gün kargo" },
  ],
  subtypes: [],
  benefits: [
    { icon: Heart, title: "Sağlıklı Pişirme", desc: "%90 daha az yağ kullanımıyla sağlıklı yemekler." },
    { icon: Shield, title: "2 Yıl Garanti", desc: "Philips resmi garanti güvencesiyle." },
    { icon: Timer, title: "Hızlı Pişirme", desc: "Rapid Air teknolojisiyle yemekler kısa sürede hazır." },
    { icon: Sparkles, title: "Kolay Temizlik", desc: "Bulaşık makinesine uyumlu çıkarılabilir parçalar." },
  ],
  benefitsTitle: "Neden Air Fryer Almalısınız?",
  benefitsDescription: "Philips Air Fryer'ın patentli Rapid Air teknolojisi ile yağsız, sağlıklı ve lezzetli yemekler hazırlayın.",
  quoteTitle: "Air Fryer Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Air Fryer Modelleri",
  productsCategoryLink: "/kategori/mutfak-aletleri/air-fryer",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "mutfak-aletleri" && p.subcategory === "air-fryer",
  faq: [
    { q: "Air fryer nasıl çalışır?", a: "Air fryer, güçlü bir fan yardımıyla sıcak havayı yiyeceklerin etrafında hızla dolaştırarak yağsız kızartma yapar. Sonuç fırın gibi sağlıklı, fritöz gibi çıtır." },
    { q: "Kaç litrelik model almalıyım?", a: "1-2 kişi için 4L, 3-4 kişi için 6-7L, kalabalık aileler için 7L+ modeller idealdir." },
    { q: "Sadece kızartma mı yapar?", a: "Hayır! Air fryer ile kızartma, ızgara, fırın yemekleri, kek ve hatta ekmek bile yapabilirsiniz." },
    { q: "Taksit var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Air fryer hakkında merak ettikleriniz",
  jsonLdName: "Air Fryer Modelleri - Zorlu Digital Plaza",
};

export default function AirfryerLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
