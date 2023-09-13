<template>
  <el-collapse
    accordion
    v-if="graph && graph.series"
    :model-value="graphStore.activeSeriesIdGetter"
    @change="graphStore.setActiveSeriesId"
  >
    <div class="flex_con border-bottom">
      <AddNewSeries></AddNewSeries>
    </div>
    <template v-for="curData in graph.series" :key="curData.$extra.id">
      <el-collapse-item :name="curData.$extra.id">
        <template #title>
          <div
            class="container container-align-center items-margin-hor-5px show-icon-button-on-hover"
            style="width: 92%; color: #409eff; padding-left: 5px"
          >
            <section
              class="item-fill-remain"
              style="font-size: 13px"
              :ref="(el) => setGraphRef(el, curData.$extra.id)"
              title=""
            >
              <DisplayAndInputSeries
                v-model="curData.name"
                :show-on-outer-hover="false"
              ></DisplayAndInputSeries>
            </section>
            <DeleteButton
              class="item-fix"
              :show-on-outer-hover="false"
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
import DisplayAndInputSeries from '@/components/graphs/controlItems/DisplayAndInputSeries.vue';
import { nextTick, watch } from 'vue';
import { deleteSeriesAPI } from '@/api/seriesAPI.js';

import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);

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
  () => graphStore.activeSeriesIdGetter,
  async () => {
    await nextTick();
    for (const i in graphControlProps.refs) {
      graphControlProps.refs[i].title = '点击编辑曲线';
    }
    if (graphStore.activeSeriesIdGetter === '') return; // 面板未改变时返回
    graphControlProps.refs[graphStore.activeSeriesIdGetter].title = '收起';
  },
  { immediate: true }
);
</script>

<style lang="less" scoped></style>
