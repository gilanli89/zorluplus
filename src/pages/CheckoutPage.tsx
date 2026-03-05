import { useState, useRef, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { toast } from "sonner";

const cardSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Geçerli bir kart numarası giriniz"),
  expMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, "Geçerli bir ay giriniz (01-12)"),
  expYear: z.string().regex(/^\d{2}$/, "Geçerli bir yıl giriniz"),
  cvv: z.string().regex(/^\d{3,4}$/, "Geçerli bir CVV giriniz"),
  cardName: z.string().min(2, "Kart üzerindeki ismi giriniz"),
});

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const productName = searchParams.get("product") || "Ödeme";

  const [orderAmount, setOrderAmount] = useState<number | null>(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  const [form, setForm] = useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    cardName: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [gatewayData, setGatewayData] = useState<{ gatewayUrl: string; formData: Record<string, string> } | null>(null);

  // Fetch order amount from DB for display only
  useEffect(() => {
    if (!orderId) {
      setLoadingOrder(false);
      return;
    }
    supabase
      .from("orders")
      .select("total_amount")
      .eq("order_number", orderId)
      .single()
      .then(({ data }) => {
        if (data) setOrderAmount(data.total_amount);
        setLoadingOrder(false);
      });
  }, [orderId]);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      const digits = value.replace(/\D/g, "").slice(0, 16);
      setForm(f => ({ ...f, cardNumber: digits }));
    } else if (field === "expMonth") {
      setForm(f => ({ ...f, expMonth: value.replace(/\D/g, "").slice(0, 2) }));
    } else if (field === "expYear") {
      setForm(f => ({ ...f, expYear: value.replace(/\D/g, "").slice(0, 2) }));
    } else if (field === "cvv") {
      setForm(f => ({ ...f, cvv: value.replace(/\D/g, "").slice(0, 4) }));
    } else {
      setForm(f => ({ ...f, [field]: value }));
    }
    setErrors(e => ({ ...e, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = cardSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!orderId) {
      toast.error("Geçersiz sipariş");
      return;
    }

    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const okUrl = `${supabaseUrl}/functions/v1/cardplus-callback`;
      const failUrl = okUrl;

      const { data, error } = await supabase.functions.invoke("cardplus-initiate", {
        body: {
          cardNumber: form.cardNumber,
          expMonth: form.expMonth,
          expYear: form.expYear,
          cvv: form.cvv,
          orderId,
          okUrl,
          failUrl,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setGatewayData(data);
    } catch (err: any) {
      console.error("Payment initiation error:", err);
      toast.error("Ödeme başlatılamadı: " + (err.message || "Bilinmeyen hata"));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gatewayData && hiddenFormRef.current) {
      hiddenFormRef.current.submit();
    }
  }, [gatewayData]);

  return (
    <div className="container max-w-lg py-8 md:py-16">
      <Link to="/sepet" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Sepete Dön
      </Link>

      <Card className="border-border">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="h-5 w-5 text-primary" />
            <CardTitle className="font-display text-xl">Güvenli Ödeme</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">3D Secure ile güvenli ödeme</p>
          {productName && (
            <p className="text-sm font-semibold text-foreground mt-2">{productName}</p>
          )}
          {/* amount hidden */}
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
              <Input
                id="cardName"
                placeholder="AD SOYAD"
                value={form.cardName}
                onChange={e => handleChange("cardName", e.target.value.toUpperCase())}
                className="mt-1"
              />
              {errors.cardName && <p className="text-xs text-destructive mt-1">{errors.cardName}</p>}
            </div>

            <div>
              <Label htmlFor="cardNumber">Kart Numarası</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={formatCardNumber(form.cardNumber)}
                  onChange={e => handleChange("cardNumber", e.target.value)}
                  className="mt-1 pl-10"
                  inputMode="numeric"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 mt-0.5 h-4 w-4 text-muted-foreground" />
              </div>
              {errors.cardNumber && <p className="text-xs text-destructive mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="expMonth">Ay</Label>
                <Input
                  id="expMonth"
                  placeholder="MM"
                  value={form.expMonth}
                  onChange={e => handleChange("expMonth", e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                />
                {errors.expMonth && <p className="text-xs text-destructive mt-1">{errors.expMonth}</p>}
              </div>
              <div>
                <Label htmlFor="expYear">Yıl</Label>
                <Input
                  id="expYear"
                  placeholder="YY"
                  value={form.expYear}
                  onChange={e => handleChange("expYear", e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                />
                {errors.expYear && <p className="text-xs text-destructive mt-1">{errors.expYear}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="***"
                  type="password"
                  value={form.cvv}
                  onChange={e => handleChange("cvv", e.target.value)}
                  className="mt-1"
                  inputMode="numeric"
                />
                {errors.cvv && <p className="text-xs text-destructive mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full rounded-full gap-2"
              size="lg"
              disabled={loading || !orderId}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> İşleniyor...
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" /> Ödemeyi Tamamla
                </>
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span>256-bit SSL ile şifrelenmektedir</span>
          </div>
        </CardContent>
      </Card>

      {gatewayData && (
        <form
          ref={hiddenFormRef}
          method="POST"
          action={gatewayData.gatewayUrl}
          style={{ display: "none" }}
        >
          {Object.entries(gatewayData.formData).map(([key, value]) => (
            <input key={key} type="hidden" name={key} value={value} />
          ))}
        </form>
      )}
    </div>
  );
}
