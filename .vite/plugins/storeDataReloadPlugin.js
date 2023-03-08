import path from 'path';

// pinia数据模板更新时自动刷新页面
export default function storeDataReloadPlugin() {
  return {
    // 插件名称
    name: 'reload:storeData',

    handleHotUpdate(ctx) {
      const { file, server } = ctx;
      if (/src\/store$/.test(path.dirname(file)) || /src\/graphConfs$/.test(path.dirname(file))) {
        server.ws.send({
          type: 'full-reload',
        });
      }
    },
  };
}
