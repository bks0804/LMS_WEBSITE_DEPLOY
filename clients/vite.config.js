import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", // adjust backend port
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // optional, keeps /api
      },
      middlewareMode: false,
      setupMiddlewares(middlewares) {
        middlewares.push(
          history({
            disableDotRule: true, // 👈 same as vite-plugin-rewrite-all
          })
        );
        return middlewares;
      },
    },
  },
});
