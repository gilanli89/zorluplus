import {
  Shield, Award, Zap, Flame, Timer, Sparkles, Heart, Gauge,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AirfryerLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "airfryer",
    seoTitle: t("lp.airfryer.seoTitle"),
    seoDescription: t("lp.airfryer.seoDesc"),
    heroBadge: t("lp.airfryer.heroBadge"),
    heroTitle: t("lp.airfryer.heroTitle"),
    heroTitleHighlight: t("lp.airfryer.heroHighlight"),
    heroDescription: t("lp.airfryer.heroDesc"),
    heroGradient: "from-red-400 via-orange-400 to-yellow-400",
    ctaButtonText: t("lp.airfryer.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.airfryer.trust1"), desc: t("lp.airfryer.trust1d") },
      { icon: Award, label: t("lp.airfryer.trust2"), desc: t("lp.airfryer.trust2d") },
      { icon: Heart, label: t("lp.airfryer.trust3"), desc: t("lp.airfryer.trust3d") },
      { icon: Zap, label: t("lp.airfryer.trust4"), desc: t("lp.airfryer.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Heart, title: t("lp.airfryer.ben1"), desc: t("lp.airfryer.ben1d") },
      { icon: Shield, title: t("lp.airfryer.ben2"), desc: t("lp.airfryer.ben2d") },
      { icon: Timer, title: t("lp.airfryer.ben3"), desc: t("lp.airfryer.ben3d") },
      { icon: Sparkles, title: t("lp.airfryer.ben4"), desc: t("lp.airfryer.ben4d") },
    ],
    benefitsTitle: t("lp.airfryer.benTitle"),
    benefitsDescription: t("lp.airfryer.benDesc"),
    quoteTitle: t("lp.airfryer.quoteTitle"),
    quoteDescription: t("lp.airfryer.quoteDesc"),
    productsTitle: t("lp.airfryer.productsTitle"),
    productsCategoryLink: "/kategori/mutfak-aletleri/air-fryer",
    productsCategoryLinkText: t("lp.airfryer.viewAll"),
    filterProducts: (p) => p.category === "mutfak-aletleri" && p.subcategory === "air-fryer",
    faq: [
      { q: t("lp.airfryer.faq1q"), a: t("lp.airfryer.faq1a") },
      { q: t("lp.airfryer.faq2q"), a: t("lp.airfryer.faq2a") },
      { q: t("lp.airfryer.faq3q"), a: t("lp.airfryer.faq3a") },
      { q: t("lp.airfryer.faq4q"), a: t("lp.airfryer.faq4a") },
    ],
    faqTitle: t("lp.airfryer.faqTitle"),
    faqDescription: t("lp.airfryer.faqDesc"),
    jsonLdName: "Air Fryer Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
