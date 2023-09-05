<template>
  <el-collapse
    accordion
    v-if="graph && graph.series"
    v-model="activeSeriesData"
  >
    <template v-for="curData in graph.series" :key="curData.$extra.id">
      <el-collapse-item :name="curData.$extra.id">
        <template #title>
          <div class="title-con">
            <section
              class="title-item"
              title=""
              :ref="(el) => setGraphRef(el, curData.$extra.id)"
            >
              {{ curData.name }}
            </section>
            <DeleteSeries :series-id="curData.$extra.id"></DeleteSeries>
          </div>
        </template>
        <slot :series="curData" :graph="graph">
          <div>default</div>
        </slot>
      </el-collapse-item>
    </template>
    <div class="flex_con">
      <AddNewSeries></AddNewSeries>
    </div>
  </el-collapse>
</template>

<script setup>
import AddNewSeries from '@/components/graphs/controlItems/AddNewSeries.vue';
import DeleteSeries from '@/components/graphs/controlItems/DeleteSeries.vue';
import { nextTick, watch } from 'vue';

import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph, activeSeriesData } = storeToRefs(graphStore);

// 处理title
// 控制面板属性，结构为 属性 -> id
const graphControlProps = {
  refs: {},
};
// 折叠面板展开时不显示提示title
const setGraphRef = (el, curDataId) => {
  if (el) {
    graphControlProps.refs[curDataId] = el;
  }
};

// 处理鼠标悬浮title提示
watch(() => activeSeriesData.value, async () => {
  await nextTick();
  for (const i in graphControlProps.refs) {
    graphControlProps.refs[i].title = '点击编辑曲线';
  }
  if (activeSeriesData.value === '') return; // 面板未改变时返回
  graphControlProps.refs[activeSeriesData.value].title = '收起';
}, {immediate: true});

</script>

<style lang="less" scoped>
.title-con {
  :deep(&:hover .del-button) {
    visibility: visible;
    opacity: 1;
  }
}
</style>
