// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 4321,
    host: true,
    strictPort: true // Không tự đổi sang port khác
  },
  vite: {
    define: {
      global: 'globalThis' // Fix một số package Node cần "global"
    }
  }
});
