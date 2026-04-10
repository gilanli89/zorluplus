import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { logActivity } from "@/lib/activityLogger";

interface Props {
  isVisible: boolean;
  countdown: number;
  onExtend: () => void;
}

export default function IdleTimeoutWarning({ isVisible, countdown, onExtend }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible && countdown <= 0) {
      logActivity("idle_timeout_logout", "session").then(() => {
        supabase.auth.signOut().then(() => {
          navigate("/admin/giris", { replace: true });
        });
      });
    }
  }, [isVisible, countdown, navigate]);

  return (
    <Dialog open={isVisible}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Timer className="h-5 w-5" />
            Oturum Zaman Aşımı
          </DialogTitle>
          <DialogDescription>
            Uzun süredir aktivite algılanmadı. Güvenliğiniz için oturumunuz kapatılacak.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-6">
          <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-4 border-destructive/30">
            <span className="text-3xl font-bold text-destructive">{countdown}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            saniye içinde çıkış yapılacak
          </p>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="gap-2" onClick={() => {
            logActivity("idle_timeout_logout", "session");
            supabase.auth.signOut().then(() => navigate("/admin/giris", { replace: true }));
          }}>
            <LogOut className="h-4 w-4" /> Şimdi Çıkış Yap
          </Button>
          <Button onClick={onExtend} className="gap-2">
            Oturumu Uzat
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
