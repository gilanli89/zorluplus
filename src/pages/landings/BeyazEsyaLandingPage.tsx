import {
  Shield, Award, Wrench, Zap, Truck, Refrigerator, WashingMachine, Droplets, Snowflake,
} from "lucide-react";
import CategoryLandingTemplate, { CategoryLandingConfig } from "@/components/CategoryLandingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BeyazEsyaLandingPage() {
  const { t } = useLanguage();

  const config: CategoryLandingConfig = {
    slug: "beyaz-esya",
    seoTitle: t("lp.beyaz.seoTitle"),
    seoDescription: t("lp.beyaz.seoDesc"),
    heroBadge: t("lp.beyaz.heroBadge"),
    heroTitle: t("lp.beyaz.heroTitle"),
    heroTitleHighlight: t("lp.beyaz.heroHighlight"),
    heroDescription: t("lp.beyaz.heroDesc"),
    heroGradient: "from-sky-400 via-blue-400 to-indigo-400",
    ctaButtonText: t("lp.beyaz.ctaBtn"),
    ctaButtonLink: "#urunler",
    trustItems: [
      { icon: Shield, label: t("lp.beyaz.trust1"), desc: "Samsung & LG" },
      { icon: Award, label: t("lp.beyaz.trust2"), desc: t("lp.beyaz.trust2d") },
      { icon: Wrench, label: t("lp.beyaz.trust3"), desc: t("lp.beyaz.trust3d") },
      { icon: Truck, label: t("lp.beyaz.trust4"), desc: t("lp.beyaz.trust4d") },
    ],
    subtypes: [
      { icon: Refrigerator, name: t("lp.beyaz.sub1"), desc: t("lp.beyaz.sub1d"), link: "/kategori/beyaz-esya/buzdolabi" },
      { icon: WashingMachine, name: t("lp.beyaz.sub2"), desc: t("lp.beyaz.sub2d"), link: "/kategori/beyaz-esya/camasir-makinesi" },
      { icon: Droplets, name: t("lp.beyaz.sub3"), desc: t("lp.beyaz.sub3d"), link: "/kategori/beyaz-esya/bulasik-makinesi" },
      { icon: Snowflake, name: t("lp.beyaz.sub4"), desc: t("lp.beyaz.sub4d"), link: "/kategori/beyaz-esya/derin-dondurucu" },
    ],
    benefits: [
      { icon: Wrench, title: t("lp.beyaz.ben1"), desc: t("lp.beyaz.ben1d") },
      { icon: Shield, title: t("lp.beyaz.ben2"), desc: t("lp.beyaz.ben2d") },
      { icon: Zap, title: t("lp.beyaz.ben3"), desc: t("lp.beyaz.ben3d") },
      { icon: Truck, title: t("lp.beyaz.ben4"), desc: t("lp.beyaz.ben4d") },
    ],
    benefitsTitle: t("lp.beyaz.benTitle"),
    benefitsDescription: t("lp.beyaz.benDesc"),
    quoteTitle: t("lp.beyaz.quoteTitle"),
    quoteDescription: t("lp.beyaz.quoteDesc"),
    productsTitle: t("lp.beyaz.productsTitle"),
    productsCategoryLink: "/kategori/beyaz-esya",
    productsCategoryLinkText: t("lp.beyaz.viewAll"),
    filterProducts: (p) => p.category === "beyaz-esya",
    faq: [
      { q: t("lp.beyaz.faq1q"), a: t("lp.beyaz.faq1a") },
      { q: t("lp.beyaz.faq2q"), a: t("lp.beyaz.faq2a") },
      { q: t("lp.beyaz.faq3q"), a: t("lp.beyaz.faq3a") },
      { q: t("lp.beyaz.faq4q"), a: t("lp.beyaz.faq4a") },
    ],
    faqTitle: t("lp.beyaz.faqTitle"),
    faqDescription: t("lp.beyaz.faqDesc"),
    jsonLdName: "Beyaz Eşya Modelleri - Zorlu Digital Plaza",
  };

  return <CategoryLandingTemplate config={config} />;
}
