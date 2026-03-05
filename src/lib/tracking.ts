// Centralized conversion tracking utilities

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    ym?: (counterId: number, method: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

const YM_COUNTER_ID = 106295459;

export function trackWhatsAppClick(source?: string) {
  // Google Analytics 4 via GTM dataLayer
  window.dataLayer?.push({
    event: "whatsapp_click",
    whatsapp_source: source || "unknown",
  });

  // Yandex Metrica reachGoal
  window.ym?.(YM_COUNTER_ID, "reachGoal", "whatsapp_click", {
    source: source || "unknown",
  });
}
