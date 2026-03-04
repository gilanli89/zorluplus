import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";
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

export default function FilterSheet({ products, filters, onFiltersChange }: FilterSheetProps) {
  const [open, setOpen] = useState(false);
  const brands = getBrands(products);
  const maxPrice = Math.max(...products.map(p => p.price), 1);
  const activeCount = filters.brands.length + (filters.inStock ? 1 : 0) + (filters.priceMax && filters.priceMax < maxPrice ? 1 : 0);

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: next });
  };

  const clearFilters = () => {
    onFiltersChange({ brands: [], inStock: false, attributes: {}, sort: "popular" });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtrele
            {activeCount > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                {activeCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="max-h-[80vh] overflow-y-auto rounded-t-2xl">
          <SheetHeader>
            <SheetTitle className="font-display">Filtreler</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex flex-col gap-6 pb-8">
            {/* Brands */}
            {brands.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 text-foreground">Marka</h4>
                <div className="flex flex-wrap gap-2">
                  {brands.map(b => (
                    <button
                      key={b}
                      onClick={() => toggleBrand(b)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        filters.brands.includes(b) ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price range */}
            <div>
              <h4 className="text-sm font-semibold mb-2 text-foreground">Fiyat Aralığı</h4>
              <Slider
                min={0}
                max={maxPrice}
                step={500}
                value={[filters.priceMin || 0, filters.priceMax || maxPrice]}
                onValueChange={([min, max]) => onFiltersChange({ ...filters, priceMin: min, priceMax: max })}
                className="my-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatPrice(filters.priceMin || 0)}</span>
                <span>{formatPrice(filters.priceMax || maxPrice)}</span>
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="stock"
                checked={filters.inStock}
                onCheckedChange={c => onFiltersChange({ ...filters, inStock: !!c })}
              />
              <label htmlFor="stock" className="text-sm text-foreground">Sadece stokta olanlar</label>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={clearFilters}>Temizle</Button>
              <Button className="flex-1" onClick={() => setOpen(false)}>Uygula</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Sort */}
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

      {/* Active chips */}
      {filters.brands.map(b => (
        <Badge key={b} variant="secondary" className="gap-1 cursor-pointer" onClick={() => toggleBrand(b)}>
          {b} <X className="h-3 w-3" />
        </Badge>
      ))}
    </div>
  );
}

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
