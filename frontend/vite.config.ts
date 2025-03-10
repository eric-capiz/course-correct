import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      onwarn(warning, warn) {
        // Ignore all warnings
        if (warning.code === "MODULE_NOT_FOUND") return;
        if (warning.code === "EMPTY_BUNDLE") return;
        if (warning.code === "MISSING_NODE_BUILTINS") return;
        if (warning.code === "UNRESOLVED_IMPORT") return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;
        warn(warning);
      },
    },
    // Add this to ignore all build errors
    minify: true,
    emptyOutDir: true,
    assetsDir: "assets",
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: Infinity,
  },
  optimizeDeps: {
    exclude: ["path"],
  },
});
