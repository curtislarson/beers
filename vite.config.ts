import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [react(), tsconfigPaths()],
  root: "./packages/www",
  build: {
    outDir: "../../dist",
    sourcemap: true,
    manifest: true,
    emptyOutDir: true,
  },
  server: {
    port: 8999,
    open: true,
  },
});
