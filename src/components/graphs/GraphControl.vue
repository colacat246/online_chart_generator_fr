<template>
  <section class="graph-control-con border-left">
    <el-menu
      :ellipsis="false"
      default-active="1"
      class="el-menu-graph-control"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="panelType = 'data'">数据区</el-menu-item>
      <el-menu-item index="2" @click="panelType = 'conf'">背景区</el-menu-item>
    </el-menu>
    <el-scrollbar>
      <component :is="panels[panelType][graph.$extra.graphTypeId]" />
    </el-scrollbar>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import {
  Type1C,
  Type1D,
  Type2C,
  Type2D,
  Type3C,
  Type3D,
} from '@/components/graphs/controlPanel';
import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);
const panelType = ref('data');
const panels = {
  data: {
    1: Type1D,
    2: Type2D,
    3: Type3D,
  },
  conf: {
    1: Type1C,
    2: Type2C,
    3: Type3C,
  },
};
</script>

<style lang="less" scoped>
.graph-control-con {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & > :first-child {
    flex: 0;
    li {
      flex: 1;
    }
  }
  & > :last-child {
    flex: 1 0 0;
  }
}
</style>
