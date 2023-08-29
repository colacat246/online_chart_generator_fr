<template>
  <div class="border-right">
    <section class="border-bottom">
      <AddGraph
        class="menu__create__new"
        :graphs="graphs"
        @added="handleGraphAdded"
      />
    </section>
    <el-scrollbar>
      <el-menu class="no-right-border" :default-active="activeGraph">
        <el-menu-item
          class="menu__graph show__icon"
          v-for="graph in graphs"
          :key="graph.createdGraphId"
          :index="graph.createdGraphId.toString()"
          @click="emit('selectGraph', graph.createdGraphId, graph.graphTypeId)"
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
import { ref, toRefs } from 'vue';

const props = defineProps(['graphs']); // 为普通数组，数组中为proxy对象
const { graphs } = toRefs(props);
const emit = defineEmits(['selectGraph']);

const activeGraph = ref(graphs.value[0] ? graphs.value[0].$extra.uuid : null);
const handleGraphAdded = (uuid) => {
  activeGraph.value = uuid;
  emit('selectGraph', uuid);
};

// TODO 增加示意图

// 删除
const confirmDelete = (id) => {
  const idx = graphs.value.findIndex((i) => i.$extra.uuid === id);
  graphs.value.splice(idx, 1);

  // 删除后的路由跳转
  if (id !== activeGraph.value) return;
  const graphToShow = graphs.value[idx - 1]
    ? graphs.value[idx - 1]
    : graphs.value[idx]
    ? graphs.value[idx]
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
