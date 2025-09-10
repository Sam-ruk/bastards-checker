import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // load .env vars

  return {
    plugins: [react()], // ✅ ensure React fast-refresh & JSX handling
    resolve: {
      alias: {
        "@": path.resolve(__dirname), // root-level alias
        components: path.resolve(__dirname, "components"), // optional extra alias
      },
    },
    define: {
      // ✅ safer access to env vars
      "process.env": {
        API_KEY: env.GEMINI_API_KEY,
        GEMINI_API_KEY: env.GEMINI_API_KEY,
      },
    },
  };
});
