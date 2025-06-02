import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from '@vitejs/plugin-react'


const viteConfig = defineViteConfig({
  plugins: [react(), tsconfigPaths()],
});

const vitestConfig = defineVitestConfig({
  plugins: [],
  test: {
    globals: true,
    environment: "jsdom",
    watch: false,
    setupFiles: ['src/setupTest.ts', 'src/mocks/server', 'src/mocks/mockNavigate'],
  },

});

export default mergeConfig(viteConfig, vitestConfig);