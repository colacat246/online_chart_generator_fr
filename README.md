# online_charts

## 功能

* 保存进度
* 多个绘图
* 保存图片

## 项目结构

* `store/data.js`保存用户数据
* `store/config.js`保存绘图配置映射
* `graphConfs`保存各模板默认配置

## 项目结构设计

数据存储：

* `store/data.js`存储所有图形数据
  * graphs中每个对象对应echarts的配置
    * 添加一项$extra属性，记录uuid，名称等自定义属性，
* `store/config.js`存储初始化新图形需要的配置

数据流动：

* 左边栏拿到`data.js`中的所有图形数据的索引
* 点击左边栏，将对应索引的数据注入到右侧绘图区中

右侧配置组件：

* 使用`<component>`加载对应的组件
* 右侧

通用组件：

* 绘图区
* 绘图配置区
* 配置抽屉
* 整行配置
* 半行配置

* 输入组件
* 数值选取组件
* 取色器组件
* 按钮组件
* 开关组件

## 问题解决方法

1. 画布尺寸选为固定，使用css的scale函数完成不同屏幕的匹配

## TODO

* 使用`uuid`组件生成uuid
* 处理404和没有的router path
* 新建图表的命名和改名
* latex支持
* 保存
* 调整高宽比

## ref

[编写vite插件](https://juejin.cn/post/7075678169122439181)
