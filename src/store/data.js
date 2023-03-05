import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          id: 'a1',
          graphTypeId: 1,
          name: 'line1',
          data: [
            {
              id: 'l1',
              name: 'line 1~~~',
              dataSet: [
                [1, 2, 3, 4],
                [3, 2, 5, 3],
              ],
            },
            {
              id: 'l2',
              name: 'myLine 2',
              dataSet: [
                [0.5, 2, 3.5, 4],
                [8, 2, 0.5, 5],
              ],
            },
          ],
        },
        {
          id: 'b2',
          name: 'bar1',
          graphTypeId: 2,
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
      ],
    };
  },
});
