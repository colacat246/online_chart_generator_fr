import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          id: 'a1',
          graphTypeId: 1,
          type: 'line',
          name: 'line1',
          series: [
            {
              id: '11',
              type: 'line',
              name: 'line 1~~~',
              data: [
                [1, 3],
                [2, 6],
                [4, 19],
                [6, 1],
              ],
              color: undefined,
              symbol: 'none',
              symbolSize: 17,
              lineStyle: {
                width: 1.5,
                type: 'solid',
              },
              smooth: 0,
            },
            {
              id: '12',
              type: 'line',
              name: 'myLine 2',
              data: [
                [2, 4],
                [5, 2],
                [6, 11],
                [7, 4],
              ],
              color: undefined,
              symbol: 'none',
              symbolSize: 7,
              lineStyle: {
                width: 1.5,
                type: 'solid',
              },
              smooth: 0,
            },
          ],
        },
        {
          id: 'b2',
          name: 'bar1',
          graphTypeId: 2,
          series: [
            {
              data: [
                [0, 10],
                [2, 2],
                [6, 8],
                [8, 2.5],
              ],
            },
          ],
        },
      ],
    };
  },
});
