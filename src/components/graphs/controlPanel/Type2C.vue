<template>
  <el-collapse accordion v-if="curGraph" v-model="activeData">
    <TitleStyle name="title" :cur-graph="curGraph"></TitleStyle>
    <GraphArea name="graphArea" :cur-graph="curGraph"></GraphArea>
    <Legend name="legend" :cur-graph="curGraph"></Legend>
  </el-collapse>
</template>

<script setup>
import TitleStyle from '@/components/graphs/controlItems/TitleStyle.vue';
import GraphArea from '@/components/graphs/controlItems/GraphArea.vue';
import Legend from '@/components/graphs/controlItems/Legend.vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph: curGraph } = storeToRefs(graphStore);

const activeData = ref('title');
</script>

<style lang="less" scoped></style>
