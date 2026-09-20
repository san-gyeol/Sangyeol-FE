import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    // tsconfig.json의 paths와 동일한 별칭을 테스트에서도 해석한다
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@model": path.resolve(__dirname, "./src/model"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
