import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle, ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BRAND } from "@/lib/constants";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PaymentResultPage() {
  const { t } = useLanguage();
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
            </>
          ) : (
            <>
              <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h1 className="font-display text-2xl font-bold text-foreground mb-2">{t("payment.failed")}</h1>
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
