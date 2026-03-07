import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import {
  Shield, Award, Wrench, MessageCircle, Phone, CheckCircle2,
  Star, ArrowRight, Tv, Monitor, Volume2, Zap, Eye, Maximize2, SlidersHorizontal, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useProducts } from "@/hooks/useProducts";
import { getProductsByCategory } from "@/lib/products";
import { trackWhatsAppClick } from "@/lib/tracking";
import { BRAND, BRANCHES } from "@/lib/constants";
import ProductCard from "@/components/ProductCard";
import QuoteForm from "@/components/QuoteForm";
import tvHero from "@/assets/tv-hero.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function TVLandingPage() {
  const { t } = useLanguage();
  const { data: products = [] } = useProducts();
  const tvProducts = useMemo(() => products.filter(p => p.category === "tv-goruntu" && p.subcategory === "tv"), [products]);

  const TV_TYPES = [
    { icon: Monitor, name: t("lp.tv.type1"), desc: t("lp.tv.type1d"), slug: "tv" },
    { icon: Tv, name: t("lp.tv.type2"), desc: t("lp.tv.type2d"), slug: "tv" },
    { icon: Maximize2, name: t("lp.tv.type3"), desc: t("lp.tv.type3d"), slug: "tv" },
    { icon: Volume2, name: t("lp.tv.type4"), desc: t("lp.tv.type4d"), slug: "soundbar" },
  ];

  const BENEFITS = [
    { icon: Wrench, title: t("lp.tv.ben1"), desc: t("lp.tv.ben1d") },
    { icon: Shield, title: t("lp.tv.ben2"), desc: t("lp.tv.ben2d") },
    { icon: Volume2, title: t("lp.tv.ben3"), desc: t("lp.tv.ben3d") },
    { icon: Zap, title: t("lp.tv.ben4"), desc: t("lp.tv.ben4d") },
  ];

  const FAQ = [
    { q: t("lp.tv.faq1q"), a: t("lp.tv.faq1a") },
    { q: t("lp.tv.faq2q"), a: t("lp.tv.faq2a") },
    { q: t("lp.tv.faq3q"), a: t("lp.tv.faq3a") },
    { q: t("lp.tv.faq4q"), a: t("lp.tv.faq4a") },
  ];

  // TV-specific filters
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedInches, setSelectedInches] = useState<string[]>([]);
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);
  const [selectedOS, setSelectedOS] = useState<string[]>([]);

  // Extract inch from product name (e.g. "55 inch", "65\"", "75"")
  const getInch = (name: string): string | null => {
    const match = name.match(/(\d{2,3})\s*["'"''ınç inç inch]|(\d{2,3})["']/i);
    if (match) return match[1] || match[2];
    // Try standalone common sizes
    const sizeMatch = name.match(/\b(32|40|43|50|55|58|65|70|75|77|83|85|86|98)\b/);
    return sizeMatch ? sizeMatch[1] : null;
  };

  // Extract panel type from name/tags
  const getPanelType = (p: { name: string; tags: string[] }): string => {
    const text = (p.name + " " + p.tags.join(" ")).toUpperCase();
    if (text.includes("OLED") && !text.includes("QLED")) return "OLED";
    if (text.includes("QLED") || text.includes("NEO QLED")) return "QLED";
    if (text.includes("NANOCELL")) return "NanoCell";
    if (text.includes("CRYSTAL") || text.includes("UHD")) return "Crystal UHD";
    if (text.includes("LED")) return "LED";
    return "Diğer";
  };

  // Extract OS from name/tags
  const getOS = (p: { name: string; tags: string[] }): string => {
    const text = (p.name + " " + p.tags.join(" ")).toUpperCase();
    if (text.includes("TIZEN") || text.includes("SAMSUNG")) return "Tizen (Samsung)";
    if (text.includes("WEBOS") || text.includes("LG")) return "webOS (LG)";
    return t("lp.tv.other");
  };

  // Available filter options from products
  const filterOptions = useMemo(() => {
    const brands = new Set<string>();
    const inches = new Set<string>();
    const panels = new Set<string>();
    const oses = new Set<string>();
    tvProducts.forEach(p => {
      if (p.brand) brands.add(p.brand);
      const inch = getInch(p.name);
      if (inch) inches.add(inch);
      panels.add(getPanelType(p));
      oses.add(getOS(p));
    });
    return {
      brands: ["Samsung", "LG"].filter(b => brands.has(b) || brands.has(b.toUpperCase()) || brands.has(b.toLowerCase())),
      inches: Array.from(inches).sort((a, b) => Number(a) - Number(b)),
      panels: Array.from(panels).sort(),
      oses: Array.from(oses).sort(),
    };
  }, [tvProducts]);

  // Filtered display
  const display = useMemo(() => {
    return tvProducts.filter(p => {
      if (selectedBrands.length > 0 && !selectedBrands.some(b => p.brand.toUpperCase().includes(b.toUpperCase()))) return false;
      if (selectedInches.length > 0) {
        const inch = getInch(p.name);
        if (!inch || !selectedInches.includes(inch)) return false;
      }
      if (selectedPanels.length > 0 && !selectedPanels.includes(getPanelType(p))) return false;
      if (selectedOS.length > 0 && !selectedOS.includes(getOS(p))) return false;
      return true;
    });
  }, [tvProducts, selectedBrands, selectedInches, selectedPanels, selectedOS]);

  const activeFilterCount = selectedBrands.length + selectedInches.length + selectedPanels.length + selectedOS.length;
  const clearFilters = () => { setSelectedBrands([]); setSelectedInches([]); setSelectedPanels([]); setSelectedOS([]); };

  const toggleFilter = (value: string, selected: string[], setSelected: React.Dispatch<React.SetStateAction<string[]>>) => {
    setSelected(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const FilterSection = ({ title, items, selected, onToggle }: { title: string; items: string[]; selected: string[]; onToggle: (v: string) => void }) => {
    const hasActive = selected.length > 0;
    return (
      <div>
        <h4 className={`text-sm font-bold mb-3 flex items-center gap-2 ${hasActive ? 'text-primary' : 'text-foreground'}`}>
          {hasActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
          {title}
        </h4>
        <div className="space-y-2">
          {items.map(item => {
            const isActive = selected.includes(item);
            return (
              <label key={item} className={`flex items-center gap-2 cursor-pointer text-sm rounded-lg px-2 py-1.5 transition-colors ${isActive ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted'}`}>
                <Checkbox checked={isActive} onCheckedChange={() => onToggle(item)} />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {activeFilterCount > 0 && (
        <button onClick={clearFilters} className="text-xs text-primary hover:underline flex items-center gap-1 font-semibold">
          <X className="h-3 w-3" /> {t("lp.tv.clearFilters")} ({activeFilterCount})
        </button>
      )}

      <FilterSection title={t("lp.tv.brand")} items={filterOptions.brands} selected={selectedBrands} onToggle={(v) => toggleFilter(v, selectedBrands, setSelectedBrands)} />
      {filterOptions.inches.length > 0 && (
        <FilterSection title={t("lp.tv.screenSize")} items={filterOptions.inches.map(i => i)} selected={selectedInches} onToggle={(v) => toggleFilter(v, selectedInches, setSelectedInches)} />
      )}
      {filterOptions.panels.length > 0 && (
        <FilterSection title={t("lp.tv.panelType")} items={filterOptions.panels} selected={selectedPanels} onToggle={(v) => toggleFilter(v, selectedPanels, setSelectedPanels)} />
      )}
      {filterOptions.oses.length > 0 && (
        <FilterSection title={t("lp.tv.os")} items={filterOptions.oses} selected={selectedOS} onToggle={(v) => toggleFilter(v, selectedOS, setSelectedOS)} />
      )}
    </div>
  );

  // SEO
  if (typeof document !== "undefined") {
    document.title = t("lp.tv.seoTitle") !== "lp.tv.seoTitle" ? t("lp.tv.seoTitle") : "Televizyon Fiyatları | Samsung & LG OLED TV QLED TV - Kıbrıs | Zorlu Digital Plaza";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("lp.tv.seoDesc") !== "lp.tv.seoDesc" ? t("lp.tv.seoDesc") : "Kıbrıs'ta Samsung ve LG OLED TV, QLED TV, 4K ve 8K televizyon modelleri.");
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center">
        <div className="absolute inset-0">
          <img src={tvHero} alt="Premium TV deneyimi" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        <div className="container relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-5 border border-white/20">
              <Shield className="h-3.5 w-3.5" /> {t("lp.tv.heroBadge")}
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-4 text-white">
              {t("lp.tv.heroTitle")}<br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {t("lp.tv.heroHighlight")}
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              {t("lp.tv.heroDesc")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#urunler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg">
                  <Eye className="h-4 w-4" /> {t("lp.tv.ctaBtn")}
                </Button>
              </a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("tv_hero")}>
                <Button
                  size="lg"
                  className="font-semibold gap-2 rounded-full px-6 shadow-lg bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white border-0"
                >
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
            {[
              { icon: Shield, label: t("lp.tv.trust1"), desc: "Samsung & LG" },
              { icon: Award, label: t("lp.tv.trust2"), desc: t("lp.tv.trust2d") },
              { icon: Wrench, label: t("lp.tv.trust3"), desc: t("lp.tv.trust3d") },
              { icon: Star, label: t("lp.tv.trust4"), desc: t("lp.tv.trust4d") },
            ].map((item, i) => (
              <motion.div key={item.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid - right after trust bar */}
      <section id="urunler" className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {t("lp.tv.productsTitle")}
              </h2>
              <p className="text-muted-foreground mt-1">{display.length} {t("lp.tv.productsCount")}</p>
            </div>
            <Link to="/kategori/tv-goruntu" className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block">
              {t("lp.tv.viewAll")} <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="flex gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-28 rounded-2xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> {t("lp.tv.filter")}
                </h3>
                <FilterContent />
              </div>
            </aside>

            {/* Mobile Filter Trigger */}
            <div className="lg:hidden mb-4 w-full">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtrele
                    {activeFilterCount > 0 && (
                      <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">{activeFilterCount}</span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-2xl">
                  <SheetTitle className="text-lg font-bold mb-4">{t("lp.tv.filter")}</SheetTitle>
                  <FilterContent />
                </SheetContent>
              </Sheet>
            </div>

            {/* Product Grid */}
            <div className="flex-1 min-w-0">
              {display.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                  {display.map((p, i) => (
                    <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                      <ProductCard product={p} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-border bg-card">
                  <p className="text-muted-foreground mb-4">{t("lp.tv.noResults")}</p>
                  <Button variant="outline" className="rounded-full gap-2" onClick={clearFilters}>
                    <X className="h-4 w-4" /> {t("lp.tv.clearFilters")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TV Types (Subtypes) */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("lp.tv.suitableTitle")}
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {t("lp.tv.suitableDesc")}
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {TV_TYPES.map((type, i) => (
              <motion.div key={type.name} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link
                  to={`/kategori/tv-goruntu/${type.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 text-primary group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-colors">
                    <type.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display font-bold text-foreground">{type.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{type.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("lp.tv.benTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("lp.tv.benDesc")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BENEFITS.map((b, i) => (
                  <motion.div key={b.title} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    className="flex gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{b.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{b.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quote Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6 shadow-lg"
            >
              <h3 className="font-display font-bold text-lg text-foreground mb-1">
                {t("lp.tv.quoteTitle")}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {t("lp.tv.quoteDesc")}
              </p>
              <QuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-muted/40">
        <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Sık Sorulan Sorular
            </h2>
            <p className="text-muted-foreground">TV seçimi ve hizmetlerimiz hakkında merak ettikleriniz</p>
          </motion.div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <motion.details
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group rounded-xl border border-border bg-card overflow-hidden"
              >
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
            {/* WhatsApp CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl border border-border bg-gradient-to-br from-[hsl(142,70%,40%)]/10 to-[hsl(142,70%,40%)]/5 p-6 md:p-8 text-center"
            >
              <MessageCircle className="h-10 w-10 text-[hsl(142,70%,40%)] mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">WhatsApp ile Sipariş</h3>
              <p className="text-sm text-muted-foreground mb-5">Hızlı sipariş ve bilgi almak için WhatsApp'tan yazın.</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("tv_cta")}>
                <Button size="lg" className="rounded-full gap-2 font-semibold bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white">
                  <MessageCircle className="h-4 w-4" /> WhatsApp'a Yaz
                </Button>
              </a>
            </motion.div>

            {/* Phone CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 text-center"
            >
              <Phone className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-bold text-foreground mb-2">Telefonla Arayın</h3>
              <p className="text-sm text-muted-foreground mb-5">Uzman danışmanlarımız TV seçiminde size yardımcı olsun.</p>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline" className="rounded-full gap-2 font-semibold">
                  <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Branches */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRANCHES.map((branch, i) => (
              <motion.a
                key={branch.id}
                href={branch.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Star className="h-5 w-5" />
                </div>
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
        name: "Televizyon Modelleri - Zorlu Digital Plaza",
        description: "Kıbrıs'ta Samsung ve LG OLED TV, QLED TV, 4K ve 8K televizyon modelleri. Ücretsiz duvar montajı, 2 yıl garanti.",
        url: "https://zorluplus.com/televizyon/",
        provider: {
          "@type": "Store",
          name: BRAND.name,
          telephone: BRAND.phone,
        },
      })}} />
    </>
  );
}
