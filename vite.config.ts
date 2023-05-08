import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Moskeyto",
  version: "1.0.0",
  description: "A simple key shortcut extention",
  permissions: ["storage", "tabs", "bookmarks"],
  host_permissions: ["*://*/*"],
  action: {
    default_popup: "index.html",
  },
  background: { service_worker: "src/background/index.ts" },
  content_scripts: [
  ],
  commands: {
    _execute_action: {
      suggested_key: {
        default: "Alt+M",
      },
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
