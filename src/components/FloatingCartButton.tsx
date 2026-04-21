import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function FloatingCartButton() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Don't show if cart is empty
  if (itemCount === 0) return null;

  return (
    <Link to="/sepet">
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl transition-all z-40 group"
        aria-label="Sepete Git"
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-[10px] font-bold"
          >
            {itemCount}
          </Badge>
        </div>
      </Button>
    </Link>
  );
}
