import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          $extra: {
            uuid: 'fbb02f03-6657-4040-972e-9d4443eae9cc',
            name: 'line1',
            graphTypeId: 1,
          },
          type: 'line',
          // newAdd
          title: {
            show: true,
            text: 'data1',
            textStyle: {
              color: '#000',
              fontWeight: 'bold',
              fontSize: 18,
            },
            // borderWidth: 2,
            // textAligh: 'left',
            left: 'center',
            top: 23,
          },
          grid: {
            // show: true,
            left: '18%',
            top: '15%',
            // right: '50%',
            // bottom: 70,
            // containLabel: true,
            // backgroundColor: '#ccc',
            borderWidth: 1.5,
            borderColor: '#666',
          },
          height: '70%',
          width: '70%',
          legend: {
            show: true,
            orient: 'horizontal',
            top: 22,
            right: 22,
            // itemStyle: {},
            // data: ['data1', 'data2'],
          },
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
          $extra: {
            uuid: 'b7e25892-214b-4422-98ad-8cecbb158e73',
            name: 'bar1',
            graphTypeId: 2,
          },
          type: 'bar',
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
