<template>
  <div class="graphs_con">
    <AsideVue
      class="aside"
      :graphs="graphList"
      @select-graph="handleSelectGraph"
      @delete-graph="handleDeleteGraph"
    ></AsideVue>
    <GraphVue v-if="graph" :graph="graph" />
    <!-- TODO 待添加图形的页面编写 -->
    <div v-else>{{ noGraphHint[noGraphState] }}</div>
  </div>
</template>

<script setup>
import AsideVue from '@/components/graphs/Aside.vue';
import GraphVue from '@/components/graphs/Graph.vue';
import { ref, watchEffect } from 'vue';
import api from '@/config/createRequest.js';
import { storeToRefs } from 'pinia';
// store
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const { loginState } = storeToRefs(userStore);
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
const { graphList } = storeToRefs(graphListStore);
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);

const noGraphState = ref('notLogin');
const noGraphHint = {
  notLogin: '请登录',
  noGraphCreated: '请在左侧边栏创建图形',
};

// 登录登出后的数据操作
watchEffect(async () => {
  switch (loginState.value) {
    case 1:
      const data = await getGraphList();
      graphList.value = data;
      if (data.length === 0) {
        noGraphState.value = 'noGraphCreated';
      } else {
        await handleSelectGraph(data[0].createdGraphId, data[0].graphTypeId);
      };
      return;
    default:
      graphListStore.$reset();
      graphStore.$reset();
      noGraphState.value = 'notLogin';
      return;
  }
});

async function getGraphList() {
  let res;
  try {
    res = await api.get('/userGraphList');
  } catch (err) {
    // TODO 处理错误记录
    return null;
  }
  if (res.data.statusCodeValue !== 999) {
    // TODO 处理错误记录
    return null;
  }
  return res.data.data;
}

async function handleSelectGraph(createdGraphId, graphTypeId) {
  const res = await api.get(`/userGraph/${graphTypeId}/${createdGraphId}`);
  // TODO catch error
  graph.value = res.data.data;
}

function handleDeleteGraph() {}
</script>

<style lang="less" scoped>
.graphs_con {
  position: relative;
  height: calc(100vh - @header-height);
  width: 100vw;
  display: grid;
  grid-template-columns: @aside-width calc(100vw - @aside-width);
}
</style>
