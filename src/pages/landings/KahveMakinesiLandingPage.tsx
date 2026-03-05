import {
  Shield, Award, Coffee, Zap, Timer, Sparkles, Gauge, Wrench,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "kahve-makinesi",
  seoTitle: "Kahve Makinesi Fiyatları | Krups & Philips - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta Krups ve Philips kahve makinesi modelleri. Filtre kahve, espresso, otomatik kahve makineleri. Zorlu Digital Plaza güvencesiyle.",
  heroBadge: "Yetkili Satış Noktası",
  heroTitle: "Evinizde",
  heroTitleHighlight: "Barista Kalitesinde Kahve",
  heroDescription: "Krups ve Philips kahve makineleriyle her sabah mükemmel bir kahve deneyimi yaşayın.",
  heroGradient: "from-amber-600 via-yellow-700 to-orange-600",
  ctaButtonText: "Modelleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Güvenli Alışveriş", desc: "Yetkili satış" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm modellerde" },
    { icon: Coffee, label: "Uzman Tavsiyesi", desc: "Doğru makine seçimi" },
    { icon: Zap, label: "Hızlı Teslimat", desc: "Aynı gün kargo" },
  ],
  subtypes: [],
  benefits: [
    { icon: Shield, title: "Garanti Güvencesi", desc: "Tüm kahve makinelerinde 2 yıl garanti." },
    { icon: Coffee, title: "Uzman Danışmanlık", desc: "İhtiyacınıza uygun kahve makinesi seçiminde yardımcı oluyoruz." },
    { icon: Sparkles, title: "Premium Markalar", desc: "Krups ve Philips'in en yeni modellerini stoklarımızda bulunduruyoruz." },
    { icon: Zap, title: "Hızlı Teslimat", desc: "Stokta olan ürünlerde aynı gün kargo imkanı." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Kahve Makinesi Almalısınız?",
  benefitsDescription: "En iyi markların kahve makinelerini güvenli alışveriş ve garanti ile sunuyoruz.",
  quoteTitle: "Kahve Makinesi Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Kahve Makineleri",
  productsCategoryLink: "/kategori/mutfak-aletleri/kahve-makinesi",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "mutfak-aletleri" && p.subcategory === "kahve-makinesi",
  faq: [
    { q: "Filtre mi espresso mu almalıyım?", a: "Filtre kahve makinesi sade kahve sevenler için, espresso makinesi ise yoğun latte/cappuccino sevenler için idealdir." },
    { q: "Otomatik kahve makinesi nedir?", a: "Çekirdekten fincana kadar tüm işlemi tek tuşla yapan makinelerdir. Hem filtre hem espresso yapabilir." },
    { q: "Taksit var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Kahve makinesi seçimi hakkında merak ettikleriniz",
  jsonLdName: "Kahve Makinesi Modelleri - Zorlu Digital Plaza",
};

export default function KahveMakinesiLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
