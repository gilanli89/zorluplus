import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { LeadFormData } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2, CheckCircle2 } from "lucide-react";

interface QuoteFormProps {
  productId?: string;
  productSku?: string;
  productName?: string;
  productPrice?: number;
  compact?: boolean;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-()]{7,20}$/;

export default function QuoteForm({ productId, productSku, productName, productPrice, compact }: QuoteFormProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<Partial<LeadFormData & { address: string }>>({
    name: "", phone: "", email: "", address: "", branch: "", notes: "",
  });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name?.trim() || form.name.trim().length < 2) {
      errs.name = t("quote.errorName") || "İsim en az 2 karakter olmalıdır";
    }
    if (!form.phone?.trim() || !PHONE_REGEX.test(form.phone.trim())) {
      errs.phone = t("quote.errorPhone") || "Geçerli bir telefon numarası giriniz";
    }
    if (form.email?.trim() && !EMAIL_REGEX.test(form.email.trim())) {
      errs.email = t("quote.errorEmail") || "Geçerli bir e-posta adresi giriniz";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submitWithRetry = async (payload: Record<string, unknown>, retries = 2): Promise<boolean> => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const { error } = await supabase.from("leads").insert({
          full_name: payload.name as string,
          phone: payload.phone as string,
          email: (payload.email as string) || null,
          product_interest: payload.productName as string || null,
          message: payload.notes as string || null,
          source: "zorluplus" as const,
        });
        if (!error) return true;
        console.warn(`Lead submit attempt ${attempt + 1} failed:`, error);
      } catch (err) {
        console.warn(`Lead submit attempt ${attempt + 1} exception:`, err);
      }
      if (attempt < retries) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const payload = {
      name: form.name!.trim(),
      phone: form.phone!.trim(),
      email: form.email?.trim() || "",
      branch: form.branch || "",
      notes: form.notes?.trim() || "",
      productId,
      productSku,
      productName,
      productUrl: window.location.href,
      productPrice,
    };

    const ok = await submitWithRetry(payload);
    setLoading(false);

    if (ok) {
      setSuccess(true);
      toast.success(t("quote.success"));
      setForm({ name: "", phone: "", email: "", address: "", branch: "", notes: "" });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000);
    } else {
      toast.error(t("quote.submitError") || "Gönderim başarısız. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div>
        <Input
          placeholder={t("quote.name")}
          value={form.name}
          onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: "" })); }}
          className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
          maxLength={100}
        />
        {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
      </div>
      <div>
        <Input
          placeholder={t("quote.phone")}
          type="tel"
          inputMode="tel"
          value={form.phone}
          onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: "" })); }}
          className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
          maxLength={20}
        />
        {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
      </div>
      {!compact && (
        <>
          <div>
            <Input
              placeholder={t("quote.email")}
              type="email"
              value={form.email}
              onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: "" })); }}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              maxLength={255}
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
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
      <Button type="submit" disabled={loading || success} className="w-full font-semibold gap-2">
        {loading ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {t("quote.sending")}</>
        ) : success ? (
          <><CheckCircle2 className="h-4 w-4" /> {t("quote.success")}</>
        ) : (
          t("quote.submit")
        )}
      </Button>
    </form>
  );
}
