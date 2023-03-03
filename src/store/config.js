import { defineStore } from 'pinia';

import conf1 from '../graphConfs/line.js';

export const storeConf = defineStore('store_conf', {
  state: () => {
    return {
      graphTypes: [{ id: 1, type: 'line', defaultOpts: conf1 }],
    };
  },
});
