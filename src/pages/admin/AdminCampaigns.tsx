import { useState, useMemo, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Plus, Loader2, Percent, Tag, Calendar, Trash2, Pencil,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Checkbox } from "@/components/ui/checkbox";

// ── Types ───────────────────────────────────────────────────────────────────

interface Campaign {
  id: string;
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  productIds: string[];
}

interface CampaignForm {
  name: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  startDate: string;
  endDate: string;
  productIds: string[];
}

const EMPTY_FORM: CampaignForm = {
  name: "",
  discountType: "percentage",
  discountValue: 0,
  startDate: "",
  endDate: "",
  productIds: [],
};

const STORAGE_KEY = "zorlu-campaigns";

function loadCampaigns(): Campaign[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCampaigns(campaigns: Campaign[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(campaigns));
}

function getCampaignStatus(c: Campaign): "active" | "scheduled" | "expired" {
  if (!c.isActive) return "expired";
  const now = new Date();
  const start = new Date(c.startDate);
  const end = new Date(c.endDate);
  if (now < start) return "scheduled";
  if (now > end) return "expired";
  return "active";
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-success/10 text-success",
  scheduled: "bg-primary/10 text-primary",
  expired: "bg-muted text-muted-foreground",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Aktif",
  scheduled: "Planlanmis",
  expired: "Bitmis",
};

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(loadCampaigns);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<CampaignForm>(EMPTY_FORM);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    saveCampaigns(campaigns);
  }, [campaigns]);

  const { data: products = [] } = useQuery({
    queryKey: ["campaign-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("id, product_name, brand")
        .eq("is_active", true)
        .order("product_name");
      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = useMemo(() => {
    if (!productSearch) return products;
    const q = productSearch.toLowerCase();
    return products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(q) ||
        (p.brand || "").toLowerCase().includes(q)
    );
  }, [products, productSearch]);

  const toggleProduct = (id: string) => {
    setForm((f) => ({
      ...f,
      productIds: f.productIds.includes(id)
        ? f.productIds.filter((pid) => pid !== id)
        : [...f.productIds, id],
    }));
  };

  const addCampaign = () => {
    if (!form.name || !form.startDate || !form.endDate) {
      toast.error("Lutfen tum alanlari doldurun");
      return;
    }
    const newCampaign: Campaign = {
      id: crypto.randomUUID(),
      ...form,
      isActive: true,
    };
    setCampaigns((prev) => [...prev, newCampaign]);
    toast.success("Kampanya olusturuldu");
    setAddOpen(false);
    setForm(EMPTY_FORM);
  };

  const toggleActive = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
    toast.success("Kampanya durumu guncellendi");
  };

  const deleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
    toast.success("Kampanya silindi");
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kampanya Yonetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{campaigns.length} kampanya</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={() => setForm(EMPTY_FORM)}>
              <PremiumIconInline icon={Plus} size={16} className="text-white" /> Kampanya Olustur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Kampanya</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Kampanya Adi *</label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ornek: Yaz Indirimi" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Indirim Tipi</label>
                  <Select value={form.discountType} onValueChange={(v: "percentage" | "fixed") => setForm((f) => ({ ...f, discountType: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Yuzde (%)</SelectItem>
                      <SelectItem value="fixed">Sabit Tutar (TL)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Indirim Degeri</label>
                  <Input type="number" value={form.discountValue || ""} onChange={(e) => setForm((f) => ({ ...f, discountValue: Number(e.target.value) }))} placeholder={form.discountType === "percentage" ? "Ornek: 30" : "Ornek: 500"} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Baslangic Tarihi *</label>
                  <Input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bitis Tarihi *</label>
                  <Input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>

              {/* Campaign badge preview */}
              {form.name && (
                <div>
                  <label className="text-sm font-medium mb-1 block">Onizleme</label>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-xl">
                    <Badge className="bg-accent text-white text-sm px-3 py-1">
                      {form.discountType === "percentage" ? `%${form.discountValue} INDIRIM` : `${form.discountValue} TL INDIRIM`}
                    </Badge>
                    <span className="text-sm font-medium">{form.name}</span>
                  </div>
                </div>
              )}

              {/* Product selection */}
              <div>
                <label className="text-sm font-medium mb-1 block">Urunler ({form.productIds.length} secili)</label>
                <Input placeholder="Urun ara..." value={productSearch} onChange={(e) => setProductSearch(e.target.value)} className="mb-2" />
                <div className="max-h-[200px] overflow-y-auto border rounded-lg p-2 space-y-1">
                  {filteredProducts.map((p) => (
                    <label key={p.id} className="flex items-center gap-2 p-1.5 rounded hover:bg-muted/50 cursor-pointer">
                      <Checkbox checked={form.productIds.includes(p.id)} onCheckedChange={() => toggleProduct(p.id)} />
                      <span className="text-sm truncate">{p.product_name}</span>
                      {p.brand && <Badge variant="outline" className="text-xs ml-auto shrink-0">{p.brand}</Badge>}
                    </label>
                  ))}
                  {filteredProducts.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">Urun bulunamadi</p>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Iptal</Button>
              <Button onClick={addCampaign} className="gap-2">
                <Tag className="h-4 w-4" /> Olustur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Campaign list */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Kampanya</th>
                <th className="text-left px-4 py-3 font-semibold">Indirim</th>
                <th className="text-left px-4 py-3 font-semibold">Baslangic</th>
                <th className="text-left px-4 py-3 font-semibold">Bitis</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Urun Sayisi</th>
                <th className="text-left px-4 py-3 font-semibold">Aktif</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c) => {
                const status = getCampaignStatus(c);
                return (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="gap-1">
                        {c.discountType === "percentage" ? <Percent className="h-3 w-3" /> : <Tag className="h-3 w-3" />}
                        {c.discountType === "percentage" ? `%${c.discountValue}` : `${c.discountValue} TL`}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(c.startDate).toLocaleDateString("tr-TR")}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(c.endDate).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={STATUS_STYLES[status]}>{STATUS_LABELS[status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-center">{c.productIds.length}</td>
                    <td className="px-4 py-3">
                      <Switch checked={c.isActive} onCheckedChange={() => toggleActive(c.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteCampaign(c.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {campaigns.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground">
                    Henuz kampanya yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
