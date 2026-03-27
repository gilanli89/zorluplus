import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, BookOpen, ShoppingCart } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
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
                className={cn(
                  "p-1 rounded-lg transition-all duration-300",
                  active && "bg-primary/10 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.3)]"
                )}
              >
                <PremiumIconInline icon={Icon} size={20} className={cn(
                  "transition-all duration-300",
                  active ? "text-primary drop-shadow-[0_1px_3px_hsl(var(--primary)/0.4)]" : "text-muted-foreground"
                )} />
              </motion.div>
              <AnimatePresence>
                {isCart && itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 right-0 h-4 w-4 flex items-center justify-center text-[9px] font-bold bg-primary text-primary-foreground rounded-full animate-pulse-ring shadow-[0_2px_6px_-1px_hsl(var(--primary)/0.4)]"
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
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-primary shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
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
