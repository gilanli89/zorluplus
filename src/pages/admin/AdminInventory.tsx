import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState } from "react";
import { Save, RefreshCw, X, Sparkles, Loader2, FileText, Copy } from "lucide-react";
import { fetchProducts } from "@/lib/products";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const CONTENT_GEN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-content-gen`;

function AIContentDialog({ productName, brand, category }: { productName: string; brand?: string | null; category?: string | null }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<"description" | "seo" | "campaign">("description");

  const generate = async () => {
    setLoading(true);
    setContent("");
    try {
      const resp = await fetch(CONTENT_GEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ productName, brand, category, type }),
      });
      const data = await resp.json();
      if (data.error) { toast.error(data.error); return; }
      setContent(data.content || "");
    } catch { toast.error("AI içerik oluşturulamadı"); }
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1 text-primary" title="AI İçerik Üret">
          <Sparkles className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> AI İçerik Üretici
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground font-medium">{productName}</p>
        <div className="flex gap-2 mt-2">
          {([
            ["description", "Ürün Açıklaması"],
            ["seo", "SEO Meta"],
            ["campaign", "Kampanya Yazısı"],
          ] as const).map(([key, label]) => (
            <Button
              key={key}
              size="sm"
              variant={type === key ? "default" : "outline"}
              onClick={() => setType(key)}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
        <Button onClick={generate} disabled={loading} className="gap-2 mt-2">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
          {loading ? "Oluşturuluyor..." : "Oluştur"}
        </Button>
        {content && (
          <div className="mt-3">
            <Textarea value={content} onChange={e => setContent(e.target.value)} rows={5} className="text-sm" />
            <Button
              size="sm"
              variant="outline"
              className="gap-1 mt-2"
              onClick={() => { navigator.clipboard.writeText(content); toast.success("Kopyalandı!"); }}
            >
              <Copy className="h-3 w-3" /> Kopyala
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function AdminInventory() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string | number | boolean>>({});
  const [syncing, setSyncing] = useState(false);
  const [search, setSearch] = useState("");

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*").order("product_name");
      if (error) throw error;
      return data;
    },
  });

  const syncProducts = async () => {
    setSyncing(true);
    try {
      const products = await fetchProducts();
      let synced = 0;
      for (const p of products) {
        const { error } = await supabase.from("inventory").upsert(
          {
            sku: p.sku,
            product_name: p.name,
            brand: p.brand || null,
            category: p.category || null,
            original_price: p.price || null,
            sale_price: p.salePrice || null,
            is_active: p.inStock,
            quantity: p.inStock ? 1 : 0,
          },
          { onConflict: "sku" }
        );
        if (!error) synced++;
      }
      qc.invalidateQueries({ queryKey: ["admin-inventory"] });
      toast.success(`${synced} ürün senkronize edildi`);
    } catch (e: any) {
      toast.error("Senkronizasyon hatası: " + e.message);
    }
    setSyncing(false);
  };

  const updateItem = useMutation({
    mutationFn: async (values: { id: string; quantity: number; unit_price: number | null; sale_price: number | null; original_price: number | null; is_active: boolean }) => {
      const { error } = await supabase.from("inventory").update({
        quantity: values.quantity,
        unit_price: values.unit_price,
        sale_price: values.sale_price,
        original_price: values.original_price,
        is_active: values.is_active,
        price_updated_at: new Date().toISOString(),
      }).eq("id", values.id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-inventory"] }); toast.success("Güncellendi"); setEditingId(null); },
    onError: (e: Error) => toast.error(e.message),
  });

  const startEdit = (item: typeof items[0]) => {
    setEditingId(item.id);
    setEditValues({
      quantity: item.quantity,
      unit_price: item.unit_price ?? 0,
      sale_price: item.sale_price ?? 0,
      original_price: item.original_price ?? 0,
      is_active: item.is_active,
    });
  };

  const saveEdit = (id: string) => {
    updateItem.mutate({
      id,
      quantity: Number(editValues.quantity) || 0,
      unit_price: Number(editValues.unit_price) || null,
      sale_price: Number(editValues.sale_price) || null,
      original_price: Number(editValues.original_price) || null,
      is_active: !!editValues.is_active,
    });
  };

  const filtered = items.filter(item => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.product_name.toLowerCase().includes(q) ||
      (item.sku || "").toLowerCase().includes(q) ||
      (item.brand || "").toLowerCase().includes(q) ||
      (item.category || "").toLowerCase().includes(q)
    );
  });

  if (isLoading) return <div className="text-muted-foreground">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Stok Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} ürün kayıtlı</p>
        </div>
        <Button onClick={syncProducts} disabled={syncing} variant="outline" className="gap-2 rounded-full">
          <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Senkronize ediliyor..." : "CSV'den Senkronize Et"}
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Ürün adı, SKU veya marka ile ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">SKU</th>
                <th className="text-left px-4 py-3 font-semibold">Ürün</th>
                <th className="text-left px-4 py-3 font-semibold">Marka</th>
                <th className="text-left px-4 py-3 font-semibold">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold">Stok</th>
                <th className="text-left px-4 py-3 font-semibold">Fiyat</th>
                <th className="text-left px-4 py-3 font-semibold">İndirimli</th>
                <th className="text-left px-4 py-3 font-semibold">Aktif</th>
                <th className="text-left px-4 py-3 font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{item.sku || "—"}</td>
                  <td className="px-4 py-3 font-medium max-w-[250px] truncate">{item.product_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.brand || "—"}</td>
                  <td className="px-4 py-3">
                    {item.category ? <Badge variant="outline" className="text-xs">{item.category}</Badge> : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={String(editValues.quantity ?? 0)} onChange={e => setEditValues(v => ({ ...v, quantity: e.target.value }))} className="w-20 h-8" />
                    ) : (
                      <span className={item.quantity <= item.min_quantity ? "text-destructive font-semibold" : ""}>{item.quantity}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={String(editValues.original_price ?? 0)} onChange={e => setEditValues(v => ({ ...v, original_price: e.target.value }))} className="w-24 h-8" />
                    ) : (
                      <span>{item.original_price ? `${Number(item.original_price).toLocaleString("tr-TR")} TL` : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={String(editValues.sale_price ?? 0)} onChange={e => setEditValues(v => ({ ...v, sale_price: e.target.value }))} className="w-24 h-8" />
                    ) : (
                      <span className="text-accent font-semibold">{item.sale_price ? `${Number(item.sale_price).toLocaleString("tr-TR")} TL` : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Switch checked={!!editValues.is_active} onCheckedChange={v => setEditValues(ev => ({ ...ev, is_active: v }))} />
                    ) : (
                      <Badge variant={item.is_active ? "default" : "secondary"} className={item.is_active ? "bg-success/10 text-success" : ""}>
                        {item.is_active ? "Aktif" : "Pasif"}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => saveEdit(item.id)} className="gap-1"><Save className="h-3 w-3" /> Kaydet</Button>
                        <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}><X className="h-3 w-3" /></Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => startEdit(item)}>Düzenle</Button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="text-center py-8 text-muted-foreground">
                  {items.length === 0 ? "Henüz stok kaydı yok — CSV'den senkronize edin" : "Sonuç bulunamadı"}
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
