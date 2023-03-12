<template>
  <div class="graph__area__con">
    <section>
      <div>curGraphId: {{ curGraphId }}</div>
      <div ref="drawArea" class="graph__drawing_area"></div>
    </section>
    <GraphControlVue />
  </div>
</template>

<script setup>
import GraphControlVue from './GraphControlVue.vue';
import * as echarts from 'echarts';
import {
  getCurrentInstance,
  onMounted,
  watch,
  computed,
  ref,
  provide,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeData } from '../store/data.js';
import { storeConf } from '../store/config.js';
import { storeToRefs } from 'pinia';
let { params } = useRoute();
const { currentRoute } = useRouter();
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const storeC = storeConf();
const { graphTypes } = storeToRefs(storeC);
const drawArea = ref();
let chartRef = ref();;

// BUG 点击图例时报错且toolbox会不正常缩放

provide('curChart', chartRef);

// 图表Id
const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});
// 通过图表Id拿到当前图表对象
const curGraph = computed(() =>
  graphs.value.find((i) => i.id === curGraphId.value)
);

onMounted(() => {
  chartRef.value = echarts.init(drawArea.value);
  initChart();
});

watch(
  curGraph,
  (newVal, oldVal) => {
    if (!newVal) {
      return;
    }
    initChart();
  },
  { deep: true }
);

// 初始化新图形
const initChart = () => {
  // 引入配置
  const defaultOpts = graphTypes.value.find(
    (i) => i.graphTypeId === curGraph.value.graphTypeId
  ).defaultOpts;
  chartRef.value.setOption(defaultOpts, true); // 第二个参数表示不合并opts，直接创建新组件

  // 引入数据，echarts会自动进行合并
  const series = curGraph.value.series;
  chartRef.value.setOption({ series });
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
