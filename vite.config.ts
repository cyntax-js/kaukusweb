import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [react()],

  server: {
    proxy: {
      // Catch any request starting with /api
      "/api": {
        target: "http://www.cubegroup.io", // The real backend URL
        changeOrigin: true, // Required: tricks the backend into thinking the request came from cubegroup.io
        secure: false, // Use this if the backend uses self-signed HTTPS (optional)
        // If your backend path doesn't actually start with /api, rewrite it:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
