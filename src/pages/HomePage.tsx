import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Sparkles, Truck, ShieldCheck, Gift } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/lib/constants";
import TrustSection from "@/components/TrustSection";
import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoryGrid from "@/components/home/CategoryGrid";
import BrandShowcase from "@/components/home/BrandShowcase";
import StoreLocator from "@/components/store/StoreLocator";
import CTASection from "@/components/home/CTASection";
import SEOHead from "@/components/common/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

import widgetTv from "@/assets/widget-tv.jpg";
import widgetBeyazEsya from "@/assets/widget-beyaz-esya.jpg";
import widgetAnkastre from "@/assets/widget-ankastre.jpg";
import widgetKlima from "@/assets/widget-klima.jpg";
import zorluBanner from "@/assets/zorlu-banner-footer.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const branchCard = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export default function HomePage() {
  const { t } = useLanguage();

  const CATEGORY_WIDGETS = [
    { slug: "tv-goruntu", titleKey: "home.categoryWidgets.tv", subtitleKey: "home.categoryWidgets.tvSub", image: widgetTv },
    { slug: "beyaz-esya", titleKey: "home.categoryWidgets.whiteGoods", subtitleKey: "home.categoryWidgets.whiteGoodsSub", badgeKey: "home.categoryWidgets.whiteGoodsBadge", ctaKey: "home.categoryWidgets.whiteGoodsCta", image: widgetBeyazEsya },
    { slug: "ankastre", titleKey: "home.categoryWidgets.builtin", subtitleKey: "home.categoryWidgets.builtinSub", badgeKey: "home.categoryWidgets.builtinBadge", ctaKey: "home.categoryWidgets.builtinCta", image: widgetAnkastre },
    { slug: "klima-isitma", titleKey: "home.categoryWidgets.ac", subtitleKey: "home.categoryWidgets.acSub", badgeKey: "home.categoryWidgets.acBadge", ctaKey: "home.categoryWidgets.acCta", image: widgetKlima },
  ];

  return (
    <>
      <SEOHead />
      <HeroBanner />
      <TrustSection />

      {/* Promo Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-primary text-primary-foreground"
      >
        <div className="container py-3 flex items-center justify-center gap-6 text-xs md:text-sm font-semibold overflow-x-auto scrollbar-hide">
          <span className="flex items-center gap-1.5 whitespace-nowrap"><PremiumIconInline icon={Truck} size={15} className="text-primary-foreground" /> Ücretsiz Kurulum & Montaj</span>
          <span className="hidden sm:inline text-primary-foreground/40">|</span>
          <span className="flex items-center gap-1.5 whitespace-nowrap"><PremiumIconInline icon={ShieldCheck} size={15} className="text-primary-foreground" /> Resmi Distribütör Garantisi</span>
          <span className="hidden sm:inline text-primary-foreground/40">|</span>
          <span className="hidden md:flex items-center gap-1.5 whitespace-nowrap"><PremiumIconInline icon={Gift} size={15} className="text-primary-foreground" /> Taksit Seçenekleri Mevcut</span>
        </div>
      </motion.div>

      <FeaturedProducts />

      {/* Category Widgets */}
      <section className="py-10 md:py-16">
        <div className="container flex flex-col gap-4 md:gap-6">
          {CATEGORY_WIDGETS.map((cat, i) => (
            <motion.div
              key={cat.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
            >
              <Link
                to={`/kategori/${cat.slug}`}
                className="group relative block overflow-hidden rounded-2xl h-48 md:h-64 lg:h-72"
              >
                <img
                  src={cat.image}
                  alt={t(cat.titleKey)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
                
                {/* Sales Tags */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                  {i === 0 && (
                    <Badge className="text-[10px] rounded-full px-3 py-1 gap-1 bg-rose-500 text-white border-0 shadow-lg animate-pulse font-bold">
                      <PremiumIconInline icon={Sparkles} size={11} className="text-white" /> Yeni Modeller
                    </Badge>
                  )}
                  {i === 1 && (
                    <Badge className="text-[10px] rounded-full px-3 py-1 gap-1 bg-emerald-500 text-white border-0 shadow-lg font-bold">
                      <PremiumIconInline icon={Truck} size={11} className="text-white" /> Ücretsiz Kurulum
                    </Badge>
                  )}
                  {i === 2 && (
                    <Badge className="text-[10px] rounded-full px-3 py-1 gap-1 bg-amber-500 text-white border-0 shadow-lg font-bold">
                      <PremiumIconInline icon={ShieldCheck} size={11} className="text-white" /> Resmi Garanti
                    </Badge>
                  )}
                  {i === 3 && (
                    <Badge className="text-[10px] rounded-full px-3 py-1 gap-1 bg-violet-500 text-white border-0 shadow-lg animate-pulse font-bold">
                      <PremiumIconInline icon={Gift} size={11} className="text-white" /> Kampanya
                    </Badge>
                  )}
                </div>

                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 max-w-xl">
                  <h2 className="heading-2 text-white leading-tight">
                    {t(cat.titleKey)}
                  </h2>
                  <p className="text-white/80 body-sm mt-2">
                    {t(cat.subtitleKey)}
                  </p>
                  {cat.badgeKey && (
                    <p className="text-white/60 text-xs font-medium mt-2">
                      {t(cat.badgeKey)}
                    </p>
                  )}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 rounded-full px-5 py-2 backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                      {cat.ctaKey ? t(cat.ctaKey) : t("home.explore")} <PremiumIconInline icon={ArrowRight} size={16} className="text-white transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CategoryGrid />
      <BrandShowcase />

      {/* Branches CTA */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="heading-2 text-foreground pulse-heading">{t("home.branches")}</h2>
            <p className="text-muted-foreground mt-2">{t("home.branchesDesc")}</p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {BRANCHES.map(b => (
              <motion.div
                key={b.id}
                variants={branchCard}
                className="card-premium card-premium-border rounded-2xl p-6"
              >
                <h3 className="heading-4 text-foreground mb-2">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{b.address}</p>
                <p className="text-sm text-muted-foreground mb-4">{b.hours}</p>
                <div className="flex gap-2">
                  <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="rounded-full gap-1.5 tap-scale"><PremiumIconInline icon={MapPin} size={14} /> {t("home.getDirections")}</Button>
                  </a>
                  <a href={`tel:${b.phone}`}>
                    <Button size="sm" variant="ghost" className="rounded-full gap-1.5 tap-scale"><PremiumIconInline icon={Phone} size={14} /> {t("home.call")}</Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CTASection />

      {/* Banner */}
      <section className="w-full overflow-hidden">
        <img
          src={zorluBanner}
          alt="Samsung & LG Yetkili Servis ve Satış Partneri"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </section>

    </>
  );
}
