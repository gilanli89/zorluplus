import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlidersHorizontal, X, Minus } from "lucide-react";
import { FilterState, SortOption, Product } from "@/lib/types";
import { getBrands, formatPrice } from "@/lib/products";

/* ─── Category-specific attribute extraction ─── */
interface DynamicAttribute {
  key: string;
  label: string;
  values: { value: string; count: number }[];
}

function extractScreenSize(name: string): string | null {
  const m = name.match(/(\d{2,3})[""′']\s*/i) || name.match(/(\d{2,3})\s*(?:inch|inç)/i);
  if (m) return `${m[1]}"`;
  // Try "43-inch" style
  const m2 = name.match(/(\d{2,3})-inch/i);
  if (m2) return `${m2[1]}"`;
  return null;
}

function extractPanelType(name: string, desc: string): string | null {
  const text = `${name} ${desc}`.toUpperCase();
  if (text.includes("NEO QLED")) return "Neo QLED";
  if (text.includes("QLED")) return "QLED";
  if (text.includes("OLED")) return "OLED";
  if (text.includes("NANOCELL")) return "NanoCell";
  if (text.includes("CRYSTAL") || text.includes("KRİSTAL")) return "Crystal UHD";
  if (text.includes("LED")) return "LED";
  return null;
}

function extractBTU(name: string, desc: string): string | null {
  const text = `${name} ${desc}`;
  const m = text.match(/(\d{4,5})\s*BTU/i);
  return m ? `${m[1]} BTU` : null;
}

function extractCapacity(name: string, desc: string): string | null {
  const text = `${name} ${desc}`;
  const mKg = text.match(/(\d+(?:[.,]\d+)?)\s*(?:KG|kg|Kg)/);
  if (mKg) return `${mKg[1]} KG`;
  const mKisilik = text.match(/(\d+)\s*(?:Kişilik|kişilik)/i);
  if (mKisilik) return `${mKisilik[1]} Kişilik`;
  const mLt = text.match(/(\d+(?:[.,]\d+)?)\s*(?:LT|lt|L)\b/i);
  if (mLt) return `${mLt[1]} LT`;
  return null;
}

function getCategoryAttributes(products: Product[], categorySlug?: string): DynamicAttribute[] {
  if (!categorySlug) return [];
  const attrs: DynamicAttribute[] = [];

  if (categorySlug === "tv-goruntu" || categorySlug === "tv") {
    // Screen size
    const sizeCounts: Record<string, number> = {};
    const panelCounts: Record<string, number> = {};
    products.forEach(p => {
      const size = extractScreenSize(p.name);
      if (size) sizeCounts[size] = (sizeCounts[size] || 0) + 1;
      const panel = extractPanelType(p.name, p.description);
      if (panel) panelCounts[panel] = (panelCounts[panel] || 0) + 1;
    });
    if (Object.keys(sizeCounts).length > 0) {
      attrs.push({
        key: "screenSize",
        label: "Ekran Boyutu",
        values: Object.entries(sizeCounts)
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
      });
    }
    if (Object.keys(panelCounts).length > 0) {
      attrs.push({
        key: "panelType",
        label: "Panel Tipi",
        values: Object.entries(panelCounts)
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => b.count - a.count),
      });
    }
  }

  if (categorySlug === "klima-isitma" || categorySlug === "klima" || categorySlug === "split-klima" || categorySlug === "portatif-klima") {
    const btuCounts: Record<string, number> = {};
    products.forEach(p => {
      const btu = extractBTU(p.name, p.description);
      if (btu) btuCounts[btu] = (btuCounts[btu] || 0) + 1;
    });
    if (Object.keys(btuCounts).length > 0) {
      attrs.push({
        key: "btu",
        label: "BTU",
        values: Object.entries(btuCounts)
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => parseInt(a.value) - parseInt(b.value)),
      });
    }
  }

  if (["beyaz-esya", "camasir-makinesi", "bulasik-makinesi", "kurutma-makinesi", "buzdolabi", "derin-dondurucu", "mini-buzdolabi"].includes(categorySlug)) {
    const capCounts: Record<string, number> = {};
    products.forEach(p => {
      const cap = extractCapacity(p.name, p.description);
      if (cap) capCounts[cap] = (capCounts[cap] || 0) + 1;
    });
    if (Object.keys(capCounts).length > 0) {
      attrs.push({
        key: "capacity",
        label: "Kapasite",
        values: Object.entries(capCounts)
          .map(([value, count]) => ({ value, count }))
          .sort((a, b) => {
            const numA = parseFloat(a.value);
            const numB = parseFloat(b.value);
            return numA - numB;
          }),
      });
    }
  }

  return attrs;
}

interface FilterSheetProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  categorySlug?: string;
  subSlug?: string;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "En Popüler" },
  { value: "newest", label: "Yeni Gelenler" },
];

/* ─── Shared filter body (used in both sidebar & mobile sheet) ─── */
function FilterBody({
  products,
  filters,
  onFiltersChange,
  categorySlug,
  subSlug,
}: FilterSheetProps) {
  const brands = getBrands(products);
  const dynamicAttrs = getCategoryAttributes(products, subSlug || categorySlug);
  // maxPrice removed - prices hidden

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

  return (
    <div className="space-y-1">

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

      {/* Dynamic category-specific attributes */}
      {dynamicAttrs.map(attr => (
        <Collapsible key={attr.key} defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
            {attr.label}
            <Minus className="h-3.5 w-3.5 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="py-3 px-1 space-y-2 max-h-[280px] overflow-y-auto">
            {attr.values.map(v => {
              const selected = (filters.attributes[attr.key] || []).includes(v.value);
              const toggleAttr = () => {
                const current = filters.attributes[attr.key] || [];
                const next = selected
                  ? current.filter(x => x !== v.value)
                  : [...current, v.value];
                onFiltersChange({
                  ...filters,
                  attributes: { ...filters.attributes, [attr.key]: next },
                });
              };
              return (
                <label key={v.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <Checkbox checked={selected} onCheckedChange={toggleAttr} />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                    {v.value}
                  </span>
                  <span className="text-xs text-muted-foreground">({v.count})</span>
                </label>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}

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
  const attrCount = Object.values(props.filters.attributes).reduce((sum, arr) => sum + arr.length, 0);
  const activeCount = props.filters.brands.length + (props.filters.inStock ? 1 : 0) + attrCount;

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
  const attrCount = Object.values(props.filters.attributes).reduce((sum, arr) => sum + arr.length, 0);
  const activeCount = props.filters.brands.length + (props.filters.inStock ? 1 : 0) + attrCount;

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


      {/* Attribute chips */}
      {Object.entries(filters.attributes).flatMap(([key, vals]) =>
        vals.map(v => (
          <Badge key={`${key}-${v}`} variant="secondary" className="gap-1 cursor-pointer" onClick={() => {
            const next = vals.filter(x => x !== v);
            onFiltersChange({ ...filters, attributes: { ...filters.attributes, [key]: next } });
          }}>
            {v} <X className="h-3 w-3" />
          </Badge>
        ))
      )}
    </div>
  );
}

/* ─── applyFilters with attribute support ─── */
export function applyFilters(products: Product[], filters: FilterState, categorySlug?: string, subSlug?: string): Product[] {
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

  // Dynamic attribute filtering
  const activeAttrs = Object.entries(filters.attributes).filter(([, vals]) => vals.length > 0);
  if (activeAttrs.length > 0) {
    result = result.filter(p => {
      return activeAttrs.every(([key, vals]) => {
        let extracted: string | null = null;
        if (key === "screenSize") extracted = extractScreenSize(p.name);
        else if (key === "panelType") extracted = extractPanelType(p.name, p.description);
        else if (key === "btu") extracted = extractBTU(p.name, p.description);
        else if (key === "capacity") extracted = extractCapacity(p.name, p.description);
        return extracted && vals.includes(extracted);
      });
    });
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
