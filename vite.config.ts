import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom'
  },
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
