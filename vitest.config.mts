import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

const staticImages: Plugin = {
  enforce: "pre",
  load(id) {
    if (/\.(webp|png|jpe?g)$/.test(id)) {
      return `export default { src: ${JSON.stringify(id)}, width: 1, height: 1, blurDataURL: "data:image/gif;base64,R0lGODlhAQABAAAAACw=" };`;
    }
  },
  name: "static-images",
};

export default defineConfig({
  plugins: [staticImages, react()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
