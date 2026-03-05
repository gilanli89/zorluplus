import {
  Shield, Award, Wrench, Zap, Waves, Timer, Gauge, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "mikrodalga",
  seoTitle: "Mikrodalga Fırın Fiyatları | Samsung - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung mikrodalga fırın modelleri. Solo, grill ve ankastre mikrodalga seçenekleri. 2 yıl garanti. Zorlu Digital Plaza.",
  heroBadge: "Samsung Yetkili Bayi",
  heroTitle: "Hızlı ve",
  heroTitleHighlight: "Pratik Pişirme",
  heroDescription: "Samsung mikrodalga fırınlarla dakikalar içinde lezzetli yemekler hazırlayın. Yetkili bayi güvencesiyle.",
  heroGradient: "from-rose-400 via-pink-400 to-fuchsia-400",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Zap, label: "Hızlı Pişirme", desc: "Gelişmiş teknoloji" },
    { icon: Sparkles, label: "Kolay Temizlik", desc: "Seramik iç yüzey" },
  ],
  subtypes: [],
  benefits: [
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung yetkili bayi garantisiyle güvende olun." },
    { icon: Zap, title: "Hızlı Isıtma", desc: "Gelişmiş ısıtma teknolojisiyle yemekleriniz hızla hazır." },
    { icon: Sparkles, title: "Kolay Temizlik", desc: "Seramik iç yüzey sayesinde temizlik çok kolay." },
    { icon: Wrench, title: "Ankastre Seçenekler", desc: "Mutfak dolabınıza entegre ankastre modeller mevcut." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Mikrodalga Almalısınız?",
  benefitsDescription: "Samsung yetkili bayisi olarak en yeni mikrodalga fırın modellerini yetkili garanti ile sunuyoruz.",
  quoteTitle: "Mikrodalga Fiyat Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Mikrodalga Fırınlar",
  productsCategoryLink: "/kategori/mutfak-aletleri/mikrodalga",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => (p.category === "mutfak-aletleri" && p.subcategory === "mikrodalga") || (p.category === "ankastre" && p.subcategory === "firin" && p.name.toLowerCase().includes("mikrodalga")),
  faq: [
    { q: "Solo mu grill mi almalıyım?", a: "Solo mikrodalga ısıtma ve çözme için idealdir. Grill modelleri ise üst ısıtıcı ile kızartma da yapabilir." },
    { q: "Ankastre mikrodalga var mı?", a: "Evet, Samsung ankastre mikrodalga modelleri mevcuttur. Mutfak dolabınıza entegre edilir." },
    { q: "Taksit seçenekleri var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Mikrodalga seçimi hakkında merak ettikleriniz",
  jsonLdName: "Mikrodalga Fırın Modelleri - Zorlu Digital Plaza",
};

export default function MikrodalgaLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
