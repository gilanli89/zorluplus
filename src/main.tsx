import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

function mountApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) return;

  const root = createRoot(rootElement);
  root.render(<App />);
}

mountApp();
