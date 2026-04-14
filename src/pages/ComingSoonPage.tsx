import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { BRANCHES } from "@/lib/constants";
import zorluLogo from "@/assets/zorlu-logo.png";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(221,83%,12%)] via-[hsl(221,83%,20%)] to-[hsl(221,60%,30%)]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Logo */}
        <motion.img
          src={zorluLogo}
          alt="Zorlu Digital Plaza"
          className="h-16 md:h-20 mx-auto mb-10 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        {/* Coming Soon text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            Çok Yakında
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
            Yeni dijital deneyimimiz üzerinde çalışıyoruz.<br className="hidden md:block" />
            Sizlere en iyi hizmeti sunmak için hazırlanıyoruz.
          </p>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="mt-12 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-4">
            Bize Ulaşın
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {BRANCHES.map((b) => (
              <a
                key={b.id}
                href={`tel:${b.phone}`}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/80 hover:bg-white/10 hover:text-white transition-all text-sm font-medium"
              >
                <PremiumIconInline icon={Phone} size={14} className="text-primary-foreground" />
                {b.name}: {b.phone}
              </a>
            ))}
          </div>
          <a
            href={BRANCHES[0]?.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors text-xs mt-2"
          >
            <PremiumIconInline icon={MapPin} size={12} className="text-white/50" />
            Mağazalarımızı ziyaret edin
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom branding */}
      <motion.div
        className="absolute bottom-6 text-center text-white/20 text-xs font-medium tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        © {new Date().getFullYear()} Zorlu Digital Plaza. Tüm hakları saklıdır.
      </motion.div>
    </div>
  );
}
