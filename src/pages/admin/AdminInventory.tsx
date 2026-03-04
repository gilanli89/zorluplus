import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { Plus, Save } from "lucide-react";

export default function AdminInventory() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string | number>>({});

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*").order("product_name");
      if (error) throw error;
      return data;
    },
  });

  const updateItem = useMutation({
    mutationFn: async (values: { id: string; quantity: number; unit_price: number | null; sale_price: number | null; original_price: number | null }) => {
      const { error } = await supabase.from("inventory").update({
        quantity: values.quantity,
        unit_price: values.unit_price,
        sale_price: values.sale_price,
        original_price: values.original_price,
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
    });
  };

  const saveEdit = (id: string) => {
    updateItem.mutate({
      id,
      quantity: Number(editValues.quantity) || 0,
      unit_price: Number(editValues.unit_price) || null,
      sale_price: Number(editValues.sale_price) || null,
      original_price: Number(editValues.original_price) || null,
    });
  };

  if (isLoading) return <div className="text-muted-foreground">Yükleniyor...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Stok Yönetimi</h1>
      </div>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">SKU</th>
                <th className="text-left px-4 py-3 font-semibold">Ürün</th>
                <th className="text-left px-4 py-3 font-semibold">Marka</th>
                <th className="text-left px-4 py-3 font-semibold">Stok</th>
                <th className="text-left px-4 py-3 font-semibold">Fiyat</th>
                <th className="text-left px-4 py-3 font-semibold">İndirimli</th>
                <th className="text-left px-4 py-3 font-semibold">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{item.sku || "—"}</td>
                  <td className="px-4 py-3 font-medium">{item.product_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.brand || "—"}</td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={editValues.quantity} onChange={e => setEditValues(v => ({ ...v, quantity: e.target.value }))} className="w-20 h-8" />
                    ) : (
                      <span className={item.quantity <= item.min_quantity ? "text-destructive font-semibold" : ""}>{item.quantity}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={editValues.original_price} onChange={e => setEditValues(v => ({ ...v, original_price: e.target.value }))} className="w-24 h-8" />
                    ) : (
                      <span>{item.original_price ? `${Number(item.original_price).toLocaleString("tr-TR")} TL` : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Input type="number" value={editValues.sale_price} onChange={e => setEditValues(v => ({ ...v, sale_price: e.target.value }))} className="w-24 h-8" />
                    ) : (
                      <span className="text-accent font-semibold">{item.sale_price ? `${Number(item.sale_price).toLocaleString("tr-TR")} TL` : "—"}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === item.id ? (
                      <Button size="sm" onClick={() => saveEdit(item.id)} className="gap-1"><Save className="h-3 w-3" /> Kaydet</Button>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => startEdit(item)}>Düzenle</Button>
                    )}
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Stok kaydı yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
