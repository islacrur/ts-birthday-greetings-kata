import { defineConfig } from "vitest/config";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
  },
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "./src/core/domain"),
      "@infrastructure": path.resolve(__dirname, "./src/core/infrastructure"),
      "@services": path.resolve(__dirname, "./src/core/services"),
    },
  },
});
