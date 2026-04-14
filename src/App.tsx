import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import PageLoader from "@/components/PageLoader";
import { COMING_SOON } from "@/lib/featureFlags";
import ComingSoonPage from "@/pages/ComingSoonPage";

// Eager load: HomePage (above the fold)
import HomePage from "@/pages/HomePage";

// Lazy load: all other pages
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
const ShopPage = lazy(() => import("@/pages/ShopPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const PaymentResultPage = lazy(() => import("@/pages/PaymentResultPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const KktcTelevizyon2026 = lazy(() => import("@/pages/blog/KktcTelevizyon2026"));
const B2BPage = lazy(() => import("@/pages/B2BPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const WPPageDetail = lazy(() => import("@/pages/WPPageDetail"));

// Content pages
const ContentPages = lazy(() => import("@/pages/ContentPages").then(m => ({
  default: () => null // placeholder, we import individually below
})));

import {
  HakkimizdaPage, KunyePage, EkibimizPage, DestekPage,
  KullanimKosullariPage, IadeKosullariPage, GizlilikPolitikasiPage,
  KvkkPage, CerezPolitikasiPage, MesafeliSatisSozlesmesiPage,
  SiparisTakipPage, OdemeYontemleriPage, SurdurulebilirlikPage,
  HavaleOdemePage,
} from "@/pages/ContentPages";

// Admin (separate bundle)
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminInventory = lazy(() => import("@/pages/admin/AdminInventory"));
const AdminLeads = lazy(() => import("@/pages/admin/AdminLeads"));
const AdminService = lazy(() => import("@/pages/admin/AdminService"));
const AdminLeaveRequests = lazy(() => import("@/pages/admin/AdminLeaveRequests"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminRoles = lazy(() => import("@/pages/admin/AdminRoles"));
const AdminActivityLogs = lazy(() => import("@/pages/admin/AdminActivityLogs"));
const AdminBackups = lazy(() => import("@/pages/admin/AdminBackups"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {COMING_SOON ? (
                <Route path="*" element={<ComingSoonPage />} />
              ) : (
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
              )}

              {/* Admin */}
              <Route path="/admin/giris" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="siparisler" element={<AdminOrders />} />
                <Route path="stok" element={<AdminInventory />} />
                <Route path="talepler" element={<AdminLeads />} />
                <Route path="servis" element={<AdminService />} />
                <Route path="izinler" element={<AdminLeaveRequests />} />
                <Route path="kullanicilar" element={<AdminUsers />} />
                <Route path="roller" element={<AdminRoles />} />
                <Route path="aktivite-loglari" element={<AdminActivityLogs />} />
                <Route path="yedekler" element={<AdminBackups />} />
              </Route>
            </Routes>
          </Suspense>
        </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
