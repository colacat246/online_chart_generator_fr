// 柱形图
export default class Type2 {
  constructor(uuid, name) {
    this.template = {
      $extra: {
        uuid,
        name,
        graphTypeId: 2,
      },
      animation: false, // 关闭/开启动画
      // animationDuration: 2000,
      // animationEasing: 'bounceOut', // 动画变化的线性
      // animationThreshold: 5, // 超过多少个元素后关闭动画
      // animationDuration: function(args) {
      // console.log(args);
      // return 1000 * args;
      // }, // 动画时长，可接收number(ms) 或回调函数，分别
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
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '语文',
          type: 'bar',
          barWidth: '30px',
          label: { show: true, rotate: 30, position: 'outside' },
          color: {
            // 线性渐变
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'gold' },
              { offset: 1, color: 'red' },
            ],
          },
        },
        {
          name: '数学',
          type: 'bar',
          barWidth: '30px',
          label: { show: true, rotate: 30, position: 'outside' },
          color: {
            // 径向渐变
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 1.5,
            colorStops: [
              { offset: 0, color: 'cyan' },
              { offset: 1, color: 'green' },
            ],
          },
        },
      ],
    };
  }
}
