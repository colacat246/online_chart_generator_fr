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
              :confirm-fn="addNewGraph"
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
import { ref } from 'vue';
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import api from '@/config/createRequest.js';
import { graphTypes } from '@/config/graphTypes';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();

const dropdown = ref(null);
// TODO 跳转
// TODO 使用RequestDialog

async function addNewGraph(data) {
  // TODO 做一个全局提示逻辑，处理异常
  try {
    const res = await api.post('/userGraph', data);

    if (res.data.statusCodeValue !== 999) return null;

    graphListStore.setGraphList(res.data.data.graphList);
    graphListStore.setActiveGraphId(res.data.data.newGraphId);
  } catch (err) {
    // TODO
    console.log(err);
  }
}
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
