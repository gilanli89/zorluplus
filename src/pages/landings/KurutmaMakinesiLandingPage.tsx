import {
  Shield, Award, Wrench, Zap, Wind, Timer, Gauge, Shirt,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KurutmaMakinesiLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "kurutma-makinesi",
    seoTitle: t("lp.kurutma.seoTitle"),
    seoDescription: t("lp.kurutma.seoDesc"),
    heroBadge: t("lp.kurutma.heroBadge"),
    heroTitle: t("lp.kurutma.heroTitle"),
    heroTitleHighlight: t("lp.kurutma.heroHighlight"),
    heroDescription: t("lp.kurutma.heroDesc"),
    heroGradient: "from-amber-400 via-orange-400 to-red-400",
    ctaButtonText: t("lp.kurutma.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.kurutma.trust1"), desc: "Samsung & LG" },
      { icon: Award, label: t("lp.kurutma.trust2"), desc: t("lp.kurutma.trust2d") },
      { icon: Wrench, label: t("lp.kurutma.trust3"), desc: t("lp.kurutma.trust3d") },
      { icon: Zap, label: t("lp.kurutma.trust4"), desc: t("lp.kurutma.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Wrench, title: t("lp.kurutma.ben1"), desc: t("lp.kurutma.ben1d") },
      { icon: Shield, title: t("lp.kurutma.ben2"), desc: t("lp.kurutma.ben2d") },
      { icon: Zap, title: t("lp.kurutma.ben3"), desc: t("lp.kurutma.ben3d") },
      { icon: Shirt, title: t("lp.kurutma.ben4"), desc: t("lp.kurutma.ben4d") },
    ],
    benefitsTitle: t("lp.kurutma.benTitle"),
    benefitsDescription: t("lp.kurutma.benDesc"),
    quoteTitle: t("lp.kurutma.quoteTitle"),
    quoteDescription: t("lp.kurutma.quoteDesc"),
    productsTitle: t("lp.kurutma.productsTitle"),
    productsCategoryLink: "/kategori/beyaz-esya/kurutma-makinesi",
    productsCategoryLinkText: t("lp.kurutma.viewAll"),
    filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "kurutma-makinesi",
    faq: [
      { q: t("lp.kurutma.faq1q"), a: t("lp.kurutma.faq1a") },
      { q: t("lp.kurutma.faq2q"), a: t("lp.kurutma.faq2a") },
      { q: t("lp.kurutma.faq3q"), a: t("lp.kurutma.faq3a") },
      { q: t("lp.kurutma.faq4q"), a: t("lp.kurutma.faq4a") },
    ],
    faqTitle: t("lp.kurutma.faqTitle"),
    faqDescription: t("lp.kurutma.faqDesc"),
    jsonLdName: "Kurutma Makinesi Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
