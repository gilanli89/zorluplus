import {
  Shield, Award, Wrench, Zap, Flame, Timer, Thermometer, Sparkles,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FirinLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "firin",
    seoTitle: t("lp.firin.seoTitle"),
    seoDescription: t("lp.firin.seoDesc"),
    heroBadge: t("lp.firin.heroBadge"),
    heroTitle: t("lp.firin.heroTitle"),
    heroTitleHighlight: t("lp.firin.heroHighlight"),
    heroDescription: t("lp.firin.heroDesc"),
    heroGradient: "from-orange-400 via-amber-400 to-yellow-400",
    ctaButtonText: t("lp.firin.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.firin.trust1"), desc: "Samsung" },
      { icon: Award, label: t("lp.firin.trust2"), desc: t("lp.firin.trust2d") },
      { icon: Wrench, label: t("lp.firin.trust3"), desc: t("lp.firin.trust3d") },
      { icon: Zap, label: t("lp.firin.trust4"), desc: t("lp.firin.trust4d") },
    ],
    subtypes: [
      { icon: Flame, name: t("lp.firin.sub1"), desc: t("lp.firin.sub1d"), link: "/kategori/ankastre/firin" },
      { icon: Thermometer, name: t("lp.firin.sub2"), desc: t("lp.firin.sub2d"), link: "/kategori/kucuk-ev-aletleri/firin" },
      { icon: Sparkles, name: t("lp.firin.sub3"), desc: t("lp.firin.sub3d"), link: "/kategori/ankastre/firin" },
    ],
    benefits: [
      { icon: Wrench, title: t("lp.firin.ben1"), desc: t("lp.firin.ben1d") },
      { icon: Shield, title: t("lp.firin.ben2"), desc: t("lp.firin.ben2d") },
      { icon: Timer, title: t("lp.firin.ben3"), desc: t("lp.firin.ben3d") },
      { icon: Flame, title: t("lp.firin.ben4"), desc: t("lp.firin.ben4d") },
    ],
    benefitsTitle: t("lp.firin.benTitle"),
    benefitsDescription: t("lp.firin.benDesc"),
    quoteTitle: t("lp.firin.quoteTitle"),
    quoteDescription: t("lp.firin.quoteDesc"),
    productsTitle: t("lp.firin.productsTitle"),
    productsCategoryLink: "/kategori/ankastre/firin",
    productsCategoryLinkText: t("lp.firin.viewAll"),
    filterProducts: (p) =>
      (p.category === "ankastre" && p.subcategory?.toLowerCase().includes("fırın")) ||
      (p.category === "ankastre" && p.subcategory?.toLowerCase().includes("firin")) ||
      p.subcategory?.toLowerCase().includes("fırın") ||
      p.subcategory?.toLowerCase().includes("firin"),
    faq: [
      { q: t("lp.firin.faq1q"), a: t("lp.firin.faq1a") },
      { q: t("lp.firin.faq2q"), a: t("lp.firin.faq2a") },
      { q: t("lp.firin.faq3q"), a: t("lp.firin.faq3a") },
      { q: t("lp.firin.faq4q"), a: t("lp.firin.faq4a") },
    ],
    faqTitle: t("lp.firin.faqTitle"),
    faqDescription: t("lp.firin.faqDesc"),
    jsonLdName: "Fırın Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
