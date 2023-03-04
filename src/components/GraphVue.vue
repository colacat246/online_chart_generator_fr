<template>
  <div class="graph__area__con">
    <section>
      名称：{{ curGraph.name }} 路由参数：{{ params.id }}
      <div ref="drawArea" class="graph__drawing_area"></div>
    </section>
    <GraphControlVue />
  </div>
</template>

<script setup>
import GraphControlVue from './GraphControlVue.vue';
import * as echarts from 'echarts';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { storeData } from '../store/data.js';
import { storeConf } from '../store/config.js';
import { storeToRefs } from 'pinia';
let { params } = useRoute();
const route = useRoute();
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const storeC = storeConf();
const { graphTypes } = storeToRefs(storeC);

const drawArea = ref();
let chart;

let curGraph = graphs.value.find((i) => i.id.toString() === params.id);
curGraph = reactive(curGraph);

onMounted(() => {
  chart = echarts.init(drawArea.value);
  initChart();
});

onBeforeRouteUpdate((to) => {
  params = to.params;
  curGraph = graphs.value.find((i) => i.id.toString() === params.id);
  initChart();
});

// 初始化新图形
const initChart = () => {
  // 引入配置
  const defaultOpts = graphTypes.value.find(
    (i) => i.graphTypeId === curGraph.graphTypeId
  ).defaultOpts;
  chart.setOption(defaultOpts, true); // 第二个参数表示不合并opts，直接创建新组件
  // 引入数据，echarts会自动进行合并
  chart.setOption({
    series: [
      {
        data: curGraph.data,
      },
    ],
  });
};
</script>

<style lang="less" scoped>
.graph__area__con {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: 100%;
  // border: 1px solid gold;
  & > * {
    box-sizing: border-box;
  }
}
.graph__drawing_area {
  margin: 0 auto;
  width: 600px;
  height: 500px;
  border: 1px solid red;
}
</style>
