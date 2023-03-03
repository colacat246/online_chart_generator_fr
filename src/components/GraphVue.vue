<template>
  <div>
    graph page
    {{ id }}
    <div ref="drawArea" class="graph__drawing_area"></div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { storeData } from '../store/data.js';
import { storeToRefs } from 'pinia';
const { params } = useRoute();
const route = useRoute();
const store = storeData();
const { graphs } = storeToRefs(store);

const drawArea = ref();
let dataObj;
onMounted(() => {
  dataObj = graphs.value.find((i) => i.id.toString() === id);
  draw();
});

// 拿到id
let id = params.id;
onBeforeRouteUpdate((to) => {
  id = to.params.id;
  dataObj = graphs.value.find((i) => i.id.toString() === id);
  draw();
});

// 绘图
const draw = () => {
  const myChart = echarts.init(drawArea.value);
  myChart.setOption({
    title: {
      text: 'ECharts 入门示例',
    },
    tooltip: {},
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销量',
        type: 'line',
        data: dataObj.data,
      },
    ],
  });
};
</script>

<style lang="less" scoped>
.graph__drawing_area {
  margin: 0 auto;
  width: 700px;
  height: 500px;
  border: 1px solid red;
}
</style>
