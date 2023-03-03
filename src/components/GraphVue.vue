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
import { storeConf } from '../store/config.js';
import { storeToRefs } from 'pinia';
const { params } = useRoute();
const route = useRoute();
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const storeC = storeConf();
const { graphTypes } = storeToRefs(storeC);

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
  // 引入配置
  myChart.setOption(graphTypes.value[0].defaultOpts);
  // 引入数据，echarts会自动进行合并
  myChart.setOption({
    series: [
      {
        data: [
          [1, 2],
          [2, 2],
          [3, 0.5],
          [4, 2],
        ],
      },
      {
        data: [
          [0.5, 2],
          [3, 2],
          [5, 1],
          [7, 2],
        ],
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
