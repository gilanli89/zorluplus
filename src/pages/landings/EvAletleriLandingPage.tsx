import {
  Shield, Award, Wrench, Zap, Fan, Sparkles, Wind, Shirt,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EvAletleriLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "ev-aletleri",
    seoTitle: t("lp.ev.seoTitle"),
    seoDescription: t("lp.ev.seoDesc"),
    heroBadge: t("lp.ev.heroBadge"),
    heroTitle: t("lp.ev.heroTitle"),
    heroTitleHighlight: t("lp.ev.heroHighlight"),
    heroDescription: t("lp.ev.heroDesc"),
    heroGradient: "from-emerald-400 via-teal-400 to-cyan-400",
    ctaButtonText: t("lp.ev.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.ev.trust1"), desc: t("lp.ev.trust1d") },
      { icon: Award, label: t("lp.ev.trust2"), desc: t("lp.ev.trust2d") },
      { icon: Zap, label: t("lp.ev.trust3"), desc: t("lp.ev.trust3d") },
      { icon: Sparkles, label: t("lp.ev.trust4"), desc: t("lp.ev.trust4d") },
    ],
    subtypes: [
      { icon: Wind, name: t("lp.ev.sub1"), desc: t("lp.ev.sub1d"), link: "/kategori/kucuk-ev-aletleri/supurge" },
      { icon: Shirt, name: t("lp.ev.sub2"), desc: t("lp.ev.sub2d"), link: "/kategori/kucuk-ev-aletleri/utu" },
      { icon: Fan, name: t("lp.ev.sub3"), desc: t("lp.ev.sub3d"), link: "/kategori/kucuk-ev-aletleri/ventilator" },
    ],
    benefits: [
      { icon: Shield, title: t("lp.ev.ben1"), desc: t("lp.ev.ben1d") },
      { icon: Sparkles, title: t("lp.ev.ben2"), desc: t("lp.ev.ben2d") },
      { icon: Zap, title: t("lp.ev.ben3"), desc: t("lp.ev.ben3d") },
      { icon: Wrench, title: t("lp.ev.ben4"), desc: t("lp.ev.ben4d") },
    ],
    benefitsTitle: t("lp.ev.benTitle"),
    benefitsDescription: t("lp.ev.benDesc"),
    quoteTitle: t("lp.ev.quoteTitle"),
    quoteDescription: t("lp.ev.quoteDesc"),
    productsTitle: t("lp.ev.productsTitle"),
    productsCategoryLink: "/kategori/kucuk-ev-aletleri",
    productsCategoryLinkText: t("lp.ev.viewAll"),
    filterProducts: (p) => p.category === "kucuk-ev-aletleri",
    faq: [
      { q: t("lp.ev.faq1q"), a: t("lp.ev.faq1a") },
      { q: t("lp.ev.faq2q"), a: t("lp.ev.faq2a") },
      { q: t("lp.ev.faq3q"), a: t("lp.ev.faq3a") },
    ],
    faqTitle: t("lp.ev.faqTitle"),
    faqDescription: t("lp.ev.faqDesc"),
    jsonLdName: "Ev Aletleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
