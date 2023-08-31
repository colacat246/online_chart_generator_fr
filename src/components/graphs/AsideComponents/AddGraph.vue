<!-- 新增图形 -->
<template>
  <div>
    <el-dropdown>
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
            @click="openAddNewGraphDialog(graph)"
          >
            {{ graph.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog
      v-model="addGraphDialogVisible"
      :title="`创建新${newGraph.graphName}`"
      width="30%"
      align-center
    >
      <el-form :model="newGraph">
        <el-form-item label="名称">
          <el-input v-model="newGraph.graphName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addGraphDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addNewGraph">创建</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, inject } from 'vue';
import api from '@/config/createRequest.js';
import { graphTypes } from '@/config/graphTypes';
import { storeToRefs } from 'pinia';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList } = storeToRefs(graphListStore);

const handleSelectGraph = inject('handleSelectGraph');

const newGraph = reactive({
  graphTypeId: undefined,
  graphName: undefined,
});
const addGraphDialogVisible = ref(false);

function openAddNewGraphDialog(graph) {
  newGraph.graphTypeId = graph.id;
  newGraph.graphName = `新${graph.name}`;
  addGraphDialogVisible.value = true;
}
// TODO 跳转
// TODO 使用RequestDialog

async function addNewGraph() {
  // TODO 做一个全局提示逻辑，处理异常
  try {
    const res = await api.post('/userGraph', newGraph);
    if (res.data.statusCodeValue !== 999) return null;
    graphList.value = res.data.data.graphList;
    addGraphDialogVisible.value = false;
    await handleSelectGraph(res.data.data.newGraphId);
  } catch (err) {
    // TODO
    console.log('添加图形错误');
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
