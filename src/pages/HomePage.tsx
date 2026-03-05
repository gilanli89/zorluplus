import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRANCHES } from "@/lib/constants";
import TrustSection from "@/components/TrustSection";
import HeroBanner from "@/components/HeroBanner";

import widgetTv from "@/assets/widget-tv.jpg";
import widgetBeyazEsya from "@/assets/widget-beyaz-esya.jpg";
import widgetAnkastre from "@/assets/widget-ankastre.jpg";
import widgetKlima from "@/assets/widget-klima.jpg";

const CATEGORY_WIDGETS = [
  {
    slug: "tv-goruntu",
    title: "TV & Görüntü Sistemleri",
    subtitle: "Samsung & LG OLED, QLED, NanoCell",
    image: widgetTv,
  },
  {
    slug: "beyaz-esya",
    title: "Beyaz Eşya",
    subtitle: "Buzdolabı, Çamaşır & Bulaşık Makinesi",
    image: widgetBeyazEsya,
  },
  {
    slug: "ankastre",
    title: "Ankastre Setler",
    subtitle: "Fırın, Ocak & Davlumbaz",
    image: widgetAnkastre,
  },
  {
    slug: "klima-isitma",
    title: "Klima & İklimlendirme",
    subtitle: "Split Klima, Inverter Teknoloji",
    image: widgetKlima,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function HomePage() {
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
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-16 max-w-xl">
                  <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    {cat.title}
                  </h2>
                  <p className="text-white/80 text-sm md:text-base mt-2">
                    {cat.subtitle}
                  </p>
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/30 rounded-full px-5 py-2 backdrop-blur-sm bg-white/10 group-hover:bg-white/20 transition-colors">
                      Ürünleri İncele <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Mağazalarımız</h2>
            <p className="text-muted-foreground mt-2">Ürünleri yerinde görün, uzman ekibimizle tanışın</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {BRANCHES.map(b => (
              <div key={b.id} className="card-lift rounded-2xl border border-border bg-card p-6">
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{b.address}</p>
                <p className="text-sm text-muted-foreground mb-4">{b.hours}</p>
                <div className="flex gap-2">
                  <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="rounded-full gap-1.5"><MapPin className="h-3.5 w-3.5" /> Yol Tarifi</Button>
                  </a>
                  <a href={`tel:${b.phone}`}>
                    <Button size="sm" variant="ghost" className="rounded-full gap-1.5"><Phone className="h-3.5 w-3.5" /> Ara</Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos Carousel */}
      <section className="py-10 md:py-14 overflow-hidden">
        <div className="container">
          <h3 className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-8">
            Yetkili Bayi & Servis Markalarımız
          </h3>
        </div>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
          {/* Scrolling track */}
          <div className="flex animate-marquee gap-6 w-max">
            {[...Array(2)].map((_, loop) => (
              <div key={loop} className="flex gap-6">
                {[
                  { name: "Samsung", src: "/brands/samsung.png" },
                  { name: "LG", src: "/brands/lg.png" },
                  { name: "Bosch", src: "/brands/bosch.png" },
                  { name: "Philips", src: "/brands/philips.png" },
                  { name: "Midea", src: "/brands/midea.png" },
                  { name: "Sharp", src: "/brands/sharp.png" },
                ].map(brand => (
                  <div
                    key={`${loop}-${brand.name}`}
                    className="flex items-center justify-center rounded-xl border border-border bg-card w-[220px] h-[120px] md:w-[260px] md:h-[140px] p-[15px] hover:shadow-md hover:border-primary/30 transition-all duration-300"
                  >
                    <img
                      src={brand.src}
                      alt={`${brand.name} logo`}
                      className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
