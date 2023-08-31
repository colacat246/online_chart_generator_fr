<template>
  <div class="border-right">
    <section class="border-bottom">
      <AddGraph class="menu__create__new" />
    </section>
    <el-scrollbar>
      <el-menu
        class="no-right-border"
        :default-active="activeGraphId"
        @select="(idx) => graphListStore.setActiveGraphId(idx)"
      >
        <el-menu-item
          class="menu__graph show__icon"
          v-for="graph in graphList"
          :key="graph.createdGraphId.toString()"
          :index="graph.createdGraphId.toString()"
        >
          <span>
            <el-icon><document /></el-icon>
            <span class="graph__name">{{ graph.graphName }}</span>
          </span>
          <DeleteButton
            class="del-button"
            :item-to-delete="graph.createdGraphId"
            @delete-item="deleteGraph"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import AddGraph from './AsideComponents/AddGraph.vue';
import api from '@/config/createRequest.js';
import { storeToRefs } from 'pinia';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList, activeGraphId } = storeToRefs(graphListStore);

// TODO 增加示意图

// 删除
async function deleteGraph(createdGraphId) {
  try {
    const res = await api.delete('/userGraph', { data: { createdGraphId } });
    graphListStore.setGraphList(res.data.data.graphList);
    // 删除的是当前图形，进行跳转
    if (createdGraphId.toString() === graphListStore.activeGraphIdGetter) {
      graphListStore.setActiveGraphId(res.data.data.curGraphId);
    }
  } catch (err) {
    // TODO
    console.log(err);
  }
}
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
