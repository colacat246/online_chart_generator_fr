<!-- 新增图形 -->
<template>
  <div>
    <el-dropdown ref="dropdown">
      <span class="el-dropdown-link">
        <el-icon><circle-plus /></el-icon>
        <span>创建新图形</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu style="width: 180px">
          <el-dropdown-item
            style="justify-content: center"
            v-for="graph in graphTypes"
            :key="graph.id"
          >
            <RequestDialogVue
              :title="graph.name"
              confirm-name="添加"
              :model="[
                {
                  label: '名称',
                  key: 'graphName',
                  val: `新${graph.name}`,
                  show: true,
                },
                { label: '', key: 'graphTypeId', val: graph.id, show: false },
              ]"
              :confirm-fn="async (data) => addNewGraphAPI(data, graphListStore)"
            >
              <template v-slot="{ toggleFn }">
                <span @click="toggleFn($event)">
                  {{ graph.name }}
                </span>
              </template>
            </RequestDialogVue>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import { addNewGraphAPI } from '@/api/graphAPI.js';
import { graphTypes } from '@/config/graphConfs.js';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  & > * {
    margin: 0 4px;
  }
}
.aside__button {
  margin: 8px;
  width: 60%;
}
</style>
