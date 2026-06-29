import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense, type ComponentType } from "react";
import PageLoader from "@/components/PageLoader";
import { COMING_SOON } from "@/lib/featureFlags";
import ComingSoonPage from "@/pages/ComingSoonPage";

// Lazy load store/admin code so Coming Soon can render without loading backend-dependent modules.
const Layout = lazy(() => import("@/components/layout/Layout"));
const HomePage = lazy(() => import("@/pages/HomePage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CategoryLandingPage = lazy(() => import("@/pages/CategoryLandingPage"));
const TVLandingPage = lazy(() => import("@/pages/TVLandingPage"));
const BeyazEsyaLandingPage = lazy(() => import("@/pages/landings/BeyazEsyaLandingPage"));
const AnkastreLandingPage = lazy(() => import("@/pages/landings/AnkastreLandingPage"));
const KlimaLandingPage = lazy(() => import("@/pages/landings/KlimaLandingPage"));
const CamasirMakinesiLandingPage = lazy(() => import("@/pages/landings/CamasirMakinesiLandingPage"));
const BulasikMakinesiLandingPage = lazy(() => import("@/pages/landings/BulasikMakinesiLandingPage"));
const KurutmaMakinesiLandingPage = lazy(() => import("@/pages/landings/KurutmaMakinesiLandingPage"));
const MikrodalgaLandingPage = lazy(() => import("@/pages/landings/MikrodalgaLandingPage"));
const KahveMakinesiLandingPage = lazy(() => import("@/pages/landings/KahveMakinesiLandingPage"));
const EvAletleriLandingPage = lazy(() => import("@/pages/landings/EvAletleriLandingPage"));
const AirfryerLandingPage = lazy(() => import("@/pages/landings/AirfryerLandingPage"));
const FirinLandingPage = lazy(() => import("@/pages/landings/FirinLandingPage"));
const TVKanalAyarlamaPage = lazy(() => import("@/pages/landings/TVKanalAyarlamaPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const ECataloguePage = lazy(() => import("@/pages/ECataloguePage"));
const BranchesPage = lazy(() => import("@/pages/BranchesPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const QuotePage = lazy(() => import("@/pages/QuotePage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const PaymentResultPage = lazy(() => import("@/pages/PaymentResultPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const KktcTelevizyon2026 = lazy(() => import("@/pages/blog/KktcTelevizyon2026"));
const B2BPage = lazy(() => import("@/pages/B2BPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const WPPageDetail = lazy(() => import("@/pages/WPPageDetail"));
const AdminRoutes = lazy(() => import("@/pages/admin/AdminRoutes"));

const lazyContentPage = (key: keyof typeof import("@/pages/ContentPages")) =>
  lazy(() => import("@/pages/ContentPages").then((mod) => ({ default: mod[key] as ComponentType })));

const HakkimizdaPage = lazyContentPage("HakkimizdaPage");
const KunyePage = lazyContentPage("KunyePage");
const EkibimizPage = lazyContentPage("EkibimizPage");
const DestekPage = lazyContentPage("DestekPage");
const KullanimKosullariPage = lazyContentPage("KullanimKosullariPage");
const IadeKosullariPage = lazyContentPage("IadeKosullariPage");
const GizlilikPolitikasiPage = lazyContentPage("GizlilikPolitikasiPage");
const KvkkPage = lazyContentPage("KvkkPage");
const CerezPolitikasiPage = lazyContentPage("CerezPolitikasiPage");
const MesafeliSatisSozlesmesiPage = lazyContentPage("MesafeliSatisSozlesmesiPage");
const SiparisTakipPage = lazyContentPage("SiparisTakipPage");
const OdemeYontemleriPage = lazyContentPage("OdemeYontemleriPage");
const SurdurulebilirlikPage = lazyContentPage("SurdurulebilirlikPage");
const HavaleOdemePage = lazyContentPage("HavaleOdemePage");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function ComingSoonRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<ComingSoonPage />} />
    </Routes>
  );
}

function StoreRoutes() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/kategoriler" element={<CategoriesPage />} />
        <Route path="/kategori/:categorySlug" element={<CategoryPage />} />
        <Route path="/kategori/:categorySlug/:subSlug" element={<CategoryPage />} />
        <Route path="/urun/:slug" element={<ProductPage />} />
        <Route path="/landing/:categorySlug" element={<CategoryLandingPage />} />
        <Route path="/televizyon" element={<TVLandingPage />} />
        <Route path="/beyaz-esya" element={<BeyazEsyaLandingPage />} />
        <Route path="/ankastre" element={<AnkastreLandingPage />} />
        <Route path="/klima" element={<KlimaLandingPage />} />
        <Route path="/camasir-makinesi" element={<CamasirMakinesiLandingPage />} />
        <Route path="/bulasik-makinesi" element={<BulasikMakinesiLandingPage />} />
        <Route path="/kurutma-makinesi" element={<KurutmaMakinesiLandingPage />} />
        <Route path="/mikrodalga" element={<MikrodalgaLandingPage />} />
        <Route path="/kahve-makinesi" element={<KahveMakinesiLandingPage />} />
        <Route path="/ev-aletleri" element={<EvAletleriLandingPage />} />
        <Route path="/airfryer" element={<AirfryerLandingPage />} />
        <Route path="/firin" element={<FirinLandingPage />} />
        <Route path="/televizyon-kanal-ayarlama" element={<TVKanalAyarlamaPage />} />
        <Route path="/arama" element={<SearchPage />} />
        <Route path="/e-katalog" element={<ECataloguePage />} />
        <Route path="/subelerimiz" element={<BranchesPage />} />
        <Route path="/iletisim" element={<ContactPage />} />
        <Route path="/teklif-al" element={<QuotePage />} />
        <Route path="/magaza" element={<Navigate to="/kategori/tv-goruntu/tv" replace />} />
        <Route path="/hakkimizda" element={<HakkimizdaPage />} />
        <Route path="/kunye" element={<KunyePage />} />
        <Route path="/ekibimiz" element={<EkibimizPage />} />
        <Route path="/destek" element={<DestekPage />} />
        <Route path="/kullanim-kosullari" element={<KullanimKosullariPage />} />
        <Route path="/iade-kosullari" element={<IadeKosullariPage />} />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
        <Route path="/kvkk" element={<KvkkPage />} />
        <Route path="/cerez-politikasi" element={<CerezPolitikasiPage />} />
        <Route path="/mesafeli-satis-sozlesmesi" element={<MesafeliSatisSozlesmesiPage />} />
        <Route path="/surdurulebilirlik" element={<SurdurulebilirlikPage />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/siparis-takip" element={<SiparisTakipPage />} />
        <Route path="/odeme-yontemleri" element={<OdemeYontemleriPage />} />
        <Route path="/havale-ile-odeme" element={<HavaleOdemePage />} />
        <Route path="/odeme" element={<CheckoutPage />} />
        <Route path="/odeme/sonuc" element={<PaymentResultPage />} />
        <Route path="/sepet" element={<CartPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/sayfa/:slug" element={<WPPageDetail />} />
        <Route path="/blog/kktc-televizyon-fiyatlari-2026" element={<KktcTelevizyon2026 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

const ComingSoonApp = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<PageLoader />}>
      <ComingSoonRoutes />
    </Suspense>
  </BrowserRouter>
);

const StoreApp = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <StoreRoutes />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

const App = () => (COMING_SOON ? <ComingSoonApp /> : <StoreApp />);

export default App;