import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Award, Wrench, MessageCircle, Phone, CheckCircle2,
  Star, ArrowRight, Eye, LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { BRAND, BRANCHES } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/tracking";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/components/ProductCard";
import QuoteForm from "@/components/QuoteForm";
import PremiumIcon from "@/components/PremiumIcon";
import { TRUST_3D_ICONS } from "@/lib/categoryIcons";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export interface LandingSubtype { icon: LucideIcon; name: string; desc: string; link: string; }
export interface LandingBenefit { icon: LucideIcon; title: string; desc: string; }
export interface LandingFAQ { q: string; a: string; }

export interface CategoryLandingConfig {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  heroImage?: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroGradient?: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  trustItems: { icon: LucideIcon; label: string; desc: string }[];
  subtypes: LandingSubtype[];
  benefits: LandingBenefit[];
  benefitsTitle: string;
  benefitsDescription: string;
  quoteTitle: string;
  quoteDescription: string;
  productsTitle: string;
  productsCategoryLink: string;
  productsCategoryLinkText: string;
  faq: LandingFAQ[];
  faqTitle: string;
  faqDescription: string;
  filterProducts: (p: { category: string; subcategory: string }) => boolean;
  jsonLdName: string;
}

export default function CategoryLandingTemplate({ config }: { config: CategoryLandingConfig }) {
  const { t } = useLanguage();
  const { data: products = [] } = useProducts();
  const filtered = useMemo(() => products.filter(config.filterProducts), [products, config.filterProducts]);
  const featured = filtered.filter(p => p.isFeatured).slice(0, 8);
  const display = featured.length >= 4 ? featured : filtered.slice(0, 8);

  if (typeof document !== "undefined") {
    document.title = config.seoTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", config.seoDescription);
  }

  const heroGradient = config.heroGradient || "from-blue-400 via-cyan-400 to-teal-400";

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {config.heroImage && (
          <div className="absolute inset-0">
            <img src={config.heroImage} alt={config.heroTitle} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        {!config.heroImage && (
          <div className="absolute inset-0 gradient-mesh opacity-30" />
        )}
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
              style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
          ))}
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <motion.span
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-5 border border-white/20 shine-on-hover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-3.5 w-3.5" /> {config.heroBadge}
            </motion.span>
            <h1 className="heading-1 mb-4 text-white">
              {config.heroTitle}<br />
              <span className={`bg-gradient-to-r ${heroGradient} bg-clip-text text-transparent`}>{config.heroTitleHighlight}</span>
            </h1>
            <p className="text-white/80 body-lg mb-8 max-w-lg">{config.heroDescription}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#urunler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg tap-scale">
                  <Eye className="h-4 w-4" /> {config.ctaButtonText}
                </Button>
              </a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("landing_hero")}>
                <Button size="lg" className="font-semibold gap-2 rounded-full px-6 shadow-lg bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white border-0 tap-scale">
                  <MessageCircle className="h-4 w-4" /> {t("landing.getInfo")}
                </Button>
              </a>
            </div>
            {/* Scroll indicator */}
            <motion.div
              className="mt-10 flex justify-start"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="h-5 w-5 text-white/40 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.trustItems.map((item, i) => {
              const icon3d = TRUST_3D_ICONS[item.icon.displayName || ""];
              return (
                <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-premium card-premium-border rounded-xl p-4 flex items-center gap-3">
                  {icon3d ? (
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <div className="absolute inset-0 rounded-xl bg-primary/10 blur-sm opacity-60" />
                      <img src={icon3d} alt={item.label} className="relative z-10 w-10 h-10 object-contain drop-shadow-[0_3px_6px_hsl(var(--primary)/0.25)]" loading="lazy" width={40} height={40} />
                    </div>
                  ) : (
                    <PremiumIcon icon={item.icon} size="md" variant="glow" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="urunler" className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="heading-2 text-foreground pulse-heading">{config.productsTitle}</h2>
              <p className="text-muted-foreground mt-1">{display.length} {t("landing.productsListing")}</p>
            </div>
            <Link to={config.productsCategoryLink} className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block">
              {config.productsCategoryLinkText} <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>
          {display.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {display.map((p, i) => (
                <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card-premium rounded-2xl">
              <p className="text-muted-foreground mb-4">{t("landing.productsLoading")}</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("landing_fallback")}>
                <Button className="rounded-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white">
                  <MessageCircle className="h-4 w-4" /> {t("landing.askWhatsapp")}
                </Button>
              </a>
            </div>
          )}
          <div className="text-center mt-6 sm:hidden">
            <Link to={config.productsCategoryLink}>
              <Button variant="outline" className="rounded-full">{config.productsCategoryLinkText}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subtypes */}
      {config.subtypes.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="heading-2 text-foreground mb-2 pulse-heading">{t("landing.suitableProduct")}</h2>
            </motion.div>
            <div className={`grid grid-cols-2 ${config.subtypes.length >= 4 ? "md:grid-cols-4" : config.subtypes.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-3 md:gap-5`}>
              {config.subtypes.map((type, i) => (
                <motion.div key={type.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link to={type.link} className="group card-premium card-premium-border flex flex-col items-center gap-3 rounded-2xl p-6 text-center">
                    <PremiumIcon icon={type.icon} size="lg" variant="gradient" />
                    <h3 className="font-display font-bold text-foreground">{type.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits + Quote */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="heading-2 text-foreground mb-3 pulse-heading">{config.benefitsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{config.benefitsDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-premium card-premium-border flex gap-3 rounded-xl p-4">
                    <PremiumIcon icon={b.icon} size="md" variant="glow" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="card-premium card-premium-border rounded-2xl p-6 shadow-lg">
              <h3 className="heading-4 text-foreground mb-1">{config.quoteTitle}</h3>
              <p className="text-sm text-muted-foreground mb-5">{config.quoteDescription}</p>
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="heading-2 text-foreground mb-2 pulse-heading">{config.faqTitle}</h2>
            <p className="text-muted-foreground">{config.faqDescription}</p>
          </motion.div>
          <div className="space-y-3">
            {config.faq.map((item, i) => (
              <motion.details key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group card-premium rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer p-4 md:p-5 font-semibold text-sm text-foreground hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4 md:px-5 md:pb-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="card-premium card-premium-border rounded-2xl bg-gradient-to-br from-[hsl(142,70%,40%)]/10 to-[hsl(142,70%,40%)]/5 p-6 md:p-8 text-center">
              <MessageCircle className="h-10 w-10 text-[hsl(142,70%,40%)] mx-auto mb-4 drop-shadow-[0_3px_8px_hsl(142,70%,40%,0.3)]" />
              <h3 className="heading-3 text-foreground mb-2">{t("landing.whatsappOrder")}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t("landing.whatsappOrderDesc")}</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("landing_cta")}>
                <Button size="lg" className="rounded-full gap-2 font-semibold bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white pulse-btn">
                  <MessageCircle className="h-4 w-4" /> {t("landing.writeWhatsapp")}
                </Button>
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="card-premium card-premium-border rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4 drop-shadow-[0_3px_8px_hsl(var(--primary)/0.3)]" />
              <h3 className="heading-3 text-foreground mb-2">{t("landing.callUs")}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t("landing.callUsDesc")}</p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="rounded-full gap-2 font-semibold">
                  <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
                </Button>
              </a>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANCHES.map((branch, i) => (
              <motion.a key={branch.id} href={branch.mapsLink} target="_blank" rel="noopener noreferrer" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-premium card-premium-border flex items-start gap-3 rounded-xl p-4">
                <PremiumIcon icon={Star} size="md" variant="glow" />
                <div>
                  <p className="text-sm font-bold text-foreground">{branch.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{branch.address}</p>
                  <p className="text-xs font-semibold text-primary mt-1">{branch.phone}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: config.jsonLdName,
        description: config.seoDescription,
        url: `https://zorluplus.com/${config.slug}`,
        provider: { "@type": "LocalBusiness", name: BRAND.name, telephone: BRAND.phone },
      }) }} />
    </>
  );
}
