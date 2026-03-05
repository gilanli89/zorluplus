import {
  Shield, Award, Wrench, Zap, Droplets, Timer, Gauge, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "bulasik-makinesi",
  seoTitle: "Bulaşık Makinesi Fiyatları | Samsung - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Samsung bulaşık makinesi modelleri. Sessiz çalışma, düşük su tüketimi, enerji verimli modeller. 2 yıl garanti, ücretsiz kurulum.",
  heroBadge: "Samsung Yetkili Bayi",
  heroTitle: "Bulaşıklarda",
  heroTitleHighlight: "Pırıl Pırıl Temizlik",
  heroDescription: "Samsung bulaşık makineleriyle sessiz çalışma ve mükemmel temizlik. Ücretsiz kurulum ve 2 yıl garanti dahil.",
  heroGradient: "from-teal-400 via-emerald-400 to-green-400",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Yetkili Bayi", desc: "Samsung" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Wrench, label: "Ücretsiz Kurulum", desc: "Profesyonel montaj" },
    { icon: Droplets, label: "Su Tasarrufu", desc: "Düşük tüketim" },
  ],
  subtypes: [],
  benefits: [
    { icon: Wrench, title: "Ücretsiz Kurulum", desc: "Bulaşık makinenizi yerine teslim ediyor, su bağlantısını yapıyoruz." },
    { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung yetkili bayi garantisiyle güvende olun." },
    { icon: Droplets, title: "Su Tasarrufu", desc: "Düşük su tüketimli modeller ile tasarruf edin." },
    { icon: Sparkles, title: "Sessiz Çalışma", desc: "Gece bile rahatsız etmeyen sessiz teknoloji." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Bulaşık Makinesi Almalısınız?",
  benefitsDescription: "Samsung yetkili bayisi olarak en yeni bulaşık makinesi modellerini yetkili garanti ve profesyonel kurulum hizmetiyle sunuyoruz.",
  quoteTitle: "Bulaşık Makinesi Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Bulaşık Makineleri",
  productsCategoryLink: "/kategori/beyaz-esya/bulasik-makinesi",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "bulasik-makinesi",
  faq: [
    { q: "Kurulum dahil mi?", a: "Evet, tüm bulaşık makinesi alımlarında ücretsiz kurulum ve su bağlantısı yapılır." },
    { q: "Kaç kişilik model almalıyım?", a: "1-3 kişi için 6 kişilik, 3-5 kişi için 13 kişilik, büyük aileler için 14+ kişilik modeller idealdir." },
    { q: "Ankastre bulaşık makinesi var mı?", a: "Evet, ankastre ve solo modeller mevcuttur. Detaylar için bizi arayın." },
    { q: "Taksit var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Bulaşık makinesi seçimi hakkında merak ettikleriniz",
  jsonLdName: "Bulaşık Makinesi Modelleri - Zorlu Digital Plaza",
};

export default function BulasikMakinesiLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
