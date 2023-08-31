<template>
  <div class="graphs_con">
    <AsideVue class="aside"></AsideVue>
    <div v-if="loginState === 1">
      <GraphVue v-if="graph" />
      <!-- TODO 待添加图形的页面编写 -->
      <!-- TODO 写个加载页面，以免闪出v-else内容 -->
      <div v-else>请在左侧边栏创建图形</div>
    </div>
    <div v-else>请登录</div>
  </div>
</template>

<script setup>
import AsideVue from '@/components/graphs/Aside.vue';
import GraphVue from '@/components/graphs/Graph.vue';
import { ref, onBeforeMount, provide } from 'vue';
import api from '@/config/createRequest.js';
import { storeToRefs } from 'pinia';
// store
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
const { loginState } = storeToRefs(userStore);
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();
import { useGraphStore } from '@/store/graph.js';
const graphStore = useGraphStore();
const { graph } = storeToRefs(graphStore);

const noGraphState = ref('notLogin');

// TODO 加载graphList
onBeforeMount(async () => {
  if (userStore.isLogin) {
    await getGraphList();
  }
});

// 登录时的store数据操作
userStore.$onAction(({ name, after }) => {
  switch (name) {
    // 登录成功后获取graphList
    case 'loginOk':
      after(async () => {
        await getGraphList();
      });
      return;
    // 退出登录或失败后清空graphList
    default:
      // 这些东西在方法执行前执行
      graphListStore.$reset();
      graphStore.$reset();
      noGraphState.value = 'notLogin';
      return;
  }
});

// 订阅GraphListStore的setActiveGraphId方法，触发selectGraph，后续不再需要手动触发selectGraph
graphListStore.$onAction(({ name, args, after }) => {
  switch (name) {
    case 'setActiveGraphId':
      after(async () => {
        await handleSelectGraph(args[0]);
      });
      return;
    default:
      return;
  }
});

async function getGraphList() {
  try {
    const res = await api.get('/userGraphList');
    graphListStore.setGraphList(res.data.data);
    graphListStore.resetActiveGraphId();
  } catch (err) {
    // TODO 处理错误记录
    console.log(err);
  }
}

async function handleSelectGraph(createdGraphId) {
  if (!createdGraphId) {
    graphStore.$reset();
    return;
  }
  const res = await api.get(`/userGraph/${createdGraphId}`);
  // TODO catch error
  graphStore.setGraph({ graphId: createdGraphId, newGraph: res.data.data });
}

provide('handleSelectGraph', handleSelectGraph);
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
