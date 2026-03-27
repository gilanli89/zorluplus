import { useParams, Link } from "react-router-dom";
import { trackWhatsAppClick } from "@/lib/tracking";
import { useEffect, useRef } from "react";
import { Shield, Award, Wrench, MessageCircle, ChevronLeft, ChevronRight, ShoppingCart, Sparkles, Package } from "lucide-react";
import { PremiumIconInline, PremiumBadgeIcon } from "@/components/PremiumIcon";
import BrandLogo from "@/components/BrandLogo";
import { useProducts } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductBySlug, formatPrice, getWhatsAppLink } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import ProductRecommendations from "@/components/ProductRecommendations";
import FrequentlyBoughtTogether from "@/components/FrequentlyBoughtTogether";
import QuoteForm from "@/components/QuoteForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductTranslation } from "@/hooks/useProductTranslation";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const SPEC_LABELS: Record<string, { tr: string; en: string }> = {
  "Screen size": { tr: "Ekran Boyutu", en: "Screen Size" },
  "Panel type": { tr: "Panel Tipi", en: "Panel Type" },
  "Resolution": { tr: "Çözünürlük", en: "Resolution" },
  "Ekran": { tr: "Ekran", en: "Screen" },
  "BTU": { tr: "BTU", en: "BTU" },
  "Kapasite": { tr: "Kapasite", en: "Capacity" },
  "Enerji Sınıfı": { tr: "Enerji Sınıfı", en: "Energy Class" },
  "Devir": { tr: "Devir", en: "Spin Speed" },
  "Panel": { tr: "Panel", en: "Panel" },
  "Çözünürlük": { tr: "Çözünürlük", en: "Resolution" },
  "Litre": { tr: "Litre", en: "Litre" },
  "No Frost": { tr: "No-Frost", en: "No-Frost" },
  "İnverter": { tr: "İnverter", en: "Inverter" },
  "Smart": { tr: "Akıllı", en: "Smart" },
};

function translateSpecLabel(key: string, lang: string): string {
  const entry = SPEC_LABELS[key];
  if (entry) return lang === "tr" ? entry.tr : entry.en;
  // Fallback: capitalize
  return key;
}

export default function ProductPage() {
  const { slug } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const { recentIds, addViewed } = useRecentlyViewed();
  const stripRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLanguage();
  const { translateProduct } = useProductTranslation();
  const { addItem } = useCart();
  
  const product = getProductBySlug(products, slug || "");

  useEffect(() => {
    if (product) {
      addViewed(product.id);
    }
  }, [product?.id]);

  if (isLoading) return <div className="container py-8"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="container py-16 text-center"><h1 className="text-2xl font-bold text-foreground">{t("product.notFound")}</h1><Link to="/" className="text-primary mt-4 inline-block">{t("product.goHome")}</Link></div>;

  const category = CATEGORIES.find(c => c.slug === product.category);
  const subcategory = category?.children.find(s => s.slug === product.subcategory);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 12);
  const recentlyViewed = products.filter(p => recentIds.includes(p.id) && p.id !== product.id).slice(0, 4);

  const scrollStrip = (dir: "left" | "right") => {
    stripRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  };

  return (
    <div>
      {/* Related products strip below header */}
      {related.length > 0 && (
        <div className="bg-muted/40 border-b border-border">
          <div className="container py-3">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex-1">{t("product.similar")}</h2>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => scrollStrip("left")}><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => scrollStrip("right")}><ChevronRight className="h-4 w-4" /></Button>
            </div>
            <div ref={stripRef} className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
              {related.map(p => (
                <Link key={p.id} to={`/urun/${p.slug}`} className="flex-shrink-0 w-36 group">
                  <div className="aspect-square rounded-xl border border-border bg-card overflow-hidden mb-1.5">
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                  <BrandLogo brand={p.brand} size="xs" />
                  <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">{translateProduct(p.name)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
          <Link to="/" className="hover:text-foreground">{t("general.homePage")}</Link>
          <span>/</span>
          {category && <><Link to={`/kategori/${category.slug}`} className="hover:text-foreground">{t(`cat.${category.slug}`) || category.name}</Link><span>/</span></>}
          {subcategory && <><Link to={`/kategori/${category!.slug}/${subcategory.slug}`} className="hover:text-foreground">{subcategory.name}</Link><span>/</span></>}
          <span className="text-foreground line-clamp-1">{translateProduct(product.name)}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="aspect-square rounded-xl border border-border bg-card overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <BrandLogo brand={product.brand} size="lg" />
            <h1 className="heading-2 text-foreground">{translateProduct(product.name)}</h1>
            {product.sku && (
              <p className="text-xs font-mono text-muted-foreground">{t("product.modelNo") || "Model No"}: {product.sku}</p>
            )}
            {product.price > 0 ? (
              <div className="flex items-center gap-3 flex-wrap">
                {product.salePrice && product.salePrice > 0 ? (
                  <>
                    <span className="text-2xl font-bold text-primary">{formatPrice(product.salePrice)}</span>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                    <Badge className="bg-destructive text-destructive-foreground text-xs font-bold">
                      %{Math.round((1 - product.salePrice / product.price) * 100)} {t("product.discount") || "İndirim"}
                    </Badge>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-foreground">{formatPrice(product.price)}</span>
                )}
              </div>
            ) : (
              <p className="text-sm font-medium text-primary">{t("product.callForPrice")}</p>
            )}

            {product.price > 0 && (
              <p className="text-xs text-muted-foreground">
                {t("product.installment") || "12 aya varan taksit seçenekleri mevcuttur."}
              </p>
            )}


            <Badge variant={product.inStock ? "success" : "secondary"} className="w-fit gap-1.5">
              {product.inStock ? <><PremiumBadgeIcon icon={Shield} size={12} /> {t("product.inStock")}</> : t("product.outOfStock")}
            </Badge>

            <div className="flex flex-wrap gap-4 py-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><PremiumIconInline icon={Shield} size={16} /> {t("product.authorizedService")}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><PremiumIconInline icon={Award} size={16} /> {t("product.warranty")}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><PremiumIconInline icon={Wrench} size={16} /> {t("product.freeInstall")}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {product.inStock && product.price > 0 && (
                <Button
                  size="lg"
                  className="flex-1 gap-2 font-semibold"
                  onClick={() => {
                    addItem(product);
                    toast.success(`${product.name} sepete eklendi!`);
                  }}
                >
                  <ShoppingCart className="h-5 w-5" /> {t("cart.addToCart")}
                </Button>
              )}
              <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={() => trackWhatsAppClick("product_page")}>
                <Button size="lg" variant="outline" className="w-full gap-2 border-[hsl(142,70%,40%)] text-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] hover:text-white font-semibold">
                  <MessageCircle className="h-5 w-5" /> {t("product.orderWhatsApp")}
                </Button>
              </a>
            </div>

            {Object.keys(product.specs).length > 0 && (
              <div className="mt-4">
                <h3 className="font-display font-bold text-foreground mb-3">{t("product.specs")}</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v], idx) => {
                      const specLabel = translateSpecLabel(k, lang);
                      return (
                        <tr key={k} className={`border-b border-border ${idx % 2 === 0 ? "bg-muted/30" : ""}`}>
                          <td className="py-2.5 px-3 text-muted-foreground font-medium rounded-l-lg">{specLabel}</td>
                          <td className="py-2.5 px-3 text-foreground text-right font-medium rounded-r-lg">{v}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {product.description && (
              <div className="mt-4">
                <h3 className="font-display font-bold text-foreground mb-2">{t("product.description")}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{translateProduct(product.description)}</p>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
              <h3 className="font-display font-bold text-foreground mb-3">{t("product.getQuote")}</h3>
              <QuoteForm
                productId={product.id}
                productSku={product.sku}
                productName={product.name}
                productPrice={product.salePrice || product.price}
              />
            </div>
          </div>
        </div>

        {/* Cross-sell: Frequently Bought Together (TV only) */}
        <FrequentlyBoughtTogether currentProduct={product} allProducts={products} maxItems={6} />

        {/* AI Recommendations */}
        <ProductRecommendations currentProduct={product} allProducts={products} maxItems={4} />

        {recentlyViewed.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold mb-4 text-foreground">{t("product.recentlyViewed")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}</div>
          </section>
        )}

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          brand: { "@type": "Brand", name: product.brand },
          sku: product.sku,
          image: product.image,
          description: product.description,
          offers: {
            "@type": "Offer",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        })}} />
      </div>
    </div>
  );
}
