<template>
  <div class="graphs_con">
    <AsideVue class="aside"></AsideVue>
    <div v-if="loginState === 1" v-loading="loginLoading">
      <!-- TODO 切换时的骨架屏 -->
      <GraphVue v-if="graph" :is-loading="isLoading" />
      <!-- TODO 待添加图形的页面编写 -->
      <div v-if="!(graph || loginLoading)">请在左侧边栏创建图形</div>
    </div>
    <div v-else>请登录</div>
  </div>
</template>

<script setup>
import AsideVue from '@/components/graphs/Aside.vue';
import GraphVue from '@/components/graphs/Graph.vue';
import { onBeforeMount, ref } from 'vue';
import { saveChangeAPI, selectGraphAPI } from '@/api/graphAPI.js';
import useLoading from '@/composables/loading';
import { getGraphListAPI } from '@/api/graphListAPI.js';
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

const loginLoading = ref(true);

onBeforeMount(async () => {
  if (userStore.isLogin) {
    await getGraphListAPI(graphListStore);
  }
});

const { call: changeGraphLoadingCall, isLoading } = useLoading(
  async (graphStore, id) => {
    if (graphStore.changeCountGetter > 0) {
      await saveChangeAPI(graphStore);
    }
    await selectGraphAPI(id, graphStore);
  }
);

// 登录时的store数据操作
userStore.$onAction(({ name, after }) => {
  switch (name) {
    // 登录成功后获取graphList
    case 'loginOk':
      loginLoading.value = true;
      after(async () => {
        await getGraphListAPI(graphListStore);
      });
      return; // 退出登录或失败后清空graphList default:
    default:
      // 这些东西在方法执行前执行
      graphListStore.$reset();
      graphStore.$reset();
      return;
  }
});

// 订阅GraphListStore的setActiveGraphId方法，触发selectGraph，后续不再需要手动触发selectGraph
graphListStore.$onAction(({ name, args, after }) => {
  switch (name) {
    case 'setActiveGraphId':
      // OPTIMIZE 发送一次网络请求，减小延迟
      after(async () => {
        await changeGraphLoadingCall(graphStore, args[0]);
        if (loginLoading.value) loginLoading.value = false;
      });
      return;
    default:
      return;
  }
});

graphStore.$subscribe((mutate, _) => {
  if (mutate.type === 'direct') {
    graphStore.change();
  }
});

// 更新次数达到一定后自动保存
// TODO 保存图形后给个提示
graphStore.$onAction(({ name, store, after }) => {
  if (name === 'change') {
    after(async () => {
      if (store.changeCountGetter < 5) {
        return;
      }
      await saveChangeAPI(graphStore);
    });
  }
});
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
