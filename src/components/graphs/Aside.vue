<template>
  <div class="container container-column border-right">
    <FunctionMenuVue
      class="container container-center border-bottom"
      style="padding: 15px 0"
    />
    <el-scrollbar>
      <el-menu
        class="no-border"
        :default-active="activeGraphId"
        @select="(idx) => graphListStore.setActiveGraphId(idx)"
      >
        <el-menu-item
          class="container show-icon-button-on-hover"
          style="padding: 0 10px !important"
          v-for="graph in graphList"
          :key="graph.createdGraphId.toString()"
          :index="graph.createdGraphId.toString()"
        >
          <span class="container container-align-center item-fill-remain">
            <el-icon
              :title="
                activeGraphId === graph.createdGraphId.toString() &&
                graphStore.changeCountGetter !== 0
                  ? '保存'
                  : ''
              "
              @click="
                async () =>
                  activeGraphId === graph.createdGraphId.toString() &&
                  graphStore.changeCountGetter !== 0 &&
                  (await saveChangeAPI(graphStore))
              "
              style="margin: 0; padding-right: 5px"
              size="15px"
            >
              <el-badge
                is-dot
                :hidden="
                  activeGraphId !== graph.createdGraphId.toString() ||
                  graphStore.changeCountGetter === 0
                "
                type="warning"
                style="margin-right: 5px"
              >
                <component
                  :is="graphTypes.find((i) => i.id === graph.graphTypeId).icon"
                />
              </el-badge>
            </el-icon>
            <DisplayAndInputVue
              class="item-fill-remain"
              :show="true"
              :created-graph-id="graph.createdGraphId"
              v-model="graph.graphName"
              :show-on-outer-hover="true"
            >
            </DisplayAndInputVue>
          </span>
          <DeleteButton
            class="item-fix show-button-on-outer-hover"
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
import FunctionMenuVue from '@/components/graphs/AsideComponents/FunctionMenu.vue';
import DisplayAndInputVue from '@/components/generalComponents/DisplayAndInput.vue';
import { graphTypes } from '@/config/graphConfs.js';
import { saveChangeAPI, deleteGraphAPI } from '@/api/graphAPI.js';
import { storeToRefs } from 'pinia';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList, activeGraphId } = storeToRefs(graphListStore);
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
</script>

<style lang="less" scoped></style>
