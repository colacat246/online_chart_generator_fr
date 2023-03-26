<!-- 建立风琴抽屉，进行二级归类 -->
<template>
  <el-scrollbar>
    <el-collapse accordion v-if="curGraph" v-model="activeData">
      <TitleStyle name="title" :cur-graph="curGraph"></TitleStyle>
      <GraphArea name="graphArea" :cur-graph="curGraph"></GraphArea>
      <Legend name="legend" :cur-graph="curGraph"></Legend>
    </el-collapse>
  </el-scrollbar>
</template>

<script setup>
import TitleStyle from '@/components/graphs/controlItems/TitleStyle.vue';
import GraphArea from '@/components/graphs/controlItems/GraphArea.vue';
import Legend from '@/components/graphs/controlItems/Legend.vue';
import { inject, computed, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { storeData } from '@/store/data.js';
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
const { currentRoute } = useRouter();
// 图表Id
const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});
const curGraph = computed(() => {
  return graphs.value.find((i) => i.id === curGraphId.value);
});
const activeData = ref('legend');
</script>

<style lang="less" scoped>
</style>
