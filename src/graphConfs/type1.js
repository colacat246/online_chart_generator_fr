// 双数值折线图
export default class Type1 {
  constructor(uuid, name) {
    this.template = {
      $extra: {
        uuid,
        name,
        graphTypeId: 1,
      },
      // type: 'line', // FINDOUT 好像只需要在series里定义
      // 数据
      series: [],
      // 标题
      title: {
        show: true,
        text: name,
        textStyle: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'normal',
        },
        // borderWidth: undefined,
        // borderRadius: undefined,
        // borderColor: undefined,
        // textAligh: undefined,
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
        // padding: 25,
        top: 22,
        right: 22,
        // itemStyle: {},
        // data: ['data1', 'data2'],
      },
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
    };
  }
}
