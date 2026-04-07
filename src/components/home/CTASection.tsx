import { Link } from "react-router-dom";
import { Phone, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { BRAND } from "@/lib/constants";

export default function CTASection() {
  return (
    <section className="py-16 bg-foreground">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-background mb-3">
            Özel Fiyat Teklifi Alın
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Toplu alım, proje ve kurumsal siparişleriniz için size özel fiyat teklifi hazırlayalım.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/teklif-al"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FileText className="h-4 w-4" />
              Teklif Formu
            </Link>
            <a
              href={`https://wa.me/905488783131?text=${encodeURIComponent("Merhaba, fiyat teklifi almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              WhatsApp ile Ulaşın
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
