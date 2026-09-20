import { defineConfig } from "vitest/config";

export default defineConfig({
  // Next.js 전용 postcss.config.mjs(Tailwind 4)를 vite가 읽지 않도록 비활성화
  css: { postcss: { plugins: [] } },
  test: {
    include: ["src/**/*.test.ts"],
    environment: "node",
  },
});
