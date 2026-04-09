import { useState, useMemo } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SlidersHorizontal, X, Minus, Bug, Tag, Monitor, Layers, Maximize, Thermometer, Weight, Droplets, Users, PackageCheck } from "lucide-react";
import { PremiumBadgeIcon } from "@/components/PremiumIcon";
import { FilterState, SortOption, Product } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import BrandLogo from "@/components/BrandLogo";
import {
  NormalizedProduct,
  DynamicFilterGroup,
  normalizeProducts,
  getDynamicFilters,
  applyNormalizedFilters,
  getDebugInfo,
  DebugInfo,
} from "@/lib/normalizeProducts";

/* ─── Shared filter body ─── */
interface FilterBodyProps {
  filterGroups: DynamicFilterGroup[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
}

function FilterBody({ filterGroups, filters, onFiltersChange }: FilterBodyProps) {
  const { t } = useLanguage();

  const toggleValue = (groupKey: string, value: string) => {
    const current = filters.attributes[groupKey] || [];
    const next = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
    onFiltersChange({ ...filters, attributes: { ...filters.attributes, [groupKey]: next } });
  };

  const FILTER_ICON_MAP: Record<string, typeof Tag> = {
    brand: Tag,
    screenSize: Monitor,
    panelType: Layers,
    resolution: Maximize,
    btu: Thermometer,
    capacityKg: Weight,
    capacityLt: Droplets,
    capacityPerson: Users,
  };

  return (
    <div className="space-y-1">
      {filterGroups.map(group => (
        <Collapsible key={group.key} defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <span className="flex items-center gap-2">
              <PremiumBadgeIcon icon={FILTER_ICON_MAP[group.key] || Tag} size={14} />
              {group.key === "brand" ? t("filter.brand") : group.label}
            </span>
            <Minus className="h-3.5 w-3.5 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="py-3 px-1 space-y-2 max-h-[280px] overflow-y-auto">
            {group.options.map(opt => {
              const selected = (filters.attributes[group.key] || []).includes(opt.value);
              return (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <Checkbox checked={selected} onCheckedChange={() => toggleValue(group.key, opt.value)} />
                  <span className="text-sm text-foreground group-hover:text-primary transition-colors flex-1 flex items-center gap-2">
                    {group.key === "brand" ? (
                      <BrandLogo brand={opt.value} size="sm" />
                    ) : (
                      opt.value
                    )}
                  </span>
                  <span className="text-xs text-muted-foreground">({opt.count})</span>
                </label>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      ))}

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-1 border-b border-border text-sm font-semibold text-foreground hover:text-primary transition-colors">
          <span className="flex items-center gap-2">
            <PremiumBadgeIcon icon={PackageCheck} size={14} />
            {t("filter.stock")}
          </span>
          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
        </CollapsibleTrigger>
        <CollapsibleContent className="py-3 px-1">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <Checkbox checked={filters.inStock} onCheckedChange={c => onFiltersChange({ ...filters, inStock: !!c })} />
            <span className="text-sm text-foreground">{t("filter.inStockOnly")}</span>
          </label>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/* ─── Props ─── */
interface FilterSheetProps {
  products: Product[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  categorySlug?: string;
  subSlug?: string;
}

const EMPTY_FILTER: FilterState = { brands: [], inStock: false, attributes: {}, sort: "popular" };

/* ─── Hook: normalize + compute filter groups ─── */
export function useNormalizedFiltering(products: Product[], filters: FilterState, categorySlug?: string, subSlug?: string) {
  const normalized = useMemo(() => normalizeProducts(products), [products]);
  const filterGroups = useMemo(() => getDynamicFilters(normalized, categorySlug, subSlug), [normalized, categorySlug, subSlug]);

  // Merge old-style "brands" into attributes for unified handling
  const unifiedAttrs = useMemo(() => {
    const attrs = { ...filters.attributes };
    if (filters.brands.length > 0) {
      attrs["brand"] = filters.brands;
    }
    return attrs;
  }, [filters]);

  const filtered = useMemo(
    () => applyNormalizedFilters(normalized, unifiedAttrs, filters.inStock, filters.sort),
    [normalized, unifiedAttrs, filters.inStock, filters.sort]
  );

  const debugInfo = useMemo(
    () => getDebugInfo(normalized, unifiedAttrs, filters.inStock),
    [normalized, unifiedAttrs, filters.inStock]
  );

  return { normalized, filterGroups, filtered, debugInfo };
}

/* ─── Desktop Sidebar Filter ─── */
export function FilterSidebar({ products, filters, onFiltersChange, categorySlug, subSlug }: FilterSheetProps) {
  const { t } = useLanguage();
  const { filterGroups } = useNormalizedFiltering(products, filters, categorySlug, subSlug);
  
  const activeCount = Object.values(filters.attributes).reduce((s, a) => s + a.length, 0) + (filters.inStock ? 1 : 0);

  return (
    <aside className="hidden md:block w-[260px] flex-shrink-0">
      <div className="sticky top-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-bold text-foreground">{t("filter.title")}</h3>
          {activeCount > 0 && (
            <button onClick={() => onFiltersChange(EMPTY_FILTER)} className="text-xs text-primary hover:underline">{t("filter.clear")}</button>
          )}
        </div>
        <FilterBody filterGroups={filterGroups} filters={filters} onFiltersChange={onFiltersChange} />
      </div>
    </aside>
  );
}

/* ─── Mobile Filter Sheet ─── */
export function MobileFilterTrigger({ products, filters, onFiltersChange, categorySlug, subSlug }: FilterSheetProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const { filterGroups } = useNormalizedFiltering(products, filters, categorySlug, subSlug);

  const activeCount = Object.values(filters.attributes).reduce((s, a) => s + a.length, 0) + (filters.inStock ? 1 : 0);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 md:hidden">
          <PremiumIconInline icon={SlidersHorizontal} size={16} />
          {t("filter.filterBtn")}
          {activeCount > 0 && (
            <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">{activeCount}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader>
          <SheetTitle className="font-display">{t("filter.filters")}</SheetTitle>
        </SheetHeader>
        <div className="mt-4 pb-8">
          <FilterBody filterGroups={filterGroups} filters={filters} onFiltersChange={onFiltersChange} />
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => onFiltersChange(EMPTY_FILTER)}>{t("filter.clear")}</Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>{t("filter.apply")}</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─── Sort + Active Chips Bar ─── */
export function SortBar({ filters, onFiltersChange }: { filters: FilterState; onFiltersChange: (f: FilterState) => void }) {
  const { t } = useLanguage();
  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: "popular", label: t("sort.popular") },
    { value: "newest", label: t("sort.newest") },
    { value: "oldest", label: t("sort.oldest") },
    { value: "price-asc", label: t("sort.priceAsc") },
    { value: "price-desc", label: t("sort.priceDesc") },
    { value: "name-asc", label: t("sort.nameAsc") },
    { value: "name-desc", label: t("sort.nameDesc") },
  ];

  const removeChip = (groupKey: string, value: string) => {
    const next = (filters.attributes[groupKey] || []).filter(v => v !== value);
    onFiltersChange({ ...filters, attributes: { ...filters.attributes, [groupKey]: next } });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={filters.sort} onValueChange={v => onFiltersChange({ ...filters, sort: v as SortOption })}>
        <SelectTrigger className="w-44 h-9 text-xs">
          <span className="text-muted-foreground mr-1 font-medium">{t("sort.label")}:</span>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map(o => (<SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>))}
        </SelectContent>
      </Select>

      {Object.entries(filters.attributes).flatMap(([key, vals]) =>
        vals.map(v => (
          <Badge key={`${key}-${v}`} variant="secondary" className="gap-1.5 cursor-pointer flex items-center" onClick={() => removeChip(key, v)}>
            {key === "brand" ? <BrandLogo brand={v} size="xs" /> : v} <X className="h-3 w-3" />
          </Badge>
        ))
      )}
    </div>
  );
}

/* ─── Debug Panel ─── */
export function FilterDebugPanel({ debugInfo }: { debugInfo: DebugInfo[] }) {
  const [open, setOpen] = useState(false);
  const excluded = debugInfo.filter(d => d.excluded);
  const included = debugInfo.filter(d => !d.excluded);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg"
        title="Debug Filters"
      >
        <Bug className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-[500px] max-h-[70vh] overflow-y-auto bg-card border border-border rounded-tl-xl shadow-2xl p-4 text-xs">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-bold text-sm">🐛 Filter Debug ({included.length} gösteriliyor, {excluded.length} hariç)</h4>
        <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
      </div>

      {excluded.length > 0 && (
        <div className="mb-4">
          <h5 className="font-semibold text-destructive mb-1">Hariç tutulan ürünler:</h5>
          {excluded.slice(0, 20).map(d => (
            <div key={d.sku} className="border-b border-border py-1.5">
              <div className="font-medium">{d.productName} <span className="text-muted-foreground">({d.sku})</span></div>
              <div className="text-muted-foreground">
                Norm: Ekran={d.normalized.screenSize ?? "yok"}, Panel={d.normalized.panelType ?? "yok"}, Çöz={d.normalized.resolution ?? "yok"}
              </div>
              {d.excludeReasons.map((r, i) => (
                <div key={i} className="text-destructive">↳ {r}</div>
              ))}
            </div>
          ))}
        </div>
      )}

      <div>
        <h5 className="font-semibold text-primary mb-1">Gösterilen ürünler ({included.length}):</h5>
        {included.slice(0, 10).map(d => (
          <div key={d.sku} className="border-b border-border py-1">
            <span className="font-medium">{d.productName}</span>
            <span className="text-muted-foreground ml-2">
              Ekran={d.normalized.screenSize ?? "-"} Panel={d.normalized.panelType ?? "-"}
            </span>
          </div>
        ))}
        {included.length > 10 && <div className="text-muted-foreground mt-1">...ve {included.length - 10} ürün daha</div>}
      </div>
    </div>
  );
}

/* ─── Legacy compatibility: applyFilters wrapper ─── */
export function applyFilters(products: Product[], filters: FilterState, categorySlug?: string, subSlug?: string): Product[] {
  const normalized = normalizeProducts(products);
  const attrs = { ...filters.attributes };
  if (filters.brands.length > 0) attrs["brand"] = filters.brands;
  return applyNormalizedFilters(normalized, attrs, filters.inStock, filters.sort);
}
