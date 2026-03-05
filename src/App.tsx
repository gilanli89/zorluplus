import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductPage from "@/pages/ProductPage";
import CategoryLandingPage from "@/pages/CategoryLandingPage";
import SearchPage from "@/pages/SearchPage";
import ECataloguePage from "@/pages/ECataloguePage";
import BranchesPage from "@/pages/BranchesPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import ShopPage from "@/pages/ShopPage";
import {
  HakkimizdaPage, KunyePage, EkibimizPage, DestekPage,
  KullanimKosullariPage, IadeKosullariPage, GizlilikPolitikasiPage,
  SiparisTakipPage, OdemeYontemleriPage,
} from "@/pages/ContentPages";
import CheckoutPage from "@/pages/CheckoutPage";
import PaymentResultPage from "@/pages/PaymentResultPage";
import CartPage from "@/pages/CartPage";
import NotFound from "@/pages/NotFound";

// Admin
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminLayout from "@/pages/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminInventory from "@/pages/admin/AdminInventory";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminService from "@/pages/admin/AdminService";
import AdminLeaveRequests from "@/pages/admin/AdminLeaveRequests";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/kategoriler" element={<CategoriesPage />} />
              <Route path="/kategori/:categorySlug" element={<CategoryPage />} />
              <Route path="/kategori/:categorySlug/:subSlug" element={<CategoryPage />} />
              <Route path="/urun/:slug" element={<ProductPage />} />
              <Route path="/landing/:categorySlug" element={<CategoryLandingPage />} />
              <Route path="/arama" element={<SearchPage />} />
              <Route path="/e-katalog" element={<ECataloguePage />} />
              <Route path="/subelerimiz" element={<BranchesPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/teklif-al" element={<QuotePage />} />
              <Route path="/magaza" element={<ShopPage />} />
              <Route path="/hakkimizda" element={<HakkimizdaPage />} />
              <Route path="/kunye" element={<KunyePage />} />
              <Route path="/ekibimiz" element={<EkibimizPage />} />
              <Route path="/destek" element={<DestekPage />} />
              <Route path="/kullanim-kosullari" element={<KullanimKosullariPage />} />
              <Route path="/iade-kosullari" element={<IadeKosullariPage />} />
              <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
              <Route path="/siparis-takip" element={<SiparisTakipPage />} />
              <Route path="/odeme-yontemleri" element={<OdemeYontemleriPage />} />
              <Route path="/odeme" element={<CheckoutPage />} />
              <Route path="/odeme/sonuc" element={<PaymentResultPage />} />
              <Route path="/sepet" element={<CartPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/giris" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="siparisler" element={<AdminOrders />} />
              <Route path="stok" element={<AdminInventory />} />
              <Route path="talepler" element={<AdminLeads />} />
              <Route path="servis" element={<AdminService />} />
              <Route path="izinler" element={<AdminLeaveRequests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
