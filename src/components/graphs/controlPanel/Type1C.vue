<!-- 建立风琴抽屉，进行二级归类 -->
<template>
  <el-scrollbar>
    <el-collapse accordion v-if="curGraph" v-model="activeData">
      <TitleStyle name="title" :cur-graph="curGraph"></TitleStyle>
      <GraphArea name="graphArea" :cur-graph="curGraph"></GraphArea>
      <Legend name="legend" :cur-graph="curGraph"></Legend>
      <AxisVal name="xAxis" axis-title="X轴" :axis="curGraph.xAxis"></AxisVal>
      <AxisVal name="yAxis" axis-title="Y轴" :axis="curGraph.yAxis"></AxisVal>
      <AuxLine name="xAuxLine" axis-title="X方向" :axis="curGraph.xAxis"></AuxLine>
      <AuxLine name="yAuxLine" axis-title="Y方向" :axis="curGraph.yAxis"></AuxLine>
    </el-collapse>
  </el-scrollbar>
</template>

<script setup>
import TitleStyle from '@/components/graphs/controlItems/TitleStyle.vue';
import GraphArea from '@/components/graphs/controlItems/GraphArea.vue';
import Legend from '@/components/graphs/controlItems/Legend.vue';
import AxisVal from '@/components/graphs/controlItems/AxisVal.vue';
import AuxLine from '@/components/graphs/controlItems/AuxLine.vue';
import { inject, computed, toRefs, ref, watch, nextTick } from 'vue';
const props = defineProps(['graph']);
const { graph: curGraph } = toRefs(props);
console.log(curGraph.value);

const activeData = ref('xAuxLine');
</script>

<style lang="less" scoped>
</style>
