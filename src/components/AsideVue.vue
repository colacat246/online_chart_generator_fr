<template>
  <div class="border-right">
    <el-menu default-active="2" class="no-right-border border-bottom" router>
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>home</span>
      </el-menu-item>
    </el-menu>
    <el-scrollbar>
      <el-menu class="no-right-border" :default-active="activeIndex" router>
        <el-menu-item
          class="menu__graph show__icon"
          v-for="graph in graphs"
          :key="graph.id"
          :index="'/graph/' + graph.id + '/' + graph.graphTypeId"
        >
          <span>
            <el-icon><document /></el-icon>
            <span>{{ graph.name }}</span>
          </span>
          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="Warning"
            icon-color="#f56c6c"
            title="确认删除吗？"
            @confirm="confirmDelete(graph.id)"
            @cancel="cancelDelete"
          >
            <template #reference>
              <el-icon  @click.stop class="delete-button"><delete /></el-icon>
            </template>
          </el-popconfirm>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <footer class="border-top">
      <el-dropdown>
        <span class="el-dropdown-link">创建新图</span>
        <template #dropdown>
          <!-- 新增图形 -->
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="graph in graphTypes"
              :key="graph.graphTypeId"
              @click="addNewGraph(graph.graphTypeId)"
              >{{ graph.type }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </footer>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Warning,
} from '@element-plus/icons-vue';
import { ref, inject, computed } from 'vue';
import { storeData } from '../store/data.js';
import { storeConf } from '../store/config.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const storeD = storeData();
const storeC = storeConf();
const { graphs } = storeToRefs(storeD);
const { graphTypes } = storeToRefs(storeC);
const genId = inject('genId');

const { currentRoute } = useRouter();
const activeIndex = computed(() => currentRoute.value.path);
console.log();

// TODO 写新图的模板
// TODO 增加示意图
const addNewGraph = (id) => {
  const graph = graphTypes.value.find((i) => i.graphTypeId === id);
  const graphId = genId();

  // 确定新图形名称
  const setName = () => {
    let name = '新建图形';
    let count = 1;
    graphs.value.forEach((i) => {
      name = name === i.name ? `新建图形（${++count}）` : name;
    });
    return name;
  };

  storeD.$patch((state) => {
    state.graphs.push({
      id: graphId,
      name: setName(),
      graphTypeId: graph.graphTypeId,
      type: graph.type,
    });
  });
  const curPath = `/graph/${graphId}/${graph.graphTypeId}`;
  router.push({ path: curPath }); // 跳转到新建立的图表
};

const confirmDelete = (id) => {
  const idx = graphs.value.findIndex((i) => i.id === id);
  storeD.$patch((state) => {
    state.graphs.splice(idx, 1);
  });
  // 删除后的路由跳转
  if (id.toString() !== currentRoute.value.params.id) return;
  const preGraph = graphs.value[idx - 1]
    ? graphs.value[idx - 1]
    : graphs.value[idx]
    ? graphs.value[idx]
    : null;
  if (!preGraph) {
    router.push({ path: '/home' });
  } else {
    const curPath = `/graph/${preGraph.id}/${preGraph.graphTypeId}`;
    router.push({ path: curPath }); // 跳转到新建立的图表
  }
};
const cancelDelete = () => {
  return;
};
</script>

<style lang="less" scoped>
.no-right-border {
  border-right: 0 !important;
}
div {
  display: flex;
  flex-direction: column;
  .menu__graph {
    justify-content: space-between;
  }
  .delete-button {
    display: none;
  }
  .delete-button:hover {
    color: #f56c6c;
  }
  .show__icon:hover .delete-button {
    display: inherit;
  }
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    .aside__button {
      margin: 8px;
      width: 60%;
    }
  }
}
</style>
