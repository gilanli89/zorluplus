import {
  Shield, Award, Wrench, Zap, Fan, Sparkles, Wind, Shirt,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";

const config: CategoryLandingConfig = {
  slug: "ev-aletleri",
  seoTitle: "Ev Aletleri | Elektrikli Süpürge, Ütü, Mutfak Robotu - Kıbrıs | Zorlu Digital Plaza",
  seoDescription: "Kıbrıs'ta elektrikli süpürge, ütü, vantilatör ve mutfak robotu modelleri. Philips, Samsung, LG. 2 yıl garanti. Zorlu Digital Plaza.",
  heroBadge: "Yetkili Satış Noktası",
  heroTitle: "Evinizi Kolaylaştıran",
  heroTitleHighlight: "Akıllı Ev Aletleri",
  heroDescription: "Elektrikli süpürge, ütü, vantilatör ve daha fazlası. Hayatınızı kolaylaştıran ev aletleri bir tıkla kapınızda.",
  heroGradient: "from-emerald-400 via-teal-400 to-cyan-400",
  ctaButtonText: "Ürünleri Gör",
  ctaButtonLink: "#urunler",
  trustItems: [
    { icon: Shield, label: "Güvenli Alışveriş", desc: "Yetkili satış" },
    { icon: Award, label: "2 Yıl Garanti", desc: "Tüm ürünlerde" },
    { icon: Zap, label: "Hızlı Teslimat", desc: "Aynı gün kargo" },
    { icon: Sparkles, label: "Premium Markalar", desc: "Philips, Samsung" },
  ],
  subtypes: [
    { icon: Wind, name: "Elektrikli Süpürge", desc: "Dikey, robot ve torbalı süpürgeler", link: "/kategori/kucuk-ev-aletleri/supurge" },
    { icon: Shirt, name: "Ütü", desc: "Buhar istasyonlu ve normal ütüler", link: "/kategori/kucuk-ev-aletleri/utu" },
    { icon: Fan, name: "Vantilatör", desc: "Ayaklı, masa tipi ve kule vantilatörler", link: "/kategori/kucuk-ev-aletleri/ventilator" },
  ],
  benefits: [
    { icon: Shield, title: "2 Yıl Garanti", desc: "Tüm ev aletlerinde resmi garanti güvencesi." },
    { icon: Sparkles, title: "Premium Markalar", desc: "Philips, Samsung ve LG'nin en yeni modellerini sunuyoruz." },
    { icon: Zap, title: "Hızlı Teslimat", desc: "Stokta olan ürünlerde aynı gün kargo imkanı." },
    { icon: Wrench, title: "Yetkili Servis", desc: "Satış sonrası yetkili servis desteğimiz var." },
  ],
  benefitsTitle: "Neden ZorluPlus'tan Ev Aleti Almalısınız?",
  benefitsDescription: "En iyi markların küçük ev aletlerini güvenli alışveriş ve yetkili garanti ile sunuyoruz.",
  quoteTitle: "Ev Aleti Teklifi",
  quoteDescription: "Bilgilerinizi bırakın, size özel teklifimizi sunalım.",
  productsTitle: "Ev Aletleri",
  productsCategoryLink: "/kategori/kucuk-ev-aletleri",
  productsCategoryLinkText: "Tümünü Gör",
  filterProducts: (p) => p.category === "kucuk-ev-aletleri",
  faq: [
    { q: "Hangi süpürge modellerini tavsiye edersiniz?", a: "Günlük kullanım için dikey şarjlı süpürgeler çok pratiktir. Derin temizlik için torbalı modeller daha güçlüdür." },
    { q: "Buhar istasyonlu ütü normal ütüden farkı nedir?", a: "Buhar istasyonlu ütüler çok daha fazla buhar üretir, kırışıkları daha hızlı açar ve büyük çamaşır yığınları için idealdir." },
    { q: "Taksit var mı?", a: "Evet, kredi kartına taksit ve havale/EFT ödeme seçeneklerimiz mevcuttur." },
  ],
  faqTitle: "Sık Sorulan Sorular",
  faqDescription: "Ev aletleri hakkında merak ettikleriniz",
  jsonLdName: "Ev Aletleri - Zorlu Digital Plaza",
};

export default function EvAletleriLandingPage() {
  return <CategoryLandingTemplate config={config} />;
}
