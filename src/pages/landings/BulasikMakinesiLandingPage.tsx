import {
  Shield, Award, Wrench, Zap, Droplets, Timer, Gauge, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BulasikMakinesiLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "bulasik-makinesi",
    seoTitle: t("lp.bulasik.seoTitle"),
    seoDescription: t("lp.bulasik.seoDesc"),
    heroBadge: t("lp.bulasik.heroBadge"),
    heroTitle: t("lp.bulasik.heroTitle"),
    heroTitleHighlight: t("lp.bulasik.heroHighlight"),
    heroDescription: t("lp.bulasik.heroDesc"),
    heroGradient: "from-teal-400 via-emerald-400 to-green-400",
    ctaButtonText: t("lp.bulasik.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.bulasik.trust1"), desc: "Samsung" },
      { icon: Award, label: t("lp.bulasik.trust2"), desc: t("lp.bulasik.trust2d") },
      { icon: Wrench, label: t("lp.bulasik.trust3"), desc: t("lp.bulasik.trust3d") },
      { icon: Droplets, label: t("lp.bulasik.trust4"), desc: t("lp.bulasik.trust4d") },
    ],
    subtypes: [],
    benefits: [
      { icon: Wrench, title: t("lp.bulasik.ben1"), desc: t("lp.bulasik.ben1d") },
      { icon: Shield, title: t("lp.bulasik.ben2"), desc: t("lp.bulasik.ben2d") },
      { icon: Droplets, title: t("lp.bulasik.ben3"), desc: t("lp.bulasik.ben3d") },
      { icon: Sparkles, title: t("lp.bulasik.ben4"), desc: t("lp.bulasik.ben4d") },
    ],
    benefitsTitle: t("lp.bulasik.benTitle"),
    benefitsDescription: t("lp.bulasik.benDesc"),
    quoteTitle: t("lp.bulasik.quoteTitle"),
    quoteDescription: t("lp.bulasik.quoteDesc"),
    productsTitle: t("lp.bulasik.productsTitle"),
    productsCategoryLink: "/kategori/beyaz-esya/bulasik-makinesi",
    productsCategoryLinkText: t("lp.bulasik.viewAll"),
    filterProducts: (p) => p.category === "beyaz-esya" && p.subcategory === "bulasik-makinesi",
    faq: [
      { q: t("lp.bulasik.faq1q"), a: t("lp.bulasik.faq1a") },
      { q: t("lp.bulasik.faq2q"), a: t("lp.bulasik.faq2a") },
      { q: t("lp.bulasik.faq3q"), a: t("lp.bulasik.faq3a") },
      { q: t("lp.bulasik.faq4q"), a: t("lp.bulasik.faq4a") },
    ],
    faqTitle: t("lp.bulasik.faqTitle"),
    faqDescription: t("lp.bulasik.faqDesc"),
    jsonLdName: "Bulaşık Makinesi Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
