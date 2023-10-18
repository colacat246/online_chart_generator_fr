import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import storeDataReloadPlugin from './.vite/plugins/storeDataReloadPlugin';
import path from 'path';
import fs from 'fs';

const opts = {
  key: fs.readFileSync('./certs/key.pem'),
  cert: fs.readFileSync('./certs/cert.pem'),
};

export default defineConfig({
  server: {
    // https: opts,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/)
      }
    }
  },
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
