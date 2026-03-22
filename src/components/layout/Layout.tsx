import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";
import FloatingLinktree from "@/components/FloatingLinktree";
import AIChatbot from "@/components/AIChatbot";
import SpecialDayBanner from "@/components/SpecialDayBanner";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SpecialDayBanner />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
      <FloatingLinktree />
      <AIChatbot />
    </div>
  );
}