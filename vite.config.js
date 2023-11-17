/// <reference types="vitest" />


import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5000 },
  test: {
    globals: true,
    environment: "jsdom",
    css: true,
    setupFiles: ["src/setupTests.js"],
  },
});
