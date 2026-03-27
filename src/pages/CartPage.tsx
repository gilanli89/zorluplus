import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ShieldPlus, Zap, ArrowLeft, CreditCard, Banknote, Package, Building2 } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import BrandLogo from "@/components/BrandLogo";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { useLanguage } from "@/contexts/LanguageContext";

import { useState, useMemo } from "react";
import { toast } from "sonner";
import { BRAND } from "@/lib/constants";
import { formatPrice } from "@/lib/products";

const EXPRESS_FEE = 2000;

export default function CartPage() {
  const { t } = useLanguage();
  const {
    items, removeItem, updateQuantity, clearCart, addItem,
    toggleWarranty, toggleExpressDelivery,
    subtotal, warrantyTotal, expressTotal, grandTotal, itemCount,
  } = useCart();

  const { data: allProducts = [] } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "transfer">("card");
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", email: "", address: "" });

  const hasTv = items.some(i => i.product.category === "tv-goruntu" && !i.product.subcategory?.includes("aksesuar"));

  const recommended = useMemo(() => {
    if (!hasTv) return [];
    const cartIds = new Set(items.map(i => i.product.id));
    return allProducts.filter(p => {
      if (cartIds.has(p.id)) return false;
      const nameL = p.name.toLowerCase();
      const catL = (p.category + " " + p.subcategory).toLowerCase();
      return nameL.includes("hdmi") || nameL.includes("askı") || nameL.includes("mount") || catL.includes("tv askı");
    }).slice(0, 6);
  }, [hasTv, items, allProducts]);

  if (items.length === 0) {
    return (
      <div className="container max-w-3xl py-16 text-center">
        <div className="relative mx-auto w-32 h-32 mb-6">
          {/* Animated empty box */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-muted-foreground/20 animate-pulse" />
          <PremiumIconInline icon={ShoppingCart} size={64} className="absolute inset-0 m-auto text-muted-foreground/20" />
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-bold text-muted-foreground">0</span>
          </div>
        </div>
        <h1 className="heading-2 text-foreground mb-2">{t("cart.emptyTitle")}</h1>
        <p className="text-muted-foreground mb-6">{t("cart.emptyDesc")}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="rounded-full gap-2"><PremiumIconInline icon={ArrowLeft} size={16} className="text-primary-foreground" /> {t("cart.startShopping")}</Button>
          </Link>
          <Link to="/kategoriler">
            <Button variant="outline" className="rounded-full gap-2">{t("nav.categories")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error(t("cart.fillRequired"));
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const orderItems = items.map(i => ({
      productId: i.product.id,
      name: i.product.name,
      sku: i.product.sku,
      quantity: i.quantity,
      unitPrice: i.product.salePrice || i.product.price,
      extendedWarranty: i.extendedWarranty,
      expressDelivery: i.expressDelivery,
    }));

    try {
      await supabase.from("orders").insert({
        order_number: orderId,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email || null,
        shipping_address: customerInfo.address || null,
        items: orderItems,
        total_amount: grandTotal,
        status: "pending",
        payment_method: paymentMethod === "card" ? "cardplus" : paymentMethod === "transfer" ? "bank_transfer" : "cash_on_delivery",
      });
    } catch (err) {
      console.error("Order save error:", err);
    }

    if (paymentMethod === "card") {
      const params = new URLSearchParams({ orderId, product: items.map(i => i.product.name).join(", ") });
      window.location.href = `/odeme?${params.toString()}`;
    } else {
      const methodLabel = paymentMethod === "transfer" ? "Havale/EFT" : "Kapıda Ödeme";
      const orderLines = items.map(i => {
        let line = `• ${i.product.name} x${i.quantity}`;
        if (i.extendedWarranty) line += ` (+2 Yıl Garanti)`;
        if (i.expressDelivery) line += ` (Express Kurulum)`;
        return line;
      }).join("\n");

      const message = `🛒 Yeni Sipariş (${methodLabel})\n\nSipariş No: ${orderId}\n\n${orderLines}\n\n👤 ${customerInfo.name}\n📱 ${customerInfo.phone}\n📧 ${customerInfo.email}\n📍 ${customerInfo.address}`;

      window.open(`https://wa.me/${BRAND.phone.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
      toast.success(paymentMethod === "transfer" ? t("cart.transferNote") : t("cart.orderCreated"));
      clearCart();
    }
  };

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <PremiumIconInline icon={ArrowLeft} size={16} /> {t("cart.continueShopping")}
      </Link>

      <h1 className="heading-2 text-foreground mb-6 pulse-heading">
        {t("cart.myCart")} <span className="text-muted-foreground font-normal text-lg">({itemCount} {t("cart.items")})</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => {
            const price = item.product.salePrice || item.product.price;
            const isAccessory = /hdmi|askı|mount|kablo|aparat/i.test(item.product.name) || item.product.subcategory?.includes("aksesuar");
            const showExpress = index === 0;

            return (
              <Card key={item.product.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/urun/${item.product.slug}`}>
                      <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-xl object-contain bg-muted/50 border border-border p-2" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <BrandLogo brand={item.product.brand} size="sm" />
                      <Link to={`/urun/${item.product.slug}`}>
                        <p className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">{item.product.name}</p>
                      </Link>
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground hover:text-destructive gap-1" onClick={() => removeItem(item.product.id)}>
                          <PremiumIconInline icon={Trash2} size={16} className="text-muted-foreground" /> {t("cart.delete")}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {(!isAccessory || showExpress) && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      {!isAccessory && (
                        <div className="flex items-start gap-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                          <PremiumIconInline icon={ShieldPlus} size={20} color="text-amber-600" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{t("cart.extendedWarranty")}</p>
                                <p className="text-xs text-muted-foreground">{t("cart.extendedWarrantyDesc")}</p>
                              </div>
                              <Switch checked={item.extendedWarranty} onCheckedChange={() => toggleWarranty(item.product.id)} />
                            </div>
                            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-1">{t("cart.warrantyFee")}</p>
                          </div>
                        </div>
                      )}
                      {showExpress && (
                        <div className="flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                          <PremiumIconInline icon={Zap} size={20} color="text-blue-600" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-foreground">{t("cart.expressInstall")}</p>
                                <p className="text-xs text-muted-foreground">{t("cart.expressInstallDesc")}</p>
                              </div>
                              <Switch checked={item.expressDelivery} onCheckedChange={() => toggleExpressDelivery(item.product.id)} />
                            </div>
                            <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mt-1">{t("cart.expressFee")}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {recommended.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                <PremiumIconInline icon={Package} size={20} /> {t("cart.recommended")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {recommended.map(rp => (
                  <Card key={rp.id} className="border-border overflow-hidden">
                    <CardContent className="p-3">
                      <Link to={`/urun/${rp.slug}`}>
                        <img src={rp.image} alt={rp.name} className="h-20 w-full object-contain mb-2" loading="lazy" />
                      </Link>
                      <p className="text-xs font-medium text-foreground line-clamp-2 mb-1">{rp.name}</p>
                      <Button size="sm" className="w-full rounded-full text-xs gap-1" onClick={() => { addItem(rp); toast.success(`${rp.name} ${t("cart.addedToCart")}`); }}>
                        <PremiumIconInline icon={ShoppingCart} size={12} className="text-primary-foreground" /> {t("cart.addToCart")}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-display font-bold text-foreground">{t("cart.customerInfo")}</h3>
              <Input placeholder={t("cart.fullName")} value={customerInfo.name} onChange={e => setCustomerInfo(p => ({ ...p, name: e.target.value }))} />
              <Input placeholder={t("cart.phone")} value={customerInfo.phone} onChange={e => setCustomerInfo(p => ({ ...p, phone: e.target.value }))} inputMode="tel" />
              <Input placeholder={t("cart.email")} value={customerInfo.email} onChange={e => setCustomerInfo(p => ({ ...p, email: e.target.value }))} type="email" />
              <Input placeholder={t("cart.address")} value={customerInfo.address} onChange={e => setCustomerInfo(p => ({ ...p, address: e.target.value }))} />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-display font-bold text-foreground">{t("cart.paymentMethod")}</h3>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "cash" | "transfer")}>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <PremiumIconInline icon={CreditCard} size={16} />
                    <div>
                      <p className="font-semibold text-sm">{t("cart.creditCard")}</p>
                      <p className="text-xs text-muted-foreground">{t("cart.creditCardDesc")}</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                    <PremiumIconInline icon={Building2} size={16} />
                    <div>
                      <p className="font-semibold text-sm">{t("cart.bankTransfer")}</p>
                      <p className="text-xs text-muted-foreground">{t("cart.bankTransferDesc")}</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                    <PremiumIconInline icon={Banknote} size={16} />
                    <div>
                      <p className="font-semibold text-sm">{t("cart.cashOnDelivery")}</p>
                      <p className="text-xs text-muted-foreground">{t("cart.cashOnDeliveryDesc")}</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {paymentMethod === "transfer" && (
                <div className="mt-3 rounded-xl bg-muted/50 border border-border p-4 space-y-1.5">
                  <p className="text-sm font-bold text-foreground">{t("cart.bankInfo")}</p>
                  <p className="text-xs text-muted-foreground">Zorlu Digital Trade and Services Ltd.</p>
                  <p className="text-xs text-muted-foreground">Türkiye İş Bankası — Hamitköy Lefkoşa Şubesi</p>
                  <p className="text-xs font-mono font-semibold text-foreground select-all">TR75 0006 4000 0016 8180 8102 16</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("cart.orderNote")}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border bg-muted/30">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-display font-bold text-foreground mb-3">{t("cart.orderSummary")}</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.products")} ({itemCount})</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              {warrantyTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.extendedWarranty")}</span>
                  <span className="font-semibold">{formatPrice(warrantyTotal)}</span>
                </div>
              )}
              {expressTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t("cart.expressInstall")}</span>
                  <span className="font-semibold">{formatPrice(expressTotal)}</span>
                </div>
              )}
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold">
                <span>{t("cart.orderSummary")}</span>
                <span className="text-primary">{formatPrice(grandTotal)}</span>
              </div>

              <Button className="w-full rounded-full font-semibold gap-2 mt-2" size="lg" onClick={handleCheckout}>
                {paymentMethod === "card" ? (
                  <><PremiumIconInline icon={CreditCard} size={16} className="text-primary-foreground" /> {t("cart.payWithCard")}</>
                ) : paymentMethod === "transfer" ? (
                  <><PremiumIconInline icon={Building2} size={16} className="text-primary-foreground" /> {t("cart.orderWithTransfer")}</>
                ) : (
                  <><PremiumIconInline icon={Banknote} size={16} className="text-primary-foreground" /> {t("cart.orderWithCash")}</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
