import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND } from "@/lib/constants";

export default function PaymentResultPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId") || "";
  const authCode = searchParams.get("authCode") || "";
  const transId = searchParams.get("transId") || "";
  const errorMessage = searchParams.get("errorMessage") || "";
  const isSuccess = status === "success";

  return (
    <div className="container max-w-lg py-12 md:py-20">
      <Card className="border-border text-center">
        <CardContent className="pt-8 pb-8">
          {isSuccess ? (
            <>
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                Ödeme Başarılı!
              </h1>
              <p className="text-muted-foreground mb-6">
                Siparişiniz başarıyla oluşturuldu.
              </p>
              <div className="bg-muted/50 rounded-xl p-4 text-left space-y-2 mb-6">
                {orderId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sipariş No:</span>
                    <span className="font-mono font-semibold text-foreground">{orderId}</span>
                  </div>
                )}
                {authCode && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Onay Kodu:</span>
                    <span className="font-mono font-semibold text-foreground">{authCode}</span>
                  </div>
                )}
                {transId && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">İşlem No:</span>
                    <span className="font-mono font-semibold text-foreground">{transId}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">
                Ödeme Başarısız
              </h1>
              <p className="text-muted-foreground mb-4">
                {errorMessage || "Ödeme işlemi sırasında bir hata oluştu."}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Lütfen kart bilgilerinizi kontrol ederek tekrar deneyiniz veya destek hattımızı arayınız.
              </p>
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/">
              <Button variant="outline" className="rounded-full gap-1.5 w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4" /> Mağazaya Dön
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
