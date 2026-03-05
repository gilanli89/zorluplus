import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Award, Wrench, MessageCircle } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { getProductBySlug, formatPrice, getWhatsAppLink } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import QuoteForm from "@/components/QuoteForm";
import { Skeleton } from "@/components/ui/skeleton";


export default function ProductPage() {
  const { slug } = useParams();
  const { data: products = [], isLoading } = useProducts();
  const { recentIds, addViewed } = useRecentlyViewed();
  const { addItem } = useCart();
  const navigate = useNavigate();
  const product = getProductBySlug(products, slug || "");

  useEffect(() => {
    if (product) {
      addViewed(product.id);
      // GA4 placeholder
      // window.dataLayer?.push({ event: "view_item", ecommerce: { items: [{ item_id: product.sku, item_name: product.name, price: product.salePrice || product.price }] }});
    }
  }, [product?.id]);

  if (isLoading) return <div className="container py-8"><Skeleton className="h-96 rounded-xl" /></div>;
  if (!product) return <div className="container py-16 text-center"><h1 className="text-2xl font-bold text-foreground">Ürün bulunamadı</h1><Link to="/" className="text-primary mt-4 inline-block">Ana Sayfaya Dön</Link></div>;

  const category = CATEGORIES.find(c => c.slug === product.category);
  const subcategory = category?.children.find(s => s.slug === product.subcategory);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const recentlyViewed = products.filter(p => recentIds.includes(p.id) && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap">
        <Link to="/" className="hover:text-foreground">Ana Sayfa</Link>
        <span>/</span>
        {category && <><Link to={`/kategori/${category.slug}`} className="hover:text-foreground">{category.name}</Link><span>/</span></>}
        {subcategory && <><Link to={`/kategori/${category!.slug}/${subcategory.slug}`} className="hover:text-foreground">{subcategory.name}</Link><span>/</span></>}
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gallery */}
        <div className="aspect-square rounded-xl border border-border bg-card overflow-hidden">
          <img src={product.image} alt={product.name} className="h-full w-full object-contain p-8" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>
          <h1 className="font-display text-2xl font-bold text-foreground">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-extrabold text-foreground">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.price)}</span>
                <Badge className="bg-destructive text-destructive-foreground">
                  %{Math.round(((product.price - product.salePrice!) / product.price) * 100)} İndirim
                </Badge>
              </>
            )}
          </div>

          <Badge variant={product.inStock ? "default" : "secondary"} className="w-fit">
            {product.inStock ? "Stokta" : "Stokta Yok"}
          </Badge>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 py-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Shield className="h-4 w-4 text-primary" /> Yetkili Servis</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Award className="h-4 w-4 text-primary" /> 2 Yıl Garanti</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wrench className="h-4 w-4 text-primary" /> Ücretsiz Montaj</div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={getWhatsAppLink(product)} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="lg" className="w-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-semibold">
                <MessageCircle className="h-5 w-5" /> WhatsApp ile Sipariş Ver
              </Button>
            </a>
          </div>

          {/* Specs */}
          {Object.keys(product.specs).length > 0 && (
            <div className="mt-4">
              <h3 className="font-display font-bold text-foreground mb-3">Teknik Özellikler</h3>
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs).map(([k, v]) => (
                    <tr key={k} className="border-b border-border">
                      <td className="py-2 text-muted-foreground font-medium">{k}</td>
                      <td className="py-2 text-foreground text-right">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mt-4">
              <h3 className="font-display font-bold text-foreground mb-2">Ürün Açıklaması</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Quote form */}
          <div className="mt-6 rounded-xl border border-border bg-muted/30 p-5">
            <h3 className="font-display font-bold text-foreground mb-3">Teklif Al</h3>
            <QuoteForm
              productId={product.id}
              productSku={product.sku}
              productName={product.name}
              productPrice={product.salePrice || product.price}
            />
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold mb-4 text-foreground">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{related.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}

      {/* Recently viewed */}
      {recentlyViewed.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl font-bold mb-4 text-foreground">Son Görüntülenen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}

      {/* JSON-LD */}
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
          price: product.salePrice || product.price,
          priceCurrency: "TRY",
          availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        },
      })}} />
    </div>
  );
}
