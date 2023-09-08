<template>
  <div class="border-right aside-con">
    <section class="border-bottom add_new">
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
          <span class="graph__name">
            <el-icon class="icon" size="15px"><document /></el-icon>
            <DisplayAndInputVue
              class="name_and_input"
              :show="true"
              :created-graph-id="graph.createdGraphId"
              v-model="graph.graphName"
              :show-on-outer-hover="true"
            ></DisplayAndInputVue>
          </span>
          <span class="graph__edit">
            <IconButton
              :style="{
                visibility:
                  activeGraphId === graph.createdGraphId.toString() &&
                  graphStore.changeCountGetter !== 0
                    ? 'visible'
                    : 'hidden',
              }"
              title="保存"
              hover-color="#2a598a"
              @click="saveChangeAPI(graphStore)"
              ><FolderChecked
            /></IconButton>
            <DeleteButton
              class="button_show"
              :item-to-delete="graph.createdGraphId"
              @delete-item="
                async (createdGraphId) =>
                  deleteGraphAPI(createdGraphId, graphListStore)
              "
            />
          </span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import DeleteButton from '@/components/generalComponents/DeleteButton.vue';
import IconButton from '@/components/generalComponents/IconButton.vue';
import AddGraph from '@/components/graphs/AsideComponents/AddGraph.vue';
import DisplayAndInputVue from '@/components/generalComponents/DisplayAndInput.vue';
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
.aside-con {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  .aside-scroll {
    height: 100%;
    .menu__graph {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      overflow: hidden;
      padding: 0 10px !important;
      .graph__name {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        width: 0;
        flex: 1 1 0;
        .icon {
          margin: 0;
          padding-right: 2px;
          flex: 0 0 auto;
        }
        .name_and_input {
          flex: 1 1 0;
        }
      }
      .graph__edit {
        box-sizing: border-box;
        flex: 0 0 auto;
      }
    }
  }
  :deep(.show__icon:hover .button_show) {
    // display: inherit;
    visibility: visible;
    opacity: 1;
  }
  .add_new {
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
