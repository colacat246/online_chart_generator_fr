<template>
  <section class="graph-control-con">
    <el-menu
      :ellipsis="false"
      default-active="1"
      class="el-menu-graph-control"
      mode="horizontal"
    >
      <el-menu-item index="1" @click="panelType = 'data'">数据</el-menu-item>
      <el-menu-item index="2" @click="panelType = 'conf'">样式</el-menu-item>
    </el-menu>
    <component :is="panels[panelName]"></component>
  </section>
</template>

<script setup>
import { shallowRef, ref, computed, watch } from 'vue';
import { LineD, LineC, BarC, BarD } from './controlPanel';

import { useRouter } from 'vue-router';
const { currentRoute } = useRouter();

// 切换面板
let panelName = ref('1/data');
let panelType = ref('data');
const panels = shallowRef({
  '1/data': LineD,
  '1/conf': LineC,
  '2/data': BarD,
  '2/conf': BarC,
});
watch([() => currentRoute.value.params.graphTypeId, panelType], () => {
  panelName.value =
    currentRoute.value.params.graphTypeId + '/' + panelType.value;
});

// let panelName = ref('');
// watch(
//   () => currentRoute.value.params,
//   (newVal, oldVal) => {
//     switch (newVal.graphTypeId) {
//       case '1': {
//         panelName.value = 'LineD';
//         break;
//       }
//       case '2': {
//         panelName.value = 'BarD';
//         break;
//       }
//     }
//   },
//   { immediate: true }
// );
</script>

<style lang="less" scoped>
.graph-control-con {
  border: 1px solid var(--el-border-color);
  display: flex;
  flex-direction: column;
  .el-menu-graph-control {
    flex: 0;
    li {
      flex: 1;
    }
  }
  .graph-control-content {
    flex: 1;
  }
}
</style>
