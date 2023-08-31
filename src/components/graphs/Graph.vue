<template>
  <div class="graph__area__con">
    <section class="graph__drawing_area" ref="drawAreaCon">
      <div ref="drawArea"></div>
      <section class="save_image_con">
        <!-- TODO 把按钮挪到右下角，再加个保存数据的按钮 -->
        <el-button @click="handleSaveIamge">保存图片</el-button>
      </section>
    </section>
    <GraphControlVue class="graph-control" />
  </div>
</template>

<script setup>
// 此组件接收graph属性
import GraphControlVue from '@/components/graphs/GraphControl.vue';
import * as echarts from 'echarts';
import { onMounted, watch, ref, provide } from 'vue';
import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);

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
});

watch(
  graph,
  () => {
    initChart();
  },
  { deep: true }
);

provide('curChart', chartRef);

// 初始化新图形
function initChart() {
  scaling(); // 缩放显示
  setPicSize(); // 设定尺寸
  chartInstance.setOption(graph.value, true); // 第二个参数表示不合并opts，直接创建新组件
}

// 按原图设定尺寸
function setPicSize() {
  const h = graph.value.$extra.divHeight;
  const w = graph.value.$extra.divHeight * graph.value.$extra.w2hRatio;
  drawArea.value.style.width = w + 'px';
  drawArea.value.style.height = h + 'px';
  chartInstance.resize();
}

// 原图尺寸高于显示尺寸，则进行缩放
function scaling() {
  const picHeight = graph.value.$extra.divHeight;
  const w2hRatio = graph.value.$extra.w2hRatio;
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

// 保存图片
// TODO 改成选项框，选择像素、文件名等
const handleSaveIamge = () => {
  const url = chartRef.value.getDataURL({
    pixelRatio: 1,
    backgroundColor: '#fff',
  });
  const a = document.createElement('a');
  const evt = new MouseEvent('click');
  a.download = graph.value.title.text;
  a.href = url;
  a.dispatchEvent(evt);
};
</script>

<style lang="less" scoped>
@graph-area-height: calc(100vh - @header-height);
@drawing-area-width: calc(@graph-area-width - 400px);
.graph__area__con {
  height: @graph-area-height;
  width: @graph-area-width;
  display: grid;
  grid-template-columns: @drawing-area-width 400px;
  & > * {
    box-sizing: border-box;
  }

  .graph__drawing_area {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: @graph-area-height;
    width: @drawing-area-width;
    box-sizing: border-box;
    & > div {
      // border: 1px solid var(--el-border-color);
      box-shadow: var(--el-box-shadow-light);
      position: absolute;
      box-sizing: content-box;
      overflow: hidden;
      height: 100%;
      width: 100%;
    }

    .save_image_con {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
  .graph-control {
    max-height: 100%;
  }
}
</style>
