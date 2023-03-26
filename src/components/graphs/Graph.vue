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
import { onMounted, watch, ref, toRefs, provide } from 'vue';

const drawArea = ref();
let chartRef = ref();
const props = defineProps(['graph']);
const { graph } = toRefs(props); // 把属性变成响应式

onMounted(() => {
  chartRef.value = echarts.init(drawArea.value);
  initChart();
});

watch(graph, () => initChart(), { deep: true });

// 初始化新图形
function initChart() {
  chartRef.value.setOption(graph.value, true); // 第二个参数表示不合并opts，直接创建新组件
}
// OPTIMIZE 这里curGraph时引用对象，可以让control子组件从这里拿数据，不影响v-model数据更新，然后路由参数切换时，从而避免多个组件同时watch/compute路由参数，然后刷新
// BUG 点击图例时报错且toolbox会不正常缩放

provide('curChart', chartRef);

// 保存图片
const handleSaveIamge = () => {
  const url = chartRef.value.getDataURL({
    pixelRatio: 2,
    backgroundColor: '#fff',
  });
  const a = document.createElement('a');
  const evt = new MouseEvent('click');
  a.download = 'newFig';
  a.href = url;
  a.dispatchEvent(evt);
};
</script>

<style lang="less" scoped>
.graph__area__con {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 400px;
  grid-template-rows: 100%;
  & > * {
    box-sizing: border-box;
  }

  .graph__drawing_area {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    & > div {
      // border: 1px solid var(--el-border-color);
      // border: 1px solid #409eff;
      box-sizing: border-box;
      // box-shadow: ;
      height: 100%;
      width: 100%;
    }

    .save_image_con {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
