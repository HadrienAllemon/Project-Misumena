import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "models": path.resolve(__dirname, "./src/models"),
      "shared": path.resolve(__dirname, "../shared"),
      "assets": path.resolve(__dirname, "./assets")
    },
  },
  build: {
    outDir: "./build", // Specify the output directory for the production build, matching CRA's default output directory
    rollupOptions:{
      external: "shared"
    }
  },
  server: {
    port: 3000, // Specify the port on which the development server will run
  },
})
