import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname),
        components: path.resolve(__dirname, "components"),
      },
    },
    define: {
      "process.env": {
        GEMINI_API_KEY: env.GEMINI_API_KEY,
      },
    },
  };
});
