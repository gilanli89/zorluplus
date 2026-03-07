import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { LeadFormData } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuoteFormProps {
  productId?: string;
  productSku?: string;
  productName?: string;
  productPrice?: number;
  compact?: boolean;
}

export default function QuoteForm({ productId, productSku, productName, productPrice, compact }: QuoteFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<LeadFormData & { address: string }>>({
    name: "", phone: "", email: "", address: "", branch: "", notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name?.trim() || !form.phone?.trim()) {
      toast.error(t("quote.error"));
      return;
    }
    setLoading(true);
    const payload: LeadFormData = {
      name: form.name!.trim(), phone: form.phone!.trim(), email: form.email?.trim() || "",
      branch: form.branch || "", notes: form.notes?.trim() || "",
      productId, productSku, productName, productUrl: window.location.href, productPrice,
    };
    console.log("Lead payload:", payload);
    setTimeout(() => {
      setLoading(false);
      toast.success(t("quote.success"));
      setForm({ name: "", phone: "", email: "", address: "", branch: "", notes: "" });
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input placeholder={t("quote.name")} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required maxLength={100} />
      <Input placeholder={t("quote.phone")} type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} required maxLength={20} />
      {!compact && (
        <>
          <Input placeholder={t("quote.email")} type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} maxLength={255} />
          <Input placeholder={t("quote.address")} value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} maxLength={300} />
          <Select value={form.branch} onValueChange={v => setForm(f => ({ ...f, branch: v }))}>
            <SelectTrigger>
              <SelectValue placeholder={t("quote.branch")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lefkosa">Lefkoşa</SelectItem>
              <SelectItem value="girne">Girne</SelectItem>
            </SelectContent>
          </Select>
          <Textarea placeholder={t("quote.notes")} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} maxLength={1000} />
        </>
      )}
      <Button type="submit" disabled={loading} className="w-full font-semibold">
        {loading ? t("quote.sending") : t("quote.submit")}
      </Button>
    </form>
  );
}
