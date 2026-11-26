import { defineConfig } from "cf/config";

export default defineConfig({
  worker: {
    "name": "eligible-site",
    "compatibilityDate": "2026-09-21",
    "observability": {
      "enabled": true
    }
  }
});
