<template>
  <div class="graph__area__con">
    <section>
      第一个数据：{{ graphs[0].series[0].data }} 第二个数据：{{
        graphs[0].series[1].data
      }}
      <div ref="drawArea" class="graph__drawing_area"></div>
    </section>
    <GraphControlVue />
  </div>
</template>

//BUG 全部图形删除后组件不销毁
<script setup>
import GraphControlVue from './GraphControlVue.vue';
import * as echarts from 'echarts';
import { onMounted, watch, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeData } from '../store/data.js';
import { storeConf } from '../store/config.js';
import { storeToRefs } from 'pinia';
let { params } = useRoute();
const { currentRoute } = useRouter();
const route = useRoute();
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const storeC = storeConf();
const { graphTypes } = storeToRefs(storeC);

const drawArea = ref();
let chart;

const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});

let curGraphIdx = ref(graphs.value.findIndex((i) => i.id === curGraphId.value));
watch(
  // BUG 监控两个变量导致删除图片时出错
  [curGraphId, storeD], // 发生增加或删除时同步更新数组位置
  () => {
    curGraphIdx.value = graphs.value.findIndex(
      (i) => i.id === curGraphId.value
    );
    initChart();
  }
);
onMounted(() => {
  chart = echarts.init(drawArea.value);
  initChart();
});

// 初始化新图形
const initChart = () => {
  // 引入配置
  console.log(curGraphIdx.value);
  const defaultOpts = graphTypes.value.find(
    (i) => i.graphTypeId === graphs.value[curGraphIdx.value].graphTypeId
  ).defaultOpts;
  chart.setOption(defaultOpts, true); // 第二个参数表示不合并opts，直接创建新组件

  // 引入数据，echarts会自动进行合并
  const series = graphs.value[curGraphIdx.value].series;
  chart.setOption({ series });
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
