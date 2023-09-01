<template>
  <div>
    <DeleteButtonVue
      :item-to-delete="seriesId"
      @delete-item="handleDelete"
      size="16"
      class="del-button"
    ></DeleteButtonVue>
  </div>
</template>

<script setup>
import DeleteButtonVue from '@/components/generalComponents/DeleteButton.vue';
import { defineProps, toRefs } from 'vue';
import api from '@/config/createRequest.js';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

const props = defineProps({
  seriesId: String,
});
const { seriesId } = toRefs(props);

async function handleDelete(id) {
  // TODO 异常处理
  const res = await api.delete('/userGraphSeries', {
    data: { createdGraphId: graphStore.graphIdIntGetter, seriesId: id },
  });
  graphStore.deleteSeries(res.data.data.graph, id, res.data.data.seriesId);
}
</script>

<style lang="less" scoped></style>
