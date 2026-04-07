import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { BRANCHES } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export default function StoreLocator() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-primary uppercase tracking-widest font-medium mb-2">Mağazalarımız</p>
          <h2 className="text-2xl font-bold text-foreground">Bizi Ziyaret Edin</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {BRANCHES.map((store, i) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-foreground mb-3">{store.name}</h3>

              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href={`tel:${store.phone}`} className="hover:text-primary transition-colors">
                    {store.phone}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>

              <a href={store.mapsLink} target="_blank" rel="noopener noreferrer">
                <Button size="sm" variant="outline" className="rounded-full gap-1.5 w-full">
                  <MapPin className="h-4 w-4" /> Yol Tarifi Al
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
