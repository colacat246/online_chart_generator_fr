import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          id: 1,
          graphTypeId: 1,
          name: 'line1',
          data: [
            [1, 3],
            [2, 2],
            [3, 5],
            [4, 2.5],
          ],
        },
        {
          id: 2,
          name: 'bar1',
          graphTypeId: 2,
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 3,
          name: 'line2',
          graphTypeId: 1,
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 4,
          name: 'empty',
          graphTypeId: 1,
        },
        {
          id: 5,
          name: 'line3',
          graphTypeId: 1,
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
