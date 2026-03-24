import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ShieldPlus, Zap } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CartSheet() {
  const { items, itemCount, removeItem, updateQuantity, subtotal, grandTotal } = useCart();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary text-primary-foreground rounded-full">
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-96 flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> {t("cart.myCart")} ({itemCount})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingCart className="h-12 w-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">{t("cart.empty")}</p>
            <Button variant="outline" className="rounded-full" onClick={() => setOpen(false)}>
              {t("cart.startShopping")}
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map(item => {
                const price = item.product.salePrice || item.product.price;
                return (
                  <div key={item.product.id} className="rounded-xl border border-border bg-muted/30 p-3">
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-16 w-16 rounded-lg object-contain bg-card border border-border"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-primary/70 uppercase">{item.product.brand}</p>
                        <p className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold text-foreground">{formatPrice(price * item.quantity)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <Link to="/sepet" onClick={() => setOpen(false)}>
                <Button className="w-full rounded-full font-semibold gap-2" size="lg">
                  <ShoppingCart className="h-4 w-4" /> {t("cart.goToCart")}
                </Button>
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
