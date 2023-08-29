// 双数值折线图
export default class Type1 {
  constructor(uuid, name) {
    this.template = {
      $extra: {
        uuid,
        graphTypeId: 1,
        divHeight: 800,
        w2hRatio: 1.33,
      },
      // 数据
      series: [],
      // 标题
      title: {
        show: true,
        text: name,
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
        show: false,
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
      xAxis: {
        name: 'x轴标题',
        nameLocation: 'middle',
        nameTextStyle: {
          color: '#000',
          fontStyle: 'normal',
          fontFamily: 'times new roman',
          fontSize: 18,
          fontWeight: 'normal',
          align: 'center',
          lineHeight: 20,
          padding: 10,
          rich: {},
        },
        min: function (val) {
          return Math.floor(val.min);
        },
        max: function (val) {
          return Math.ceil(val.max);
        },
        type: 'value',
        position: 'bottom',
        axisLine: {
          show: true,
          // onZero: false,
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
          symbolOffset: [0, 16],
        },
        // 刻度
        axisTick: {
          show: true,
          inside: true,
          length: 6,
          lineStyle: {
            width: 1.5,
            cap: 'butt',
            color: '#666',
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
            color: '#e9e9e9',
            width: 1,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ccc',
            width: 1,
          },
        },
        splitArea: {
          show: false,
        },
        // boundaryGap: ['0%', '0%'], //相当于坐标边界距离数据极值的距离
      },
      yAxis: {
        name: 'y轴标题',
        nameLocation: 'middle',
        nameTextStyle: {
          color: '#000',
          fontStyle: 'normal',
          fontFamily: 'times new roman',
          fontSize: 18,
          fontWeight: 'normal',
          align: 'center',
          lineHeight: 20,
          padding: 10,
          // 富文本
          rich: {},
        },
        min: function (val) {
          return Math.floor(val.min);
        },
        max: function (val) {
          return Math.ceil(val.max);
        },
        type: 'value',
        position: 'bottom',
        axisLine: {
          show: true,
          // onZero: false,
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
          symbolOffset: [0, 16],
        },
        // 刻度
        axisTick: {
          show: true,
          inside: true,
          length: 6,
          lineStyle: {
            width: 1.5,
            cap: 'butt',
            color: '#666',
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
            color: '#e9e9e9',
            width: 1,
          },
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#ccc',
            width: 1,
          },
        },
        splitArea: {
          show: false,
        },
        // boundaryGap: ['0%', '0%'], //相当于坐标边界距离数据极值的距离
      },
      animation: false,
    };
  }
}
