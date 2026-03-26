import { useEffect } from "react";

declare global {
  interface Window {
    chatkit?: { destroy?: () => void };
  }
}

export default function AIChatbot() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://chatkit.co/widget.js";
    script.async = true;
    script.setAttribute("data-widget-id", "domain_pk_69c487b23da4819593935d95525d217b0fb3cf60a9c401c4");
    document.body.appendChild(script);

    return () => {
      script.remove();
      window.chatkit?.destroy?.();
    };
  }, []);

  return null;
}
