<template>
  <RequestDialogVue
    title="添加新数据组"
    confirm-name="确定"
    :model="[
      { label: '名称', key: 'seriesName', val: '新数据组', show: true },
      {
        label: '',
        key: 'createdGraphId',
        val: graphStore.graphIdIntGetter,
        show: false,
      },
    ]"
    :confirm-fn="addNewSeries"
  >
    <template v-slot="{ toggleFn }">
      <el-button type="primary" size="small" @click="toggleFn($event)"
        >添加新数据组</el-button
      >
    </template>
  </RequestDialogVue>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import api from '@/config/createRequest.js';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

async function addNewSeries(data) {
  try {
    const res = await api.post('/userGraphSeries', data);
    if (res.data.statusCodeValue !== 999) {
      throw res.data.message;
    }
    graphStore.addSeries(res.data.data.graph, res.data.data.newSeriesId);
  } catch (err) {
    // TODO
    console.log(err);
  }
}
</script>

<style lang="less" scoped></style>
