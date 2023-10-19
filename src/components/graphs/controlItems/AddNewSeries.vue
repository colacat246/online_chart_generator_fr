<template>
  <RequestDialogVue
    title="添加新数据组"
    confirm-name="确定"
    :form-data="[
      { label: '名称', key: 'seriesName', val: '新数据组', show: true },
      {
        label: '',
        key: 'createdGraphId',
        val: graphStore.graphIdIntGetter,
        show: false,
      },
    ]"
    :confirm-fn="async (data) => addNewSeriesAPI(data, graphStore)"
    :loading-area="drawAreaCon"
  >
    <template v-slot="{ toggleFn }">
      <el-button link type="primary" size="small" @click="toggleFn($event)" style="padding: 5px 0"
        >添加新数据组</el-button
      >
    </template>
  </RequestDialogVue>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import { inject } from 'vue';
import { addNewSeriesAPI } from '@/api/seriesAPI.js';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

const drawAreaCon = inject('drawAreaCon');
</script>

<style lang="less" scoped></style>
