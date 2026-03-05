import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Shield, Award, Wrench, MessageCircle, Phone, CheckCircle2,
  Star, ArrowRight, Tv, Monitor, Volume2, Zap, Eye, Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const TV_TYPES = [
  { icon: Monitor, name: "OLED TV", desc: "Sonsuz kontrast, mükemmel siyahlar", slug: "tv" },
  { icon: Tv, name: "QLED TV", desc: "Canlı renkler, yüksek parlaklık", slug: "tv" },
  { icon: Maximize2, name: "4K & 8K UHD", desc: "Ultra yüksek çözünürlük", slug: "tv" },
  { icon: Volume2, name: "Soundbar", desc: "Sinema ses deneyimi", slug: "soundbar" },
];

const BENEFITS = [
  { icon: Wrench, title: "Ücretsiz Duvar Montajı", desc: "Profesyonel ekibimiz TV'nizi istediğiniz duvara monte eder." },
  { icon: Shield, title: "2 Yıl Resmi Garanti", desc: "Samsung & LG yetkili bayi garantisiyle güvende olun." },
  { icon: Volume2, title: "Soundbar Kombo Fırsatları", desc: "TV alımlarında özel soundbar indirimleri." },
  { icon: Zap, title: "Aynı Gün Teslimat", desc: "Stokta olan ürünlerde aynı gün kurulum imkanı." },
];

const FAQ = [
  { q: "OLED mi QLED mi almalıyım?", a: "OLED TV'ler sonsuz kontrast ve mükemmel siyah tonları sunar, film izlemek için idealdir. QLED TV'ler ise daha parlak ekranla aydınlık odalarda üstün performans gösterir. İhtiyacınıza göre mağazamızda karşılaştırabilirsiniz." },
  { q: "Ücretsiz montaj dahil mi?", a: "Evet, tüm televizyon alımlarında ücretsiz duvar montajı hizmetimiz mevcuttur. Profesyonel ekibimiz televizyonunuzu güvenle monte eder." },
  { q: "Hangi markalar mevcut?", a: "Samsung ve LG yetkili bayisi olarak her iki markanın da en güncel OLED, QLED, NanoCell ve Crystal UHD modellerini stoklarımızda bulunduruyoruz." },
  { q: "Taksit imkanı var mı?", a: "Evet, kredi kartına taksit seçeneklerimiz mevcuttur. Ayrıca havale/EFT ile ödeme yapabilirsiniz. Detaylı bilgi için bizi arayabilirsiniz." },
];

export default function TVLandingPage() {
  const { data: products = [] } = useProducts();
  const tvProducts = useMemo(() => products.filter(p => p.category === "tv-goruntu" && p.subcategory === "tv"), [products]);
  const featured = tvProducts.filter(p => p.isFeatured).slice(0, 8);
  const display = featured.length >= 4 ? featured : tvProducts.slice(0, 8);

  // SEO
  if (typeof document !== "undefined") {
    document.title = "Televizyon Fiyatları | Samsung & LG OLED TV QLED TV - Kıbrıs | Zorlu Digital Plaza";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Kıbrıs'ta Samsung ve LG OLED TV, QLED TV, 4K ve 8K televizyon modelleri. Ücretsiz duvar montajı, 2 yıl garanti. Yetkili bayi güvencesiyle TV alın. Zorlu Digital Plaza.");
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
              <Shield className="h-3.5 w-3.5" /> Samsung & LG Yetkili Bayi
            </span>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-4 text-white">
              Sinema Deneyimini<br />
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Evinize Getirin
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              OLED, QLED ve Smart TV'lerde yetkili bayi farkıyla. Ücretsiz duvar montajı ve 2 yıl garanti dahil.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#urunler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg">
                  <Eye className="h-4 w-4" /> TV Modellerini Gör
                </Button>
              </a>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("tv_hero")}>
                <Button
                  size="lg"
                  className="font-semibold gap-2 rounded-full px-6 shadow-lg bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white border-0"
                >
                  <MessageCircle className="h-4 w-4" /> Hemen Bilgi Al
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
              { icon: Shield, label: "Yetkili Bayi", desc: "Samsung & LG" },
              { icon: Award, label: "2 Yıl Garanti", desc: "Tüm TV'lerde" },
              { icon: Wrench, label: "Ücretsiz Montaj", desc: "Duvar montajı dahil" },
              { icon: Star, label: "Uzman Danışmanlık", desc: "Doğru TV seçimi" },
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
                TV Modelleri
              </h2>
              <p className="text-muted-foreground mt-1">{display.length} ürün listeleniyor</p>
            </div>
            <Link to="/kategori/tv-goruntu" className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block">
              Tümünü Gör <ArrowRight className="inline h-3.5 w-3.5" />
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
              <p className="text-muted-foreground mb-4">TV modelleri yükleniyor...</p>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("tv_fallback")}>
                <Button className="rounded-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white">
                  <MessageCircle className="h-4 w-4" /> WhatsApp ile Sorun
                </Button>
              </a>
            </div>
          )}
          <div className="text-center mt-6 sm:hidden">
            <Link to="/kategori/tv-goruntu">
              <Button variant="outline" className="rounded-full">Tüm TV'leri Gör</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TV Types (Subtypes) */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              İhtiyacınıza Uygun TV
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Samsung ve LG'nin en son teknoloji televizyonlarını keşfedin
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
                Neden ZorluPlus'tan TV Almalısınız?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Kuzey Kıbrıs'ın en güvenilir Samsung & LG yetkili bayisi olarak, en yeni OLED, QLED ve NanoCell televizyonları yetkili garanti ve profesyonel montaj hizmetiyle sunuyoruz.
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
                TV Fiyat Teklifi Alın
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Bilgilerinizi bırakın, size özel TV teklifimizi sunalım.
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
