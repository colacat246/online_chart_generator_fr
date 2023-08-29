<template>
  <div class="border-right">
    <section class="border-bottom">
      <AddGraph
        class="menu__create__new"
      />
    </section>
    <el-scrollbar>
      <el-menu class="no-right-border" :default-active="activeGraph">
        <el-menu-item
          class="menu__graph show__icon"
          v-for="graph in graphList"
          :key="graph.createdGraphId"
          :index="graph.createdGraphId.toString()"
          @click="handleSelectGraph(graph.createdGraphId)"
        >
          <span>
            <el-icon><document /></el-icon>
            <span class="graph__name">{{ graph.graphName }}</span>
          </span>
          <DeleteButton
            class="del-button"
            :item-to-delete="graph.createdGraphId"
            @delete-item="confirmDelete"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import AddGraph from './AsideComponents/AddGraph.vue';
import { ref, watchEffect, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList } = storeToRefs(graphListStore);

const handleSelectGraph = inject('handleSelectGraph');

const activeGraph = ref(null);
watchEffect(() => {
  activeGraph.value =
    graphList.value.length > 0 ? graphList.value[0].createdGraphId.toString() : null;
});

// TODO 增加示意图

// 删除
const confirmDelete = (id) => {
  const idx = graphList.value.findIndex((i) => i.$extra.uuid === id);
  graphList.value.splice(idx, 1);

  // 删除后的路由跳转
  if (id !== activeGraph.value) return;
  const graphToShow = graphList.value[idx - 1]
    ? graphList.value[idx - 1]
    : graphList.value[idx]
    ? graphList.value[idx]
    : null;
  let res;
  if (!graphToShow) {
    res = null;
  } else {
    res = graphToShow.$extra.uuid;
  }
  activeGraph.value = res;
  emit('selectGraph', res);
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
    .graph__name {
      overflow: hidden;
      display: inline-block;
      width: 100px;
      text-overflow: ellipsis;
    }
  }
  :deep(.show__icon:hover .del-button) {
    // display: inherit;
    visibility: visible;
    opacity: 1;
  }
  section {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 15px;
    padding-left: 22px;

    .menu__create__new *:hover {
      color: #409eff;
    }
    .aside__button {
      margin: 8px;
      width: 60%;
    }
  }
}
</style>
