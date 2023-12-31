<template>
  <div v-loading="isLoading" class="con">
    <section class="graph__drawing_area" ref="drawAreaCon">
      <div ref="drawArea"></div>
    </section>
    <GraphControlVue class="graph-control" />
  </div>
</template>

<script setup>
// 此组件接收graph属性
import GraphControlVue from '@/components/graphs/GraphControl.vue';
import * as echarts from 'echarts';
import { onMounted, toRefs, ref, provide } from 'vue';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
import useChartRef from '@/composables/chart.js';
const { setChart } = useChartRef();

const props = defineProps(['isLoading']);
const { isLoading } = toRefs(props);

const drawArea = ref();
const drawAreaCon = ref();
let chartRef = ref({}); // 这个用来provide给ColorSwitcher
let chartInstance;

onMounted(() => {
  chartInstance = echarts.init(drawArea.value);
  chartRef.value = chartInstance; // HACK
  initChart();
  window.onresize = () => {
    chartInstance.resize();
    scaling();
  };
  setChart(chartRef);

  graphStore.$subscribe((mutate, _) => {
    if (!graphStore.graphGetter) return;
    initChart();
  });
});

provide('drawAreaCon', drawAreaCon);

// 初始化新图形
function initChart() {
  scaling(); // 缩放显示
  setPicSize(); // 设定尺寸
  chartInstance.setOption(graphStore.graphGetter, true); // 第二个参数表示不合并opts，直接创建新组件
}

// 按原图设定尺寸
function setPicSize() {
  const h = graphStore.divHeightGetter;
  const w = h * graphStore.w2hRatioGetter;
  drawArea.value.style.width = w + 'px';
  drawArea.value.style.height = h + 'px';
  chartInstance.resize();
}

// 原图尺寸高于显示尺寸，则进行缩放
function scaling() {
  const picHeight = graphStore.divHeightGetter;
  const w2hRatio = graphStore.w2hRatioGetter;
  const picWidth = picHeight * w2hRatio;

  const w = drawAreaCon.value.offsetWidth - 15; // 注意减掉border尺寸
  const h = drawAreaCon.value.offsetHeight - 15;
  const w2hRatioWindow = w / h;
  let scaleRatio;
  if (w2hRatioWindow < w2hRatio) {
    scaleRatio = w / picWidth;
  } else {
    scaleRatio = h / picHeight;
  }
  if (scaleRatio > 1) scaleRatio = 1;
  drawArea.value.style.transform = `scale(${scaleRatio})`;
}
</script>

<style lang="less" scoped>
.con {
  display: flex;
  height: 100%;
  box-sizing: border-box;

  .graph__drawing_area {
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    flex: 1 1 65%;

    // 使内部chartRef居中
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      box-shadow: var(--el-box-shadow-light);
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
  .graph-control {
    box-sizing: border-box;
    flex: 1 1 35%;
    max-width: 600px;
    // overflow: hidden;
  }
}
</style>
