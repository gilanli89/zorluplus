import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, CATEGORIES, BRANCHES } from "@/lib/constants";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  const { data: products = [] } = useProducts();
  const featured = products.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const onSale = products.filter(p => p.salePrice && p.salePrice < p.price).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground">
        <div className="container py-12 md:py-20">
          <div className="max-w-xl">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Teknolojide Güvenilir Adresiniz
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-6">
              Samsung & LG yetkili servis. 2 yıl garanti, ücretsiz montaj ve en uygun fiyatlar.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/kategoriler">
                <Button size="lg" variant="secondary" className="font-semibold gap-2">
                  Ürünleri İncele <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-semibold gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="container">
          <h2 className="font-display text-xl font-bold mb-6 text-foreground">Kategoriler</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                to={`/kategori/${cat.slug}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 hover:shadow-md hover:border-primary/30 transition-all text-center"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                  {cat.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-foreground leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-10">
          <div className="container">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Öne Çıkan Ürünler</h2>
              <Link to="/kategoriler" className="text-sm font-medium text-primary hover:underline">Tümünü Gör</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* On Sale */}
      {onSale.length > 0 && (
        <section className="py-10 bg-destructive/5">
          <div className="container">
            <h2 className="font-display text-xl font-bold mb-6 text-foreground">🔥 İndirimli Ürünler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {onSale.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-10">
          <div className="container">
            <h2 className="font-display text-xl font-bold mb-6 text-foreground">Yeni Gelenler</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <TrustSection />

      {/* Branches CTA */}
      <section className="py-10">
        <div className="container">
          <h2 className="font-display text-xl font-bold mb-6 text-foreground">Şubelerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BRANCHES.map(b => (
              <div key={b.id} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display font-bold text-foreground mb-1">{b.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">{b.address}</p>
                <p className="text-sm text-muted-foreground mb-3">{b.hours}</p>
                <div className="flex gap-2">
                  <a href={b.mapsLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline">Yol Tarifi Al</Button>
                  </a>
                  <a href={`tel:${b.phone}`}>
                    <Button size="sm" variant="ghost">Ara</Button>
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
