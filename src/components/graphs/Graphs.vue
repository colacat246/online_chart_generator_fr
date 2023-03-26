<template>
  <div class="graphs_con">
    <AsideVue
      class="aside"
      :graphs="storeD.graphs"
      @select-graph="handleSelectGraph"
    ></AsideVue>
    <!-- TODO 处理空值 -->
    <GraphVue :graph="graph" v-if="graph" />
    <div v-else>待添加图形</div>
  </div>
</template>

<script setup>
import AsideVue from '@/components/graphs/Aside.vue';
import GraphVue from '@/components/graphs/Graph.vue';
import { ref } from 'vue';
import { storeData } from '@/store/data';

const storeD = storeData();
const graph = ref(storeD.graphs[0]);

function handleSelectGraph(uuid) {
  if (!uuid) {
    graph.value = null;
    return;
  }
  const newGraph = storeD.graphs.find((i) => i.$extra.uuid === uuid);
  graph.value = newGraph;
}
</script>

<style lang="less" scoped>
.graphs_con {
  position: relative;
  height: calc(100vh - @header-height);
  width: 100vw;
  display: grid;
  grid-template-columns: @aside-width calc(100vw - @aside-width);
}
</style>
