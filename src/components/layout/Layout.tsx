import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";
import FloatingLinktree from "@/components/FloatingLinktree";
import AIChatbot from "@/components/AIChatbot";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
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