import { defineStore } from 'pinia';

export const storeData = defineStore('store_data', {
  state: () => {
    return {
      graphs: [
        {
          $extra: {
            uuid: 'fbb02f03-6657-4040-972e-9d4443eae9cc',
            graphTypeId: 1,
          },
          // type: 'line',
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
              $extra: {
                id: '11',
              },
              name: 'line 1~~~',
              type: 'line',
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
              $extra: {
                id: '12',
              },
              name: 'myLine 2',
              type: 'line',
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
          // TODO 待修改
          // toolbox: {
          //   show: true,
          //   orient: 'horizontal',
          //   itemSize: 20,
          //   itemGap: 10,
          //   bottom: 15,
          //   right: 15,
          //   feature: {
          //     saveAsImage: {
          //       type: 'png',
          //       pixelRatio: 5,
          //     },
          //     dataView: {},
          //     restore: {},
          //     dataZoom: {},
          //     magicType: {
          //       type: ['pie'],
          //     },
          //   },
          // },
          // tooltip: {
          //   trigger: 'item',
          //   triggerOn: 'click',
          //   formatter: (arg) => {
          //     return arg.name + ' ' + arg.value;
          //   },
          // },
          xAxis: {
            name: 'ws\n$aa$',
            nameLocation: 'middle',
            nameTextStyle: {
              color: '#000',
              fontStyle: 'normal',
              fontFamily: 'times new roman',
              fontSize: 18,
              align: 'center',
              lineHeight: 20,
              padding: 5,
              // TODO 富文本
              rich: {},
            },
            // 最小值
            min: function (val) {
              return Math.floor(val.min);
            },
            type: 'value',
            position: 'bottom',
            axisLine: {
              show: true,
              // onZero: true,
              // 线形
              lineStyle: {
                color: '#666',
                width: 1.5,
                type: 'solid',
                // type: [10, 5],
                // dashOffset: 5,
              },
              // 箭头
              symbol: ['none', 'none'],
              symbolSize: [7, 15],
              symbolOffset: 15,
            },
            // 刻度
            axisTick: {
              show: true,
              inside: true,
              length: 6,
              lineStyle: {
                width: 1.5,
                cap: 'butt',
              },
            },
            // 刻度密度
            splitNumber: 7,
            minorTick: {
              show: true,
              splitNumber: 5,
              length: 3,
              lineStyle: {
                color: '#666',
                width: 1.5,
              },
            },
            // 图中的分割线
            minorSplitLine: {
              show: false,
              lineStyle: {
                color: 'red',
                width: 1,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ccc',
              },
            },
            splitArea: {
              show: false,
            },
            boundaryGap: ['0%', '0%'],
          },
          yAxis: {
            type: 'value',
            name: 'response',
            nameLocation: 'middle',
            nameTextStyle: {
              color: '#000',
              fontStyle: 'normal',
              fontFamily: 'times new roman',
              fontSize: 18,
              align: 'center',
              lineHeight: 20,
              // nameGap: 200,
              padding: 40,
            },
            axisLine: {
              show: true,
              // 线形
              lineStyle: {
                color: '#666',
                width: 1.5,
                type: 'solid',
                // type: [10, 5],
                // dashOffset: 5,
              },
              // 箭头
              symbol: ['none', 'none'],
              symbolSize: [7, 15],
              symbolOffset: 15,
            },
            // 刻度
            axisTick: {
              show: true,
              inside: true,
              length: 6,
              lineStyle: {
                width: 1.5,
                cap: 'butt',
              },
            },
            // 刻度密度
            splitNumber: 5,
            minorTick: {
              show: true,
              splitNumber: 4,
              length: 3,
              lineStyle: {
                color: '#666',
                width: 1.5,
              },
            },
            // 图中的分割线
            minorSplitLine: {
              show: false,
              lineStyle: {
                color: 'red',
                width: 1,
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ccc',
              },
            },
            splitArea: {
              show: false,
            },
            boundaryGap: ['1%', '2%'],
            // scale: true, // 坐标轴从非0起始
          },
          animation: false,
          // series: [
          // {
          //   name: 'data1',
          //   type: 'line',
          //   lineStyle: { color: 'blue', type: 'solid' },
          //   symbol: 'rect',
          //   symbolSize: 5,
          // },
          // {
          //   name: 'data2',
          //   type: 'line',
          //   symbol: 'rect',
          //   symbolSize: 5,
          //   // markLine: {
          //   // data: [{ type: 'average', value: 'avg' }],
          //   // },
          //   // smooth: true,
          //   // 这样设置可以线和marker同色
          //   itemStyle: {
          //     normal: {
          //       // shadowColor: 'red',
          //       // shadowBlur: 2,
          //       color: 'orange',
          //     },
          //   },
          //   lineStyle: { type: 'solid' },
          //   // label: { show: true, rotate: 30, position: 'outside' },
          // },
          // ],
        },
        {
          $extra: {
            uuid: 'b7e25892-214b-4422-98ad-8cecbb158e73',
            graphTypeId: 2,
          },
          title: {
            text: 'bar'
          },
          series: [
            {
              type: 'bar',
              data: [
                [0, 10],
                [2, 2],
                [6, 8],
                [8, 2.5],
              ],
            },
          ],
          // TODO
          animation: false, // 关闭/开启动画
          // animationDuration: 2000,
          // animationEasing: 'bounceOut', // 动画变化的线性
          // animationThreshold: 5, // 超过多少个元素后关闭动画
          // animationDuration: function(args) {
          // console.log(args);
          // return 1000 * args;
          // }, // 动画时长，可接收number(ms) 或回调函数，分别
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'value',
          },
        },
      ],
    };
  },
});
