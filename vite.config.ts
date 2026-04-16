import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "@radix-ui/react-primitive", "@radix-ui/react-compose-refs"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — always first to load
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react/jsx-runtime")) {
            return "vendor-react";
          }
          // React Router
          if (id.includes("node_modules/react-router")) {
            return "vendor-router";
          }
          // Tanstack Query
          if (id.includes("node_modules/@tanstack/")) {
            return "vendor-query";
          }
          // Radix UI — group all primitives together
          if (id.includes("node_modules/@radix-ui/")) {
            return "vendor-radix";
          }
          // Framer Motion
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-framer";
          }
          // Supabase
          if (id.includes("node_modules/@supabase/")) {
            return "vendor-supabase";
          }
          // Recharts + d3
          if (id.includes("node_modules/recharts") || id.includes("node_modules/d3-") || id.includes("node_modules/victory-")) {
            return "vendor-charts";
          }
          // Leaflet / react-leaflet
          if (id.includes("node_modules/leaflet") || id.includes("node_modules/react-leaflet")) {
            return "vendor-maps";
          }
          // Everything else from node_modules goes into a single vendor chunk
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
          // Admin pages — separate chunk (rarely visited by users)
          if (id.includes("/src/pages/admin/")) {
            return "pages-admin";
          }
          // Blog pages
          if (id.includes("/src/pages/blog/") || id.includes("/src/pages/BlogPage") || id.includes("/src/pages/BlogPostPage")) {
            return "pages-blog";
          }
          // Landing pages
          if (id.includes("/src/pages/landings/")) {
            return "pages-landings";
          }
        },
      },
    },
  },
}));
