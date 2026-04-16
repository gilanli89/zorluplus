import { motion } from "framer-motion";

export default function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-label="Yükleniyor...">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Orbital spinner */}
        <div className="relative w-12 h-12" aria-hidden="true">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-1 rounded-full border-2 border-transparent border-b-accent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Yükleniyor...
        </motion.p>
      </motion.div>
    </div>
  );
}
