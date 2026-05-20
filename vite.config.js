import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss(),
  ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        }
    },
    server: {
        proxy: {
            "/xkcd": {
                target: "https://xkcd.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/xkcd/, ""),
            },
        },
    },
})
