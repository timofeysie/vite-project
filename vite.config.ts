import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "app.js",
        assetFileNames: "styles.css",
        chunkFileNames: undefined,
      },
    },
  },
});
