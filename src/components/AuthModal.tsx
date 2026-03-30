import { lovable } from "@/integrations/lovable/index";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Chrome, Apple, UserRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGuestContinue?: () => void;
}

export default function AuthModal({ open, onOpenChange, onGuestContinue }: AuthModalProps) {
  const { lang } = useLanguage();
  const { user } = useAuth();

  const t = {
    title: lang === "tr" ? "Hos Geldiniz" : "Welcome",
    subtitle:
      lang === "tr"
        ? "Hizli ve guvenli giris yapin"
        : "Sign in quickly and securely",
    google: lang === "tr" ? "Google ile Giris Yap" : "Sign in with Google",
    apple: lang === "tr" ? "Apple ile Giris Yap" : "Sign in with Apple",
    guest:
      lang === "tr" ? "Misafir Olarak Devam Et" : "Continue as Guest",
    or: lang === "tr" ? "veya" : "or",
  };

  const handleGoogleSignIn = async () => {
    await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
  };

  const handleAppleSignIn = async () => {
    await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
  };

  const handleGuestContinue = () => {
    onGuestContinue?.();
    onOpenChange(false);
  };

  // If user is already signed in, don't show modal
  if (user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 border-0 bg-transparent shadow-none">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl bg-background/80 backdrop-blur-xl border border-border/30 shadow-2xl"
            >
              {/* Decorative gradient blob */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-destructive/20 to-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-8 flex flex-col items-center gap-6">
                {/* Logo / brand area */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <span className="text-primary-foreground font-bold text-xl">Z+</span>
                </div>

                <div className="text-center space-y-1">
                  <DialogTitle className="text-2xl font-bold text-foreground">
                    {t.title}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {t.subtitle}
                  </DialogDescription>
                </div>

                {/* Sign-in buttons */}
                <div className="w-full flex flex-col gap-3">
                  {/* Google button */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:shadow-md hover:border-border/80 active:scale-[0.98]"
                  >
                    <Chrome className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    {t.google}
                  </button>

                  {/* Apple button */}
                  <button
                    onClick={handleAppleSignIn}
                    className="group relative flex w-full items-center justify-center gap-3 rounded-xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background shadow-sm transition-all hover:bg-foreground/90 hover:shadow-md active:scale-[0.98]"
                  >
                    <Apple className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    {t.apple}
                  </button>
                </div>

                {/* Divider */}
                <div className="flex w-full items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t.or}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* Guest button */}
                <button
                  onClick={handleGuestContinue}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 px-5 py-3.5 text-sm font-semibold text-muted-foreground transition-all hover:border-muted-foreground/50 hover:text-foreground active:scale-[0.98]"
                >
                  <UserRound className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  {t.guest}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
