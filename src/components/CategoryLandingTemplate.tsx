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
            <img src={config.heroImage} alt={config.heroTitle} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        {!config.heroImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.15),transparent)]" />
          </div>
        )}
        <div className="container relative z-10 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-5 border border-white/20">
              <Shield className="h-3.5 w-3.5" /> {config.heroBadge}
            </span>
            <h1 className="heading-1 mb-4 text-white">
              {config.heroTitle}<br />
              <span className={`bg-gradient-to-r ${heroGradient} bg-clip-text text-transparent`}>{config.heroTitleHighlight}</span>
            </h1>
            <p className="text-white/80 body-lg mb-8 max-w-lg">{config.heroDescription}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#urunler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg">
                  <Eye className="h-4 w-4" /> {config.ctaButtonText}
                </Button>
              </a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("landing_hero")}>
                <Button size="lg" className="font-semibold gap-2 rounded-full px-6 shadow-lg bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white border-0">
                  <MessageCircle className="h-4 w-4" /> {t("landing.getInfo")}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {config.trustItems.map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><item.icon className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="urunler" className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="heading-2 text-foreground">{config.productsTitle}</h2>
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
            <div className="text-center py-12 rounded-2xl border border-border bg-card">
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
              <h2 className="heading-2 text-foreground mb-2">{t("landing.suitableProduct")}</h2>
            </motion.div>
            <div className={`grid grid-cols-2 ${config.subtypes.length >= 4 ? "md:grid-cols-4" : config.subtypes.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-3 md:gap-5`}>
              {config.subtypes.map((type, i) => (
                <motion.div key={type.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link to={type.link} className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors"><type.icon className="h-7 w-7" /></div>
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
              <h2 className="heading-2 text-foreground mb-3">{config.benefitsTitle}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{config.benefitsDescription}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {config.benefits.map((b, i) => (
                  <motion.div key={b.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex gap-3 rounded-xl border border-border bg-card p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><b.icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6 shadow-lg">
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
            <h2 className="heading-2 text-foreground mb-2">{config.faqTitle}</h2>
            <p className="text-muted-foreground">{config.faqDescription}</p>
          </motion.div>
          <div className="space-y-3">
            {config.faq.map((item, i) => (
              <motion.details key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="group rounded-xl border border-border bg-card overflow-hidden">
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
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="rounded-2xl border border-border bg-gradient-to-br from-[hsl(142,70%,40%)]/10 to-[hsl(142,70%,40%)]/5 p-6 md:p-8 text-center">
              <MessageCircle className="h-10 w-10 text-[hsl(142,70%,40%)] mx-auto mb-4" />
              <h3 className="heading-3 text-foreground mb-2">{t("landing.whatsappOrder")}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t("landing.whatsappOrderDesc")}</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("landing_cta")}>
                <Button size="lg" className="rounded-full gap-2 font-semibold bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white">
                  <MessageCircle className="h-4 w-4" /> {t("landing.writeWhatsapp")}
                </Button>
              </a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 text-center">
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
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
              <motion.a key={branch.id} href={branch.mapsLink} target="_blank" rel="noopener noreferrer" custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Star className="h-5 w-5" /></div>
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
