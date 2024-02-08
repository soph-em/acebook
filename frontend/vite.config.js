import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/frontend/", // Specify your nested public path here
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
});
