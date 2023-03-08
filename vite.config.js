import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import storeDataReloadPlugin from './.vite/plugins/storeDataReloadPlugin';

export default defineConfig({
  plugins: [vue(),
    storeDataReloadPlugin() // pinia数据模板更新时自动刷新页面
  ],
});
