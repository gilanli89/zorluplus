import {
  Shield, Award, Wrench, Zap, Flame, Fan, CookingPot, Gauge,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AnkastreLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "ankastre",
    seoTitle: t("lp.ankastre.seoTitle"),
    seoDescription: t("lp.ankastre.seoDesc"),
    heroBadge: t("lp.ankastre.heroBadge"),
    heroTitle: t("lp.ankastre.heroTitle"),
    heroTitleHighlight: t("lp.ankastre.heroHighlight"),
    heroDescription: t("lp.ankastre.heroDesc"),
    heroGradient: "from-orange-400 via-red-400 to-rose-400",
    ctaButtonText: t("lp.ankastre.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.ankastre.trust1"), desc: "Samsung" },
      { icon: Award, label: t("lp.ankastre.trust2"), desc: t("lp.ankastre.trust2d") },
      { icon: Wrench, label: t("lp.ankastre.trust3"), desc: t("lp.ankastre.trust3d") },
      { icon: Gauge, label: t("lp.ankastre.trust4"), desc: t("lp.ankastre.trust4d") },
    ],
    subtypes: [
      { icon: Flame, name: t("lp.ankastre.sub1"), desc: t("lp.ankastre.sub1d"), link: "/kategori/ankastre/firin" },
      { icon: CookingPot, name: t("lp.ankastre.sub2"), desc: t("lp.ankastre.sub2d"), link: "/kategori/ankastre/ocak" },
      { icon: Fan, name: t("lp.ankastre.sub3"), desc: t("lp.ankastre.sub3d"), link: "/kategori/ankastre/davlumbaz" },
    ],
    benefits: [
      { icon: Wrench, title: t("lp.ankastre.ben1"), desc: t("lp.ankastre.ben1d") },
      { icon: Shield, title: t("lp.ankastre.ben2"), desc: t("lp.ankastre.ben2d") },
      { icon: Zap, title: t("lp.ankastre.ben3"), desc: t("lp.ankastre.ben3d") },
      { icon: Flame, title: t("lp.ankastre.ben4"), desc: t("lp.ankastre.ben4d") },
    ],
    benefitsTitle: t("lp.ankastre.benTitle"),
    benefitsDescription: t("lp.ankastre.benDesc"),
    quoteTitle: t("lp.ankastre.quoteTitle"),
    quoteDescription: t("lp.ankastre.quoteDesc"),
    productsTitle: t("lp.ankastre.productsTitle"),
    productsCategoryLink: "/kategori/ankastre",
    productsCategoryLinkText: t("lp.ankastre.viewAll"),
    filterProducts: (p) => p.category === "ankastre",
    faq: [
      { q: t("lp.ankastre.faq1q"), a: t("lp.ankastre.faq1a") },
      { q: t("lp.ankastre.faq2q"), a: t("lp.ankastre.faq2a") },
      { q: t("lp.ankastre.faq3q"), a: t("lp.ankastre.faq3a") },
      { q: t("lp.ankastre.faq4q"), a: t("lp.ankastre.faq4a") },
    ],
    faqTitle: t("lp.ankastre.faqTitle"),
    faqDescription: t("lp.ankastre.faqDesc"),
    jsonLdName: "Ankastre Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
