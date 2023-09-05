<template>
  <div>
    <DeleteButtonVue
      :item-to-delete="seriesId"
      @delete-item="async (id) => deleteSeriesAPI(id, graphStore)"
      size="16"
      class="del-button"
    ></DeleteButtonVue>
  </div>
</template>

<script setup>
import DeleteButtonVue from '@/components/generalComponents/DeleteButton.vue';
import { defineProps, toRefs } from 'vue';
import { deleteSeriesAPI } from '@/api/seriesAPI.js';
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

const props = defineProps({
  seriesId: String,
});
const { seriesId } = toRefs(props);
</script>

<style lang="less" scoped></style>
