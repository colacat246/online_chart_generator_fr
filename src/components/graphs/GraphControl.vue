<template>
  <section class="graph-control-con">
    <el-menu
      :ellipsis="false"
      default-active="1"
      class="el-menu-graph-control"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="panelType = 'data'">数据区</el-menu-item>
      <el-menu-item index="2" @click="panelType = 'conf'">背景区</el-menu-item>
    </el-menu>
    <el-scrollbar class="control-comp">
      <component
        :is="panels[panelType][graph.$extra.graphTypeId]"
        :graph="graph"
      />
    </el-scrollbar>
  </section>
</template>

<script setup>
import { toRefs, ref } from 'vue';
import {
  Type1C,
  Type1D,
  Type2C,
  Type2D,
} from '@/components/graphs/controlPanel';
const props = defineProps(['graph']);
const { graph } = toRefs(props);
const panelType = ref('data');
const panels = {
  data: {
    1: Type1D,
    2: Type2D,
  },
  conf: {
    1: Type1C,
    2: Type2C,
  },
};
</script>

<style lang="less" scoped>
.graph-control-con {
  border-left: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .el-menu-graph-control {
    flex: 0;
    li {
      flex: 1;
    }
  }
  .control-comp {
    max-height: 100%;
  }
}
</style>
