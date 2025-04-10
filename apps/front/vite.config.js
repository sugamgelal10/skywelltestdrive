import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { resolve } from "node:path";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      TanStackRouterVite({ autoCodeSplitting: true }),
      viteReact(),
      tailwindcss(),
    ],
    test: {
      globals: true,
      environment: "jsdom",
    },
    define: {
      "process.env": env,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    preview: {
      host: "0.0.0.0",
      port: 4173,
      allowedHosts: ["skywelltestdrive.kcanjan.com.np"],
    },
  };
});
