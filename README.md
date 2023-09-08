# online_charts

## 功能

* 保存进度
* 多个绘图
* 保存图片

## 技术栈

* vue3
* echarts
* element-plus
* pinia

## 问题解决方法

1. 画布尺寸选为固定，使用css的scale函数完成不同屏幕的匹配

## notes

获取曲线颜色：`chartInstance.getVisual({ seriesIndex: 1 }, 'color');`

## TODO

* 防抖
* 登录框美化
* Dialog美化
* 离开页面前保存数据
* edge缩放比例问题
* token过期问题
* 数据批量插入
* 处理404和没有的router path
* 处理echarts解析错误
* latex支持
* 字体大小等用相对尺寸，跟着图片分辨率一起调整
* 写个按钮换算字体大小等相对关系

## ref

[编写vite插件](https://juejin.cn/post/7075678169122439181)
