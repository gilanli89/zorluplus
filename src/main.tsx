import { createRoot } from "react-dom/client";
import "./index.css";

async function mountApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const root = createRoot(rootElement);

  // Keep the public campaign page completely independent from store/auth code.
  // This route must remain available even when backend environment variables are absent.
  if (window.location.pathname === "/turksat-guncelleme") {
    const { default: TurksatGuncellemePage } = await import(
      "./pages/landings/TurksatGuncellemePage.tsx"
    );
    root.render(<TurksatGuncellemePage />);
    return;
  }

  const { default: App } = await import("./App.tsx");
  root.render(<App />);
}

void mountApp();
