import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { CategoryFilterConfig, FilterOption } from "@/data/filterTree";
import { ActiveFilters, SortByOption, getProductAttrs } from "@/hooks/useProductFilter";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/lib/types";

/* ─── Single Filter Group ─── */
function FilterGroup({
  filter,
  activeFilters,
  onToggle,
  onToggleSwitch,
  onRangeChange,
  products,
}: {
  filter: FilterOption;
  activeFilters: ActiveFilters;
  onToggle: (key: string, value: string) => void;
  onToggleSwitch: (key: string, enabled: boolean) => void;
  onRangeChange: (key: string, min: number, max: number) => void;
  products: Product[];
}) {
  const activeValues = (activeFilters[filter.key] as string[]) || [];

  // Count products per value for this filter
  const getValueCount = (value: string): number => {
    if (filter.key === "brand") {
      return products.filter((p) => p.brand.toUpperCase() === value.toUpperCase()).length;
    }
    return products.filter((p) => {
      const attrs = getProductAttrs(p);
      const attrVal = attrs[filter.key];
      if (attrVal === undefined) return false;
      const strVal = typeof attrVal === "boolean" ? (attrVal ? "Evet" : "Hayır") : String(attrVal);
      return strVal.toLowerCase() === value.toLowerCase();
    }).length;
  };

  if (filter.type === "price_range" || filter.type === "size_range") {
    const min = filter.min ?? 0;
    const max = filter.max ?? 500000;
    const currentRange = (activeFilters[filter.key] as [number, number]) || [min, max];
    if (min >= max) return null;

    const isPrice = filter.key === "price";
    const unit = filter.unit || (isPrice ? "₺" : "");
    const step = isPrice ? 500 : Math.max(1, Math.floor((max - min) / 50));

    return (
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          {filter.label_tr}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 px-2">
          <Slider
            min={min}
            max={max}
            step={step}
            value={currentRange}
            onValueChange={([lo, hi]) => onRangeChange(filter.key, lo, hi)}
            className="mb-3"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{isPrice ? "₺" : ""}{currentRange[0].toLocaleString("tr-TR")}{!isPrice && unit ? ` ${unit}` : ""}</span>
            <span>{isPrice ? "₺" : ""}{currentRange[1].toLocaleString("tr-TR")}{!isPrice && unit ? ` ${unit}` : ""}</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (filter.type === "toggle") {
    const isActive = !!activeFilters[filter.key];
    return (
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          {filter.label_tr}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Switch checked={isActive} onCheckedChange={(v) => onToggleSwitch(filter.key, v)} />
            <span className="text-sm text-foreground">{filter.values?.[0] || "Evet"}</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  if (filter.type === "checkbox" && filter.values && filter.values.length > 0) {
    // For brand filter, dynamically build values from actual products
    let displayValues: string[];
    if (filter.key === "brand") {
      const dynamicBrands = [...new Set(products.map(p => p.brand).filter(Boolean))].sort();
      displayValues = dynamicBrands.length > 0 ? dynamicBrands : filter.values;
    } else {
      displayValues = filter.values;
    }

    const valuesWithCounts = displayValues.map((v) => ({
      value: v,
      count: getValueCount(v),
    })).filter(({ count }) => filter.key === "brand" ? true : count > 0);

    if (valuesWithCounts.length === 0) return null;

    return (
      <Collapsible defaultOpen={valuesWithCounts.length <= 8}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          {filter.label_tr}
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1 space-y-2 max-h-[280px] overflow-y-auto">
          {valuesWithCounts.map(({ value, count }) => (
            <label key={value} className="flex items-center gap-2.5 cursor-pointer group">
              <Checkbox
                checked={activeValues.includes(value)}
                onCheckedChange={() => onToggle(filter.key, value)}
              />
              <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                {filter.key === "brand" ? value.toUpperCase() : value}
              </span>
              {count > 0 && <span className="text-xs text-muted-foreground">({count})</span>}
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return null;
}

/* ─── Filter Body using filter tree config ─── */
function DynamicFilterBody({
  config,
  products,
  activeFilters,
  onToggle,
  onToggleSwitch,
  onPriceRange,
}: {
  config: CategoryFilterConfig;
  products: Product[];
  activeFilters: ActiveFilters;
  onToggle: (key: string, value: string) => void;
  onToggleSwitch: (key: string, enabled: boolean) => void;
  onPriceRange: (min: number, max: number) => void;
}) {
  return (
    <div className="space-y-1">
      {config.filters.map((filter) => (
        <FilterGroup
          key={filter.key}
          filter={filter}
          activeFilters={activeFilters}
          onToggle={onToggle}
          onToggleSwitch={onToggleSwitch}
          onPriceRange={onPriceRange}
          products={products}
        />
      ))}
      {/* Stock filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Stok Durumu
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Switch
              checked={!!activeFilters["in_stock"]}
              onCheckedChange={(v) => onToggleSwitch("in_stock", v)}
            />
            <span className="text-sm text-foreground">Sadece Stokta Olanlar</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ─── Fallback Filter Body (when no filter tree config) ─── */
function FallbackFilterBody({
  products,
  activeFilters,
  onToggle,
  onToggleSwitch,
}: {
  products: Product[];
  activeFilters: ActiveFilters;
  onToggle: (key: string, value: string) => void;
  onToggleSwitch: (key: string, enabled: boolean) => void;
}) {
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))].sort();
  const brandCounts: Record<string, number> = {};
  products.forEach((p) => {
    if (p.brand) brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
  });
  const activeBrands = (activeFilters["brand"] as string[]) || [];

  return (
    <div className="space-y-1">
      {brands.length > 0 && (
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
            Marka
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="py-3 px-1 space-y-2 max-h-[280px] overflow-y-auto">
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                <Checkbox
                  checked={activeBrands.includes(b)}
                  onCheckedChange={() => onToggle("brand", b)}
                />
                <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1">
                  {b.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">({brandCounts[b] || 0})</span>
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          Stok Durumu
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Switch
              checked={!!activeFilters["in_stock"]}
              onCheckedChange={(v) => onToggleSwitch("in_stock", v)}
            />
            <span className="text-sm text-foreground">Sadece Stokta Olanlar</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ─── Desktop Sidebar ─── */
export function FilterSidebar({
  config,
  products,
  activeFilters,
  activeCount,
  onToggle,
  onToggleSwitch,
  onPriceRange,
  onClear,
}: {
  config?: CategoryFilterConfig;
  products: Product[];
  activeFilters: ActiveFilters;
  activeCount: number;
  onToggle: (key: string, value: string) => void;
  onToggleSwitch: (key: string, enabled: boolean) => void;
  onPriceRange: (min: number, max: number) => void;
  onClear: () => void;
}) {
  return (
    <aside className="hidden md:block w-[260px] flex-shrink-0">
      <div className="sticky top-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-foreground">Filtreler</h3>
          {activeCount > 0 && (
            <button onClick={onClear} className="text-xs text-primary hover:underline">
              Temizle ({activeCount})
            </button>
          )}
        </div>
        {config ? (
          <DynamicFilterBody
            config={config}
            products={products}
            activeFilters={activeFilters}
            onToggle={onToggle}
            onToggleSwitch={onToggleSwitch}
            onPriceRange={onPriceRange}
          />
        ) : (
          <FallbackFilterBody
            products={products}
            activeFilters={activeFilters}
            onToggle={onToggle}
            onToggleSwitch={onToggleSwitch}
          />
        )}
      </div>
    </aside>
  );
}

/* ─── Mobile Filter Sheet ─── */
export function MobileFilterTrigger({
  config,
  products,
  activeFilters,
  activeCount,
  onToggle,
  onToggleSwitch,
  onPriceRange,
  onClear,
}: {
  config?: CategoryFilterConfig;
  products: Product[];
  activeFilters: ActiveFilters;
  activeCount: number;
  onToggle: (key: string, value: string) => void;
  onToggleSwitch: (key: string, enabled: boolean) => void;
  onPriceRange: (min: number, max: number) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);

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
          {config ? (
            <DynamicFilterBody
              config={config}
              products={products}
              activeFilters={activeFilters}
              onToggle={onToggle}
              onToggleSwitch={onToggleSwitch}
              onPriceRange={onPriceRange}
            />
          ) : (
            <FallbackFilterBody
              products={products}
              activeFilters={activeFilters}
              onToggle={onToggle}
              onToggleSwitch={onToggleSwitch}
            />
          )}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClear}>
              Temizle
            </Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Uygula
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Sort Bar ─── */
export function SortBar({
  sortBy,
  onSortChange,
  activeFilters,
  onToggle,
}: {
  sortBy: SortByOption;
  onSortChange: (s: SortByOption) => void;
  activeFilters: ActiveFilters;
  onToggle: (key: string, value: string) => void;
}) {
  const SORT_OPTIONS: { value: SortByOption; label: string }[] = [
    { value: "featured", label: "Öne Çıkanlar" },
    { value: "price_asc", label: "Fiyat: Düşükten Yükseğe" },
    { value: "price_desc", label: "Fiyat: Yüksekten Düşüğe" },
    { value: "newest", label: "En Yeni" },
  ];

  const activeBrands = (activeFilters["brand"] as string[]) || [];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortByOption)}>
        <SelectTrigger className="w-48 h-9 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active brand chips */}
      {activeBrands.map((b) => (
        <Badge
          key={b}
          variant="secondary"
          className="gap-1 cursor-pointer"
          onClick={() => onToggle("brand", b)}
        >
          {b} <X className="h-3 w-3" />
        </Badge>
      ))}

      {/* Other active filter chips */}
      {Object.entries(activeFilters)
        .filter(([key]) => key !== "brand" && key !== "price" && key !== "in_stock" && key !== "on_sale")
        .flatMap(([key, vals]) => {
          if (!Array.isArray(vals)) return [];
          return (vals as string[]).map((v) => (
            <Badge
              key={`${key}-${v}`}
              variant="secondary"
              className="gap-1 cursor-pointer"
              onClick={() => onToggle(key, v)}
            >
              {v} <X className="h-3 w-3" />
            </Badge>
          ));
        })}
    </div>
  );
}
