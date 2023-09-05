<template>
  <div class="border-right">
    <section class="border-bottom">
      <AddGraph class="menu__create__new" />
    </section>
    <el-scrollbar class="aside-scroll">
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
          <IconButton
            v-show="
              activeGraphId === graph.createdGraphId.toString() &&
              graphStore.changeCountGetter !== 0
            "
            title="保存"
            hover-color="#2a598a"
            @click="saveChangeAPI(graphStore)"
            ><EditPen
          /></IconButton>
          <DeleteButton
            class="button_show"
            :item-to-delete="graph.createdGraphId"
            @delete-item="
              async (createdGraphId) =>
                deleteGraphAPI(createdGraphId, graphListStore)
            "
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import IconButton from '@/components/generalComponents/IconButton.vue';
import AddGraph from '@/components/graphs/AsideComponents/AddGraph.vue';
import { saveChangeAPI, deleteGraphAPI } from '@/api/graphAPI.js';
import { storeToRefs } from 'pinia';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList, activeGraphId } = storeToRefs(graphListStore);
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();

// TODO 增加示意图
</script>

<style lang="less" scoped>
@add_graph_height: 20px;
.no-right-border {
  border-right: 0 !important;
}
div {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .aside-scroll {
    max-height: 100%;
  }
  .menu__graph {
    justify-content: space-between;
    .graph__name {
      overflow: hidden;
      display: inline-block;
      width: 85px;
      text-overflow: ellipsis;
    }
  }
  :deep(.show__icon:hover .button_show) {
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

    .menu__create__new {
      height: @add_graph_height;
      display: flex;
      justify-content: center;
      & *:hover {
        color: #409eff;
      }
    }
    .aside__button {
      margin: 8px;
      width: 60%;
    }
  }
}
</style>
