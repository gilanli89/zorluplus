import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowLeft, Phone, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateInvoice, generateInvoiceNumber } from "@/lib/invoiceGenerator";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";

export default function PaymentResultPage() {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId") || "";
  const authCode = searchParams.get("authCode") || "";
  const transId = searchParams.get("transId") || "";
  const errorMessage = searchParams.get("errorMessage") || "";
  const isSuccess = status === "success";
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (isSuccess && orderId) {
      supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderId)
        .single()
        .then(({ data }) => {
          if (data) setOrderData(data);
        });
    }
  }, [isSuccess, orderId]);

  const handleDownloadInvoice = () => {
    if (!orderData) return;
    const items = (orderData.items || []).map((item: any) => ({
      name: item.name || "Urun",
      quantity: item.quantity || 1,
      unitPrice: item.unitPrice || 0,
      total: (item.unitPrice || 0) * (item.quantity || 1),
    }));
    const subtotal = items.reduce((s: number, i: any) => s + i.total, 0);

    generateInvoice({
      invoiceNumber: generateInvoiceNumber(),
      date: new Date().toLocaleDateString("tr-TR"),
      customer: {
        name: orderData.customer_name || "",
        phone: orderData.customer_phone || "",
        email: orderData.customer_email || "",
        address: orderData.customer_address || "",
      },
      items,
      subtotal,
      vatRate: 0,
      vatAmount: 0,
      total: orderData.total_amount || subtotal,
      paymentMethod: orderData.payment_method === "cardplus" ? "Kredi Karti" : orderData.payment_method === "bank_transfer" ? "Havale/EFT" : "Kapida Odeme",
    });
  };

  return (
    <div className="container max-w-lg py-12 md:py-20">
      <Card className="border-border text-center">
        <CardContent className="pt-8 pb-8">
          {isSuccess ? (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="heading-2 text-foreground mb-2">{t("payment.success")}</h1>
              <p className="text-muted-foreground mb-6">{t("payment.successDesc")}</p>
              <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 mb-6">
                {orderId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("payment.orderNo")}</span>
                    <span className="font-mono font-semibold text-foreground">{orderId}</span>
                  </div>
                )}
                {authCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("payment.authCode")}</span>
                    <span className="font-mono font-semibold text-foreground">{authCode}</span>
                  </div>
                )}
                {transId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("payment.transId")}</span>
                    <span className="font-mono font-semibold text-foreground">{transId}</span>
                  </div>
                )}
              </div>

              {/* QR Code for order verification */}
              {orderId && (
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-3 rounded-xl inline-block">
                    <QRCodeSVG value={`https://zorluplus.com/siparis-takip?no=${orderId}`} size={96} />
                  </div>
                </div>
              )}

              {/* Invoice Download */}
              <Button
                onClick={handleDownloadInvoice}
                className="rounded-full gap-2 mb-4 w-full sm:w-auto"
                disabled={!orderData}
              >
                <FileDown className="h-4 w-4" />
                {lang === "tr" ? "E-Fatura Indir (PDF)" : "Download Invoice (PDF)"}
              </Button>
              <p className="text-[11px] text-muted-foreground mb-4">
                {lang === "tr"
                  ? "Zorlu Digital Plaza e-faturaniz hazirlanmistir."
                  : "Your Zorlu Digital Plaza e-invoice is ready."}
              </p>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="heading-2 text-foreground mb-2">{t("payment.failed")}</h1>
              <p className="text-muted-foreground mb-4">{errorMessage || t("payment.failedDesc")}</p>
              <p className="text-sm text-muted-foreground mb-6">{t("payment.retryDesc")}</p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="rounded-full gap-1.5 w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" /> {t("payment.backToStore")}
              </Button>
            </Link>
            <a href={`tel:${BRAND.phone}`}>
              <Button variant="ghost" className="rounded-full gap-1.5 w-full sm:w-auto">
                <Phone className="h-4 w-4" /> {BRAND.phoneDisplay}
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
