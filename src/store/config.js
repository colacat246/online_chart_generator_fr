import { defineStore } from 'pinia';

import confLine from '../graphConfs/line.js';
import confBar from '../graphConfs/bar.js';

export const storeConf = defineStore('store_conf', {
  state: () => {
    return {
      graphTypes: [
        { graphTypeId: 1, type: '折线图', defaultOpts: confLine },
        { graphTypeId: 2, type: '柱状图', defaultOpts: confBar },
      ],
    };
  },
});
