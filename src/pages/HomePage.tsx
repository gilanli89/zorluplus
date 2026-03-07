import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/lib/constants";
import TrustSection from "@/components/TrustSection";
import HeroBanner from "@/components/HeroBanner";
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
      <HeroBanner />
      <TrustSection />

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
                      {cat.ctaKey ? t(cat.ctaKey) : t("home.explore")} <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

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
                className="card-lift rounded-2xl border border-border bg-card p-6 pulse-card"
              >
                <h3 className="heading-4 text-foreground mb-2">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{b.address}</p>
                <p className="text-sm text-muted-foreground mb-4">{b.hours}</p>
                <div className="flex gap-2">
                  <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="rounded-full gap-1.5 tap-scale"><MapPin className="h-3.5 w-3.5" /> {t("home.getDirections")}</Button>
                  </a>
                  <a href={`tel:${b.phone}`}>
                    <Button size="sm" variant="ghost" className="rounded-full gap-1.5 tap-scale"><Phone className="h-3.5 w-3.5" /> {t("home.call")}</Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
