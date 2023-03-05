<template>
  <el-scrollbar>
    <div>graphId: {{ curGraphId }}</div>
    <div>graphIdx: {{ curGraphIdx }}</div>
    <div v-if="graphs[curGraphIdx].data">
      <div v-for="curData in graphs[curGraphIdx].data" :key="curData.id">
        <input type="text" v-model.number="curData.dataSet[0][0]" />
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { storeData } from '../../store/data.js';
const storeD = storeData();
const { graphs } = storeToRefs(storeD);
// 拿到图形Id
const { currentRoute } = useRouter();
const curGraphId = computed(() => {
  return currentRoute.value.params.id;
});

// 拿到图形对象并确保当前图形对象在store数组中序号正确
let curGraphIdx = ref('');
watch(
  [curGraphId, storeD], // 发生增加或删除时同步更新数组位置
  () => {
    curGraphIdx.value = graphs.value.findIndex((i) => i.id === curGraphId.value);
  },
  {
    immediate: true,
  }
);

// 转换用户输入


</script>

<style lang="less" scoped></style>
