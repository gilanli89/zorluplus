import {
  Shield, Award, Wrench, Zap, Snowflake, Thermometer, Wind, Fan,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KlimaLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "klima",
    seoTitle: t("lp.klima.seoTitle"),
    seoDescription: t("lp.klima.seoDesc"),
    heroBadge: t("lp.klima.heroBadge"),
    heroTitle: t("lp.klima.heroTitle"),
    heroTitleHighlight: t("lp.klima.heroHighlight"),
    heroDescription: t("lp.klima.heroDesc"),
    heroGradient: "from-cyan-400 via-blue-400 to-indigo-400",
    ctaButtonText: t("lp.klima.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.klima.trust1"), desc: "Samsung & LG" },
      { icon: Award, label: t("lp.klima.trust2"), desc: t("lp.klima.trust2d") },
      { icon: Wrench, label: t("lp.klima.trust3"), desc: t("lp.klima.trust3d") },
      { icon: Zap, label: t("lp.klima.trust4"), desc: t("lp.klima.trust4d") },
    ],
    subtypes: [
      { icon: Snowflake, name: t("lp.klima.sub1"), desc: t("lp.klima.sub1d"), link: "/kategori/klima-isitma/split-klima" },
      { icon: Wind, name: t("lp.klima.sub2"), desc: t("lp.klima.sub2d"), link: "/kategori/klima-isitma/portatif-klima" },
      { icon: Fan, name: t("lp.klima.sub3"), desc: t("lp.klima.sub3d"), link: "/kategori/klima-isitma/klima" },
      { icon: Thermometer, name: t("lp.klima.sub4"), desc: t("lp.klima.sub4d"), link: "/kategori/klima-isitma/isiticilar" },
    ],
    benefits: [
      { icon: Wrench, title: t("lp.klima.ben1"), desc: t("lp.klima.ben1d") },
      { icon: Shield, title: t("lp.klima.ben2"), desc: t("lp.klima.ben2d") },
      { icon: Zap, title: t("lp.klima.ben3"), desc: t("lp.klima.ben3d") },
      { icon: Snowflake, title: t("lp.klima.ben4"), desc: t("lp.klima.ben4d") },
    ],
    benefitsTitle: t("lp.klima.benTitle"),
    benefitsDescription: t("lp.klima.benDesc"),
    quoteTitle: t("lp.klima.quoteTitle"),
    quoteDescription: t("lp.klima.quoteDesc"),
    productsTitle: t("lp.klima.productsTitle"),
    productsCategoryLink: "/kategori/klima-isitma",
    productsCategoryLinkText: t("lp.klima.viewAll"),
    filterProducts: (p) => p.category === "klima-isitma",
    faq: [
      { q: t("lp.klima.faq1q"), a: t("lp.klima.faq1a") },
      { q: t("lp.klima.faq2q"), a: t("lp.klima.faq2a") },
      { q: t("lp.klima.faq3q"), a: t("lp.klima.faq3a") },
      { q: t("lp.klima.faq4q"), a: t("lp.klima.faq4a") },
    ],
    faqTitle: t("lp.klima.faqTitle"),
    faqDescription: t("lp.klima.faqDesc"),
    jsonLdName: "Klima Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
