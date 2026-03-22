import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/contexts/CompareContext";

export default function CompareBar() {
  const { items, removeItem, clearAll, setIsOpen } = useCompare();

  if (items.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl"
      >
        <div className="rounded-2xl border border-border bg-card shadow-2xl p-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            {/* Product thumbnails */}
            <div className="flex gap-2 flex-1 overflow-x-auto scrollbar-hide">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="relative flex-shrink-0 w-14 h-14 rounded-xl border border-border bg-muted/50 overflow-hidden group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-1"
                  />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {/* Empty slots */}
              {Array.from({ length: Math.max(0, 2 - items.length) }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex-shrink-0 w-14 h-14 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center"
                >
                  <span className="text-xs text-muted-foreground">+</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-muted-foreground font-medium hidden sm:block">
                {items.length}/4
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={clearAll}
                title="Temizle"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                className="gap-1.5 rounded-full font-semibold"
                onClick={() => setIsOpen(true)}
                disabled={items.length < 2}
              >
                Karşılaştır
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
