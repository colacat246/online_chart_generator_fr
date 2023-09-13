<template>
  <el-collapse
    accordion
    v-if="graph && graph.series"
    v-model="activeSeriesData"
  >
    <div class="flex_con border-bottom">
      <AddNewSeries></AddNewSeries>
    </div>
    <template v-for="curData in graph.series" :key="curData.$extra.id">
      <el-collapse-item :name="curData.$extra.id">
        <template #title>
          <div class="title-con show-icon-button-on-hover">
            <section
              class="title-item"
              title=""
              :ref="(el) => setGraphRef(el, curData.$extra.id)"
            >
              {{ curData.name }}
            </section>
            <DeleteButton
              class="item-fix"
              :item-to-delete="curData.$extra.id"
              @delete-item="async (id) => await deleteSeriesAPI(id, graphStore)"
            />
          </div>
        </template>
        <slot :series="curData" :graph="graph">
          <div>default</div>
        </slot>
      </el-collapse-item>
    </template>
  </el-collapse>
</template>

<script setup>
import AddNewSeries from '@/components/graphs/controlItems/AddNewSeries.vue';
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import { nextTick, watch } from 'vue';
import { deleteSeriesAPI } from '@/api/seriesAPI.js';

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
watch(
  () => activeSeriesData.value,
  async () => {
    await nextTick();
    for (const i in graphControlProps.refs) {
      graphControlProps.refs[i].title = '点击编辑曲线';
    }
    if (activeSeriesData.value === '') return; // 面板未改变时返回
    graphControlProps.refs[activeSeriesData.value].title = '收起';
  },
  { immediate: true }
);
</script>

<style lang="less" scoped></style>
