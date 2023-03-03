import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          id: 1,
          type: 'line',
          data: [
            [1, 3],
            [2, 2],
            [3, 5],
            [4, 2.5],
          ],
        },
        {
          id: 2,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 3,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 4,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 5,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 6,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 7,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 8,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 9,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 10,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 11,
          type: 'line',
          data: [
            [0, 10],
            [2, 2],
            [6, 8],
            [8, 2.5],
          ],
        },
        {
          id: 12,
          type: 'line',
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
