<!-- 新增图形 -->
<template>
  <RequestDialogVue
    title="新建图形"
    confirm-name="确定"
    :confirm-fn="async () => await addNewGraphAPI(model, graphListStore)"
  >
    <template v-slot="{ toggleFn }">
      <div class="container-full" @click="toggleFn($event)">新建图形</div>
    </template>
    <template #form>
      <el-form :model="model">
        <el-form-item label="类型">
          <el-select v-model="model.graphTypeId" placeholder="请选择图形类别">
            <el-option
              v-for="graph in graphTypes"
              :key="graph.id"
              :label="graph.name"
              :value="graph.id"
              class="container container-align-center items-margin-hor-5px"
            >
              <el-icon size="large"><component :is="graph.icon" /></el-icon>
              <span>{{ graph.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="model.graphName" autocomplete="off" />
        </el-form-item>
      </el-form>
    </template>
  </RequestDialogVue>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import { reactive } from 'vue';
import { addNewGraphAPI } from '@/api/graphAPI.js';
import { graphTypes } from '@/config/graphConfs.js';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();

const model = reactive({
  graphName: '新图形',
  graphTypeId: null,
});
</script>

<style lang="less" scoped></style>
