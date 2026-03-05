import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, BookOpen, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

const items = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Grid3X3, label: "Kategoriler", href: "/kategoriler" },
  { icon: Search, label: "Ara", href: "/arama" },
  { icon: ShoppingCart, label: "Sepet", href: "/sepet" },
];

export default function MobileBottomBar() {
  const { pathname } = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-xl supports-[backdrop-filter]:bg-card/80 lg:hidden safe-bottom">
      <div className="flex items-center justify-around py-2">
        {items.map(item => {
          const active = pathname === item.href;
          const Icon = item.icon;
          const isCart = item.label === "Sepet";
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200 relative tap-scale",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className={cn(
                "transition-all duration-200",
                active && "scale-110 -translate-y-0.5"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              {isCart && itemCount > 0 && (
                <Badge className="absolute -top-1 right-0 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground rounded-full animate-pulse-ring">
                  {itemCount}
                </Badge>
              )}
              <span className={cn(
                "text-[10px] font-medium transition-all duration-200",
                active && "font-bold"
              )}>{item.label}</span>
              {active && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
