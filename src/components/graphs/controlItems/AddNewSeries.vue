<template>
  <RequestDialogVue
    toggler-name="添加新曲线"
    :is-btn="true"
    title="添加新数据组"
    confirm-name="确定"
    :model="newSeriesForm"
    :confirm-fn="addNewSeries"
  ></RequestDialogVue>
</template>

<script setup>
import RequestDialogVue from '../../generalComponents/RequestDialog.vue';
import api from '@/config/createRequest.js';
import { reactive } from 'vue';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

const newSeriesForm = reactive([
  { label: '名称', key: 'seriesName', val: '新数据组' },
]);

async function addNewSeries(data) {
  const bodyData = {
    createdGraphId: graphStore.graphIdIntGetter,
    ...data,
  };
  try {
    const res = await api.post('/userGraphSeries', bodyData);
    if (res.data.statusCodeValue !== 999) {
      throw res.data.message;
    }
    graphStore.setGraph({
      newGraph: res.data.data.graph,
      activeSeries: res.data.data.newSeriesId,
    });
  } catch (err) {
    // TODO
    console.log(err);
  }
}
</script>

<style lang="less" scoped></style>
