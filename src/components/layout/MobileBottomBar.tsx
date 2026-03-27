import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, BookOpen, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileBottomBar() {
  const { pathname } = useLocation();
  const { itemCount } = useCart();
  const { t } = useLanguage();

  const items = [
    { icon: Home, label: t("nav.home"), href: "/" },
    { icon: Grid3X3, label: t("nav.categories"), href: "/kategoriler" },
    { icon: BookOpen, label: t("nav.eCatalogue"), href: "/e-katalog" },
    { icon: ShoppingCart, label: t("nav.cart"), href: "/sepet" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/50 bg-card/80 backdrop-blur-2xl supports-[backdrop-filter]:bg-card/60 lg:hidden safe-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map(item => {
          const active = pathname === item.href;
          const Icon = item.icon;
          const isCart = item.label === t("nav.cart");
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200 relative tap-scale",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <motion.div
                animate={active ? { scale: 1.15, y: -2 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <AnimatePresence>
                {isCart && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 right-0 h-4 w-4 flex items-center justify-center text-[9px] font-bold bg-primary text-primary-foreground rounded-full animate-pulse-ring"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                active && "font-bold"
              )}>{item.label}</span>
              {active && (
                <motion.span
                  layoutId="bottombar-indicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
