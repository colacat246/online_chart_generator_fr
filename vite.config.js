import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import storeDataReloadPlugin from './.vite/plugins/storeDataReloadPlugin';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    storeDataReloadPlugin(), // pinia数据模板更新时自动刷新页面
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
