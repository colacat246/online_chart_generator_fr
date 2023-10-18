<template>
  <div>
    <div class="container container-center border-bottom">
      <el-button
        link
        type="primary"
        size="small"
        @click="addNewData($event)"
        style="padding: 10px 0"
        >添加新数据组</el-button
      >
    </div>
    <div
      class="container container-align-center container-center"
      style="text-align: center; padding-right: 20px"
      v-for="item in graph.series.data"
      :key="item.id"
    >
      <div
        class="item-con-double item-fill-remain"
        style="margin: 7px 20px 7px 10px"
      >
        <section>
          <span>名称</span>
          <el-input type="text" size="small" v-model="item.name" />
        </section>
        <section>
          <span>数值</span>
          <el-input type="number" size="small" v-model="item.value" />
        </section>
      </div>
      <DeleteButton
        class="item-fix"
        :show-on-outer-hover="false"
        :item-to-delete="item.id"
        @delete-item="handleDelete(item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import { inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useGraphStore } from '@/store/graph.js';
import { saveChangeAPI } from '@/api/graphAPI.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);

const genId = inject('genUuid');
const blur = inject('blurBtn');

const addNewData = ($event) => {
  blur($event);
  const id = genId();
  graph.value.series.data.push({
    name: '新数据',
    value: 0,
    id,
  });
  saveChangeAPI(graphStore);
};

const handleDelete = (id) => {
  const newData = graph.value.series.data.filter((i) => i.id !== id);
  graph.value.series.data = newData;
  saveChangeAPI(graphStore);
};
</script>

<style lang="less" scoped></style>
