import { useState, useRef, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const productName = searchParams.get("product") || t("checkout.securePayment");

  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const cardSchema = z.object({
    cardNumber: z.string().regex(/^\d{16}$/, t("checkout.cardNumber")),
    expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, t("checkout.month")),
    expYear: z.string().regex(/^\d{2}$/, t("checkout.year")),
    cvv: z.string().regex(/^\d{3,4}$/, "CVV"),
    cardName: z.string().min(2, t("checkout.cardName")),
  });

  const [form, setForm] = useState({ cardNumber: "", expMonth: "", expYear: "", cvv: "", cardName: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [gatewayData, setGatewayData] = useState<{ gatewayUrl: string; formData: Record<string, string> } | null>(null);

  useEffect(() => {
    if (!orderId) { setLoadingOrder(false); return; }
    supabase.from("orders").select("total_amount").eq("order_number", orderId).single().then(({ data }) => {
      if (data) setOrderAmount(data.total_amount);
      setLoadingOrder(false);
    });
  }, [orderId]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleChange = (field: string, value: string) => {
    if (field === "cardNumber") setForm(f => ({ ...f, cardNumber: value.replace(/\D/g, "").slice(0, 16) }));
    else if (field === "expMonth") setForm(f => ({ ...f, expMonth: value.replace(/\D/g, "").slice(0, 2) }));
    else if (field === "expYear") setForm(f => ({ ...f, expYear: value.replace(/\D/g, "").slice(0, 2) }));
    else if (field === "cvv") setForm(f => ({ ...f, cvv: value.replace(/\D/g, "").slice(0, 4) }));
    else setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = cardSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { if (err.path[0]) fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    if (!orderId) { toast.error("Invalid order"); return; }
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const okUrl = `${supabaseUrl}/functions/v1/cardplus-callback`;
      const { data, error } = await supabase.functions.invoke("cardplus-initiate", {
        body: { cardNumber: form.cardNumber, expMonth: form.expMonth, expYear: form.expYear, cvv: form.cvv, orderId, okUrl, failUrl: okUrl },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setGatewayData(data);
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      toast.error(err.message || "Unknown error");
      setLoading(false);
    }
  };

  useEffect(() => { if (gatewayData && hiddenFormRef.current) hiddenFormRef.current.submit(); }, [gatewayData]);

  return (
    <div className="container max-w-lg py-8 md:py-16">
      <Link to="/sepet" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <PremiumIconInline icon={ArrowLeft} size={16} /> {t("checkout.backToCart")}
      </Link>

      <Card className="border-border">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <PremiumIconInline icon={Lock} size={20} />
            <CardTitle className="font-display text-xl">{t("checkout.securePayment")}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">{t("checkout.secureDesc")}</p>
          {productName && <p className="text-sm font-semibold text-foreground mt-2">{productName}</p>}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardName">{t("checkout.cardName")}</Label>
              <Input id="cardName" placeholder="AD SOYAD" value={form.cardName} onChange={e => handleChange("cardName", e.target.value.toUpperCase())} className="mt-1" />
              {errors.cardName && <p className="text-xs text-destructive mt-1">{errors.cardName}</p>}
            </div>
            <div>
              <Label htmlFor="cardNumber">{t("checkout.cardNumber")}</Label>
              <div className="relative">
                <Input id="cardNumber" placeholder="0000 0000 0000 0000" value={formatCardNumber(form.cardNumber)} onChange={e => handleChange("cardNumber", e.target.value)} className="mt-1 pl-10" inputMode="numeric" />
                <PremiumIconInline icon={CreditCard} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 mt-0.5 text-muted-foreground" />
              </div>
              {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="expMonth">{t("checkout.month")}</Label>
                <Input id="expMonth" placeholder="MM" value={form.expMonth} onChange={e => handleChange("expMonth", e.target.value)} className="mt-1" inputMode="numeric" />
                {errors.expMonth && <p className="text-xs text-destructive mt-1">{errors.expMonth}</p>}
              </div>
              <div>
                <Label htmlFor="expYear">{t("checkout.year")}</Label>
                <Input id="expYear" placeholder="YY" value={form.expYear} onChange={e => handleChange("expYear", e.target.value)} className="mt-1" inputMode="numeric" />
                {errors.expYear && <p className="text-xs text-destructive mt-1">{errors.expYear}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="***" type="password" value={form.cvv} onChange={e => handleChange("cvv", e.target.value)} className="mt-1" inputMode="numeric" />
                {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
              </div>
            </div>
            <Button type="submit" className="w-full rounded-full gap-2" size="lg" disabled={loading || !orderId}>
              {loading ? (<><PremiumIconInline icon={Loader2} size={16} className="animate-spin text-primary-foreground" /> {t("checkout.processing")}</>) : (<><PremiumIconInline icon={ShieldCheck} size={16} className="text-primary-foreground" /> {t("checkout.completePayment")}</>)}
            </Button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <PremiumIconInline icon={Lock} size={12} />
            <span>{t("checkout.encrypted")}</span>
          </div>
        </CardContent>
      </Card>

      {gatewayData && (
        <form ref={hiddenFormRef} method="POST" action={gatewayData.gatewayUrl} style={{ display: "none" }}>
          {Object.entries(gatewayData.formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>
      )}
    </div>
  );
}
