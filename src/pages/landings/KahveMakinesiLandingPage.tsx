import {
  Shield, Award, Coffee, Zap, Timer, Sparkles, Gauge, Wrench,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KahveMakinesiLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "kahve-makinesi",
    seoTitle: t("lp.kahve.seoTitle"),
    seoDescription: t("lp.kahve.seoDesc"),
    heroBadge: t("lp.kahve.heroBadge"),
    heroTitle: t("lp.kahve.heroTitle"),
    heroTitleHighlight: t("lp.kahve.heroHighlight"),
    heroDescription: t("lp.kahve.heroDesc"),
    heroGradient: "from-amber-600 via-yellow-700 to-orange-600",
    ctaButtonText: t("lp.kahve.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.kahve.trust1"), desc: t("lp.kahve.trust1d") },
      { icon: Award, label: t("lp.kahve.trust2"), desc: t("lp.kahve.trust2d") },
      { icon: Coffee, label: t("lp.kahve.trust3"), desc: t("lp.kahve.trust3d") },
      { icon: Zap, label: t("lp.kahve.trust4"), desc: t("lp.kahve.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Shield, title: t("lp.kahve.ben1"), desc: t("lp.kahve.ben1d") },
      { icon: Coffee, title: t("lp.kahve.ben2"), desc: t("lp.kahve.ben2d") },
      { icon: Sparkles, title: t("lp.kahve.ben3"), desc: t("lp.kahve.ben3d") },
      { icon: Zap, title: t("lp.kahve.ben4"), desc: t("lp.kahve.ben4d") },
    ],
    benefitsTitle: t("lp.kahve.benTitle"),
    benefitsDescription: t("lp.kahve.benDesc"),
    quoteTitle: t("lp.kahve.quoteTitle"),
    quoteDescription: t("lp.kahve.quoteDesc"),
    productsTitle: t("lp.kahve.productsTitle"),
    productsCategoryLink: "/kategori/mutfak-aletleri/kahve-makinesi",
    productsCategoryLinkText: t("lp.kahve.viewAll"),
    filterProducts: (p) => p.category === "mutfak-aletleri" && p.subcategory === "kahve-makinesi",
    faq: [
      { q: t("lp.kahve.faq1q"), a: t("lp.kahve.faq1a") },
      { q: t("lp.kahve.faq2q"), a: t("lp.kahve.faq2a") },
      { q: t("lp.kahve.faq3q"), a: t("lp.kahve.faq3a") },
    ],
    faqTitle: t("lp.kahve.faqTitle"),
    faqDescription: t("lp.kahve.faqDesc"),
    jsonLdName: "Kahve Makinesi Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
