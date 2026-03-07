import {
  Shield, Award, Wrench, Zap, Waves, Timer, Gauge, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MikrodalgaLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "mikrodalga",
    seoTitle: t("lp.mikro.seoTitle"),
    seoDescription: t("lp.mikro.seoDesc"),
    heroBadge: t("lp.mikro.heroBadge"),
    heroTitle: t("lp.mikro.heroTitle"),
    heroTitleHighlight: t("lp.mikro.heroHighlight"),
    heroDescription: t("lp.mikro.heroDesc"),
    heroGradient: "from-rose-400 via-pink-400 to-fuchsia-400",
    ctaButtonText: t("lp.mikro.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.mikro.trust1"), desc: "Samsung" },
      { icon: Award, label: t("lp.mikro.trust2"), desc: t("lp.mikro.trust2d") },
      { icon: Zap, label: t("lp.mikro.trust3"), desc: t("lp.mikro.trust3d") },
      { icon: Sparkles, label: t("lp.mikro.trust4"), desc: t("lp.mikro.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Shield, title: t("lp.mikro.ben1"), desc: t("lp.mikro.ben1d") },
      { icon: Zap, title: t("lp.mikro.ben2"), desc: t("lp.mikro.ben2d") },
      { icon: Sparkles, title: t("lp.mikro.ben3"), desc: t("lp.mikro.ben3d") },
      { icon: Wrench, title: t("lp.mikro.ben4"), desc: t("lp.mikro.ben4d") },
    ],
    benefitsTitle: t("lp.mikro.benTitle"),
    benefitsDescription: t("lp.mikro.benDesc"),
    quoteTitle: t("lp.mikro.quoteTitle"),
    quoteDescription: t("lp.mikro.quoteDesc"),
    productsTitle: t("lp.mikro.productsTitle"),
    productsCategoryLink: "/kategori/mutfak-aletleri/mikrodalga",
    productsCategoryLinkText: t("lp.mikro.viewAll"),
    filterProducts: (p) => (p.category === "mutfak-aletleri" && p.subcategory === "mikrodalga") || (p.category === "ankastre" && p.subcategory === "firin"),
    faq: [
      { q: t("lp.mikro.faq1q"), a: t("lp.mikro.faq1a") },
      { q: t("lp.mikro.faq2q"), a: t("lp.mikro.faq2a") },
      { q: t("lp.mikro.faq3q"), a: t("lp.mikro.faq3a") },
    ],
    faqTitle: t("lp.mikro.faqTitle"),
    faqDescription: t("lp.mikro.faqDesc"),
    jsonLdName: "Mikrodalga Fırın Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
