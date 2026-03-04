import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Phone, Menu, X, FileText, Wrench, Shield, Award } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg supports-[backdrop-filter]:bg-card/80 shadow-sm">
      {/* Top bar */}
      <div className="bg-foreground text-background">
        <div className="container flex items-center justify-between py-1.5 text-[11px]">
          <div className="flex items-center gap-4 font-medium">
            <span className="hidden sm:inline-flex items-center gap-1"><Shield className="h-3 w-3" /> Samsung & LG Yetkili Bayi</span>
            <span className="inline-flex items-center gap-1"><Award className="h-3 w-3" /> 2 Yıl Garanti</span>
          </div>
          <a href={`tel:${BRAND.phone}`} className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity">
            <Phone className="h-3 w-3" />
            {BRAND.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center justify-between gap-3 py-3">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="text-lg font-display font-bold">{BRAND.name}</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <div key={cat.slug}>
                  <Link
                    to={`/kategori/${cat.slug}`}
                    className="block rounded-xl px-3 py-2.5 font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    {cat.name}
                  </Link>
                  {cat.children.length > 0 && (
                    <div className="ml-4 flex flex-col">
                      {cat.children.map(sub => (
                        <Link
                          key={sub.slug}
                          to={`/kategori/${cat.slug}/${sub.slug}`}
                          className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="my-3 border-border" />
              <Link to="/e-katalog" className="flex items-center gap-2 px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl">
                <FileText className="h-4 w-4" /> E-Katalog
              </Link>
              <Link to="/subelerimiz" className="px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl">
                Şubelerimiz
              </Link>
              <Link to="/iletisim" className="px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl">
                Bize Ulaşın
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {CATEGORIES.slice(0, 4).map(cat => (
            <Link
              key={cat.slug}
              to={`/kategori/${cat.slug}`}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link
            to="/e-katalog"
            className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            E-Katalog
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a href="https://servis.zorluplus.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5 font-semibold hidden sm:inline-flex">
              <Wrench className="h-3.5 w-3.5" /> Servis Talebi
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full sm:hidden">
              <Wrench className="h-5 w-5 text-primary" />
            </Button>
          </a>
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Ürün ara..."
                className="w-40 sm:w-60 h-9 rounded-full"
                autoFocus
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Link to="/teklif-al">
            <Button size="sm" className="hidden sm:inline-flex font-semibold rounded-full px-5">
              Teklif Al
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
