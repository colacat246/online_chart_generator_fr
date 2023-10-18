<template>
  <el-collapse accordion v-if="curGraph" v-model="activeData">
    <TitleStyle name="title" :cur-graph="curGraph"></TitleStyle>
    <Legend name="legend" :cur-graph="curGraph"></Legend>
    <PieChart name="graphArea" :cur-graph="curGraph"></PieChart>
  </el-collapse>
</template>

<script setup>
import TitleStyle from '@/components/graphs/controlItems/TitleStyle.vue';
import PieChart from '@/components/graphs/controlItems/PieChart.vue';
import Legend from '@/components/graphs/controlItems/Legend.vue';

import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph: curGraph } = storeToRefs(graphStore);

const activeData = ref('title');
</script>

<style lang="less" scoped></style>
