import {
  Shield, Award, Wrench, Zap, WashingMachine, Droplets, Gauge, Timer,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CamasirMakinesiLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "camasir-makinesi",
    seoTitle: t("lp.camasir.seoTitle"),
    seoDescription: t("lp.camasir.seoDesc"),
    heroBadge: t("lp.camasir.heroBadge"),
    heroTitle: t("lp.camasir.heroTitle"),
    heroTitleHighlight: t("lp.camasir.heroHighlight"),
    heroDescription: t("lp.camasir.heroDesc"),
    heroGradient: "from-violet-400 via-purple-400 to-fuchsia-400",
    ctaButtonText: t("lp.camasir.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.camasir.trust1"), desc: "Samsung & LG" },
      { icon: Award, label: t("lp.camasir.trust2"), desc: t("lp.camasir.trust2d") },
      { icon: Wrench, label: t("lp.camasir.trust3"), desc: t("lp.camasir.trust3d") },
      { icon: Zap, label: t("lp.camasir.trust4"), desc: t("lp.camasir.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Wrench, title: t("lp.camasir.ben1"), desc: t("lp.camasir.ben1d") },
      { icon: Shield, title: t("lp.camasir.ben2"), desc: t("lp.camasir.ben2d") },
      { icon: Zap, title: t("lp.camasir.ben3"), desc: t("lp.camasir.ben3d") },
      { icon: Gauge, title: t("lp.camasir.ben4"), desc: t("lp.camasir.ben4d") },
    ],
    benefitsTitle: t("lp.camasir.benTitle"),
    benefitsDescription: t("lp.camasir.benDesc"),
    quoteTitle: t("lp.camasir.quoteTitle"),
    quoteDescription: t("lp.camasir.quoteDesc"),
    productsTitle: t("lp.camasir.productsTitle"),
    productsCategoryLink: "/kategori/beyaz-esya/camasir-makinesi",
    productsCategoryLinkText: t("lp.camasir.viewAll"),
    filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "camasir-makinesi",
    faq: [
      { q: t("lp.camasir.faq1q"), a: t("lp.camasir.faq1a") },
      { q: t("lp.camasir.faq2q"), a: t("lp.camasir.faq2a") },
      { q: t("lp.camasir.faq3q"), a: t("lp.camasir.faq3a") },
      { q: t("lp.camasir.faq4q"), a: t("lp.camasir.faq4a") },
    ],
    faqTitle: t("lp.camasir.faqTitle"),
    faqDescription: t("lp.camasir.faqDesc"),
    jsonLdName: "Çamaşır Makinesi Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
