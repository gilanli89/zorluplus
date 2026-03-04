import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import CategoryPage from "@/pages/CategoryPage";
import CategoriesPage from "@/pages/CategoriesPage";
import ProductPage from "@/pages/ProductPage";
import SearchPage from "@/pages/SearchPage";
import ECataloguePage from "@/pages/ECataloguePage";
import BranchesPage from "@/pages/BranchesPage";
import ContactPage from "@/pages/ContactPage";
import QuotePage from "@/pages/QuotePage";
import {
  HakkimizdaPage, KunyePage, EkibimizPage, DestekPage,
  KullanimKosullariPage, IadeKosullariPage, GizlilikPolitikasiPage,
  SiparisTakipPage, OdemeYontemleriPage,
} from "@/pages/ContentPages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/arama" element={<SearchPage />} />
            <Route path="/e-katalog" element={<ECataloguePage />} />
            <Route path="/subelerimiz" element={<BranchesPage />} />
            <Route path="/iletisim" element={<ContactPage />} />
            <Route path="/teklif-al" element={<QuotePage />} />
            <Route path="/hakkimizda" element={<HakkimizdaPage />} />
            <Route path="/kunye" element={<KunyePage />} />
            <Route path="/ekibimiz" element={<EkibimizPage />} />
            <Route path="/destek" element={<DestekPage />} />
            <Route path="/kullanim-kosullari" element={<KullanimKosullariPage />} />
            <Route path="/iade-kosullari" element={<IadeKosullariPage />} />
            <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasiPage />} />
            <Route path="/siparis-takip" element={<SiparisTakipPage />} />
            <Route path="/odeme-yontemleri" element={<OdemeYontemleriPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
