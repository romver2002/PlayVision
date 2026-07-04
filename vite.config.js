import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// Сайт публикуется на GitHub Pages в подпапку /PlayVision/,
// поэтому в продакшен-сборке все ссылки должны начинаться с этого префикса.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/PlayVision/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Миксины доступны во всех компонентах без явного @use.
        additionalData: '@use "@/assets/styles/mixins" as *;\n',
      },
    },
  },
  server: {
    port: 3000,
  },
}));
