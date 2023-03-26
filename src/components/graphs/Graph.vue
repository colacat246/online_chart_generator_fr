<template>
  <div class="graph__area__con">
    <section class="graph__drawing_area">
      <div ref="drawArea"></div>
      <section class="save_image_con">
        <el-button @click="handleSaveIamge">保存图片</el-button>
      </section>
    </section>
    <GraphControlVue :graph="graph" />
  </div>
</template>

<script setup>
// 此组件接收graph属性
import GraphControlVue from '@/components/graphs/GraphControl.vue';
import * as echarts from 'echarts';
import { onMounted, watch, ref, toRefs, provide, nextTick, markRaw } from 'vue';

const drawArea = ref();
let chartRef = ref({}); // 这个用来provide给ColorSwitcher
let chartInstance;
const props = defineProps(['graph']);
const { graph } = toRefs(props); // 把属性变成响应式

onMounted(() => {
  chartInstance = echarts.init(drawArea.value);
  chartRef.value = chartInstance; // HACK
  initChart();
  const observer = new MutationObserver(() => {
    nextTick(() => {
      chartInstance.resize();
    });
  });
  observer.observe(drawArea.value, { attributes: true });
});

watch(graph, () => initChart(), { deep: true });

provide('curChart', chartRef);
// 初始化新图形
function initChart() {
  chartInstance.setOption(graph.value, true); // 第二个参数表示不合并opts，直接创建新组件
}

// 保存图片
// TODO 改成选项框，选择像素、文件名等
const handleSaveIamge = () => {
  const url = chartRef.value.getDataURL({
    pixelRatio: 2,
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
    // overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: @graph-area-height;
    width: @drawing-area-width;
    box-sizing: border-box;
    & > div {
      border: 1px solid var(--el-border-color);
      // border: 1px solid #409eff;
      box-sizing: border-box;
      // box-shadow: ;
      resize: both;
      overflow: hidden;
      height: 80%;
      width: 80%;
      max-height: 85%;
      max-width: 100%;
    }

    .save_image_con {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
