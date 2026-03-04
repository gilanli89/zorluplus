import { Link } from "react-router-dom";
import { ArrowRight, Tv, Snowflake, ChefHat, Smartphone, Zap, Box, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BRAND, CATEGORIES, BRANCHES } from "@/lib/constants";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import TrustSection from "@/components/TrustSection";
import HeroBanner from "@/components/HeroBanner";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "beyaz-esya": Box,
  "ankastre": ChefHat,
  "klima-isitma": Snowflake,
  "tv-goruntu": Tv,
  "kucuk-ev-aletleri": Zap,
  "elektronik-aksesuar": Smartphone,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

export default function HomePage() {
  const { data: products = [] } = useProducts();
  const featured = products.filter(p => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const displayFeatured = featured.length > 0 ? featured : products.slice(0, 8);
  const displayNew = newArrivals.length > 0 ? newArrivals : products.slice(8, 12);

  return (
    <>
      {/* Hero Banner Slider */}
      <HeroBanner />

      {/* Trust Bar - Compact */}
      <TrustSection />

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Kategoriler</h2>
            <p className="text-muted-foreground mt-2">İhtiyacınıza uygun ürünü kolayca bulun</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {CATEGORIES.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.slug] || Box;
              return (
                <motion.div
                  key={cat.slug}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Link
                    to={`/kategori/${cat.slug}`}
                    className="card-lift flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-5 md:p-6 hover:border-primary/40 transition-colors text-center"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-semibold text-foreground leading-tight">{cat.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured */}
      {displayFeatured.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/40">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Öne Çıkan Ürünler</h2>
                <p className="text-muted-foreground mt-1">En çok tercih edilen ürünlerimiz</p>
              </div>
              <Link to="/kategoriler" className="text-sm font-semibold text-primary hover:underline underline-offset-4 hidden sm:block">
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {displayFeatured.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-6 sm:hidden">
              <Link to="/kategoriler">
                <Button variant="outline" className="rounded-full">Tümünü Gör</Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {displayNew.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">Yeni Gelenler</h2>
                <p className="text-muted-foreground mt-1">Mağazamıza yeni eklenen ürünler</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
              {displayNew.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
    </>
  );
}
