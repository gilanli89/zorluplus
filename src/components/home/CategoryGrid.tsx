import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Tv, Thermometer, Wind, Speaker, Plug, Snowflake,
  Refrigerator, CookingPot, WashingMachine, Droplets, ChefHat,
  Cable, Gamepad2, Zap,
} from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { useProducts } from "@/hooks/useProducts";
import { useMemo } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  Tv, Refrigerator, Thermometer, CookingPot, WashingMachine,
  Droplets, Wind, ChefHat, Plug, Speaker, Snowflake, Cable, Gamepad2, Zap,
};

export default function CategoryGrid() {
  const { data: products = [] } = useProducts();

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-8 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Kategoriler
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon || "Plug"] || Plug;
            const count = categoryCounts[cat.slug] || 0;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  to={`/kategori/${cat.slug}`}
                  className="group flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{cat.name}</p>
                    {count > 0 && (
                      <p className="text-xs text-muted-foreground mt-0.5">{count} ürün</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
