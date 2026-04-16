import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const IDLE_MS = 4 * 60 * 60 * 1000; // 4 hours
const MAX_SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours hard limit
const COUNTDOWN_SEC = 10;

export function useIdleTimeout(enabled = true) {
  const [isWarningVisible, setIsWarningVisible] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearAllTimers = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (countdownTimer.current) clearInterval(countdownTimer.current);
    idleTimer.current = null;
    countdownTimer.current = null;
  }, []);

  const startIdleTimer = useCallback(() => {
    if (!enabled) return;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setIsWarningVisible(true);
      setCountdown(COUNTDOWN_SEC);
    }, IDLE_MS);
  }, [enabled]);

  const resetTimer = useCallback(() => {
    clearAllTimers();
    setIsWarningVisible(false);
    setCountdown(COUNTDOWN_SEC);
    startIdleTimer();
  }, [clearAllTimers, startIdleTimer]);

  // Hard max session limit — force logout after 8h regardless of activity
  useEffect(() => {
    if (!enabled) return;
    const maxTimer = setTimeout(() => supabase.auth.signOut(), MAX_SESSION_MS);
    return () => clearTimeout(maxTimer);
  }, [enabled]);

  // Activity listeners
  useEffect(() => {
    if (!enabled) return;

    const onActivity = () => {
      // Only reset if warning is NOT visible
      if (!isWarningVisible) {
        if (idleTimer.current) clearTimeout(idleTimer.current);
        startIdleTimer();
      }
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    startIdleTimer();

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      clearAllTimers();
    };
  }, [enabled, isWarningVisible, startIdleTimer, clearAllTimers]);

  // Countdown when warning is visible
  useEffect(() => {
    if (!isWarningVisible) return;

    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownTimer.current) clearInterval(countdownTimer.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownTimer.current) clearInterval(countdownTimer.current);
    };
  }, [isWarningVisible]);

  return { isWarningVisible, countdown, resetTimer };
}
