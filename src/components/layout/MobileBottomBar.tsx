import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Search, ShoppingCart } from "lucide-react";
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:hidden">
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
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors relative",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {isCart && itemCount > 0 && (
                <Badge className="absolute -top-1 right-0 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground rounded-full">
                  {itemCount}
                </Badge>
              )}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
