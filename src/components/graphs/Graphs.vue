<template>
  <div class="graphs_con">
    <AsideVue
      class="aside"
      :graph-info-list="storeD.graphs.map((i) => i.$extra)"
      @select-graph="handleSelectGraph"
    ></AsideVue>
    <GraphVue :graph="graph" />
  </div>
</template>

<script setup>
import AsideVue from '@/components/Aside.vue';
import GraphVue from '@/components/graphs/Graph.vue';
import { ref, inject } from 'vue';
import { storeData } from '@/store/data';
const storeD = storeData();
const graph = ref(storeD.graphs[0]);

function handleSelectGraph(uuid) {
  const newGraph = storeD.graphs.find((i) => i.$extra.uuid === uuid);
  graph.value = newGraph;
}
</script>

<style lang="less" scoped>
.graphs_con {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 200px auto;
}
.aside {
  // grid-row: 1;
  // grid-column: 1;
  // height: 100%;
}
</style>
