import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import storeDataReloadPlugin from './.vite/plugins/storeDataReloadPlugin';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
    storeDataReloadPlugin(), // pinia数据模板更新时自动刷新页面
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/base.less')}";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
