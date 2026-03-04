import { Link, useLocation } from "react-router-dom";
import { Home, Grid3X3, Search, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Ana Sayfa", href: "/" },
  { icon: Grid3X3, label: "Kategoriler", href: "/kategoriler" },
  { icon: Search, label: "Ara", href: "/arama" },
  { icon: MessageCircle, label: "WhatsApp", href: BRAND.whatsappLink, external: true },
];

export default function MobileBottomBar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map(item => {
          const active = !item.external && pathname === item.href;
          const Icon = item.icon;
          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 px-3 py-1 text-success"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
