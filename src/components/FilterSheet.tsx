import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlidersHorizontal, X, Minus } from "lucide-react";
import { FilterState, SortOption, Product } from "@/lib/types";
import { getBrands, formatPrice } from "@/lib/products";

interface FilterSheetProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "En Popüler" },
  { value: "price-asc", label: "Fiyat (Artan)" },
  { value: "price-desc", label: "Fiyat (Azalan)" },
  { value: "newest", label: "Yeni Gelenler" },
  { value: "sale", label: "İndirimdekiler" },
];

/* ─── Shared filter body (used in both sidebar & mobile sheet) ─── */
function FilterBody({
  products,
  filters,
  onFiltersChange,
}: FilterSheetProps) {
  const brands = getBrands(products);
  const maxPrice = Math.max(...products.map(p => p.salePrice || p.price), 1);

  // Brand counts
  const brandCounts: Record<string, number> = {};
  products.forEach(p => {
    if (p.brand) brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: next });
  };

  const [minInput, setMinInput] = useState(filters.priceMin?.toString() || "");
  const [maxInput, setMaxInput] = useState(filters.priceMax?.toString() || "");

  const applyPrice = () => {
    onFiltersChange({
      ...filters,
      priceMin: minInput ? Number(minInput) : undefined,
      priceMax: maxInput ? Number(maxInput) : undefined,
    });
  };

  return (
    <div className="space-y-1">
      {/* Price */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Fiyat
          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs text-muted-foreground">₺</span>
              <Input
                placeholder="ELAÇ."
                value={minInput}
                onChange={e => setMinInput(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={e => e.key === "Enter" && applyPrice()}
                className="h-9 text-xs"
                type="number"
              />
            </div>
            <span className="text-muted-foreground text-xs">-</span>
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs text-muted-foreground">₺</span>
              <Input
                placeholder="MAK."
                value={maxInput}
                onChange={e => setMaxInput(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={e => e.key === "Enter" && applyPrice()}
                className="h-9 text-xs"
                type="number"
              />
            </div>
            <Button size="sm" className="h-9 px-3 text-xs font-bold" onClick={applyPrice}>
              BUL
            </Button>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Brand */}
      {brands.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Marka
            <Minus className="h-3.5 w-3.5 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="py-3 px-1 space-y-2 max-h-[280px] overflow-y-auto">
            {brands.map(b => (
              <label
                key={b}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <Checkbox
                  checked={filters.brands.includes(b)}
                  onCheckedChange={() => toggleBrand(b)}
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                  {b.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({brandCounts[b] || 0})
                </span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Stock */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Stok Durumu
          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox
              checked={filters.inStock}
              onCheckedChange={c => onFiltersChange({ ...filters, inStock: !!c })}
            />
            <span className="text-sm text-foreground">Sadece stokta olanlar</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ─── Desktop Sidebar Filter ─── */
export function FilterSidebar(props: FilterSheetProps) {
  const clearFilters = () => {
    props.onFiltersChange({ brands: [], inStock: false, attributes: {}, sort: "popular" });
  };
  const activeCount = props.filters.brands.length + (props.filters.inStock ? 1 : 0) + (props.filters.priceMin ? 1 : 0) + (props.filters.priceMax ? 1 : 0);

  return (
    <aside className="hidden md:block w-[260px] flex-shrink-0">
      <div className="sticky top-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-foreground">Ürün Filtrele</h3>
          {activeCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-primary hover:underline">
              Temizle
            </button>
          )}
        </div>
        <FilterBody {...props} />
      </div>
    </aside>
  );
}

/* ─── Mobile Filter Sheet ─── */
export function MobileFilterTrigger(props: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const maxPrice = Math.max(...props.products.map(p => p.price), 1);
  const activeCount = props.filters.brands.length + (props.filters.inStock ? 1 : 0) + (props.filters.priceMin ? 1 : 0) + (props.filters.priceMax ? 1 : 0);

  const clearFilters = () => {
    props.onFiltersChange({ brands: [], inStock: false, attributes: {}, sort: "popular" });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 md:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filtrele
          {activeCount > 0 && (
            <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-display">Filtreler</SheetTitle>
        </SheetHeader>
        <div className="mt-4 pb-8">
          <FilterBody {...props} />
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={clearFilters}>Temizle</Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>Uygula</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Sort + Active Chips Bar ─── */
export function SortBar({ filters, onFiltersChange }: { filters: FilterState; onFiltersChange: (f: FilterState) => void }) {
  const toggleBrand = (brand: string) => {
    const next = filters.brands.filter(b => b !== brand);
    onFiltersChange({ ...filters, brands: next });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={filters.sort} onValueChange={v => onFiltersChange({ ...filters, sort: v as SortOption })}>
        <SelectTrigger className="w-40 h-9 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map(o => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {filters.brands.map(b => (
        <Badge key={b} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleBrand(b)}>
          {b} <X className="h-3 w-3" />
        </Badge>
      ))}

      {filters.priceMin != null && (
        <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => onFiltersChange({ ...filters, priceMin: undefined })}>
          Min: {formatPrice(filters.priceMin)} <X className="h-3 w-3" />
        </Badge>
      )}
      {filters.priceMax != null && (
        <Badge variant="secondary" className="gap-1 cursor-pointer" onClick={() => onFiltersChange({ ...filters, priceMax: undefined })}>
          Max: {formatPrice(filters.priceMax)} <X className="h-3 w-3" />
        </Badge>
      )}
    </div>
  );
}

/* ─── applyFilters stays the same ─── */
export function applyFilters(products: Product[], filters: FilterState): Product[] {
  let result = [...products];

  if (filters.brands.length > 0) {
    result = result.filter(p => filters.brands.includes(p.brand));
  }
  if (filters.inStock) {
    result = result.filter(p => p.inStock);
  }
  if (filters.priceMin != null) {
    result = result.filter(p => (p.salePrice || p.price) >= filters.priceMin!);
  }
  if (filters.priceMax != null) {
    result = result.filter(p => (p.salePrice || p.price) <= filters.priceMax!);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case "price-desc":
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case "newest":
      result.sort((a, b) => (a.isNew ? -1 : 1));
      break;
    case "sale":
      result = result.filter(p => p.salePrice && p.salePrice < p.price);
      break;
  }

  return result;
}
