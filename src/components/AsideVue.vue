<template>
  <div class="border-right">
    <el-menu class="no-right-border border-bottom" router>
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>home</span>
      </el-menu-item>
    </el-menu>
    <section class="border-bottom">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon><circle-plus /></el-icon>
          <span> 创建新图</span>
        </span>
        <template #dropdown>
          <!-- 新增图形 -->
          <el-dropdown-menu style="width: 180px">
            <el-dropdown-item
              class="menu__create__new"
              style="justify-content: center"
              v-for="graph in graphTypes"
              :key="graph.graphTypeId"
              @click="addNewGraph(graph.graphTypeId)"
              >{{ graph.type }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </section>
    <el-scrollbar>
      <!-- TODO 修改名称 -->
      <el-menu class="no-right-border" :default-active="activeIndex" router>
        <el-menu-item
          class="menu__graph show__icon"
          v-for="graph in graphs"
          :key="graph.id"
          :index="'/graph/' + graph.id + '/' + graph.graphTypeId"
        >
          <span>
            <el-icon><document /></el-icon>
            <span class="graph__name">{{ graph.name }}</span>
          </span>
          <!-- <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            :icon="Warning"
            icon-color="#f56c6c"
            title="确认删除吗？"
            @confirm="confirmDelete(graph.id)"
          >
            <template #reference>
              <el-icon @click.stop class="delete-button"><delete /></el-icon>
            </template>
          </el-popconfirm> -->
          <DeleteButton
            class="del-button"
            :item-to-delete="graph.id"
            @delete-item="confirmDelete"
          />
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import DeleteButton from './generalComponents/DeleteButton.vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Warning,
  CirclePlus,
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
const genNewName = inject('genNewName');

const { currentRoute } = useRouter();
const activeIndex = computed(() => currentRoute.value.path);

// TODO 写新图的模板逻辑挪到graphConfs中
// TODO 增加示意图
const addNewGraph = (id) => {
  const graph = graphTypes.value.find((i) => i.graphTypeId === id);
  const graphId = genId();

  // 确定新图形名称
  storeD.$patch((state) => {
    const newName = genNewName('新建图形', graphs.value);
    state.graphs.push({
      id: graphId,
      name: newName,
      graphTypeId: graph.graphTypeId,
      type: graph.type,
      // 数据
      series: [],
      // 标题
      title: {
        show: true,
        text: newName,
        textStyle: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'normal',
        },
        // borderWidth: undefined,
        // borderRadius: undefined,
        // borderColor: undefined,
        // textAligh: undefined,
        left: 'center',
        top: 23,
      },
      grid: {
        // show: true,
        left: '18%',
        top: '15%',
        // right: '50%',
        // bottom: 70,
        // containLabel: true,
        // backgroundColor: '#ccc',
        borderWidth: 1.5,
        borderColor: '#666',
      },
      height: '70%',
      width: '70%',
      legend: {
        show: true,
        orient: 'horizontal',
        // padding: 25,
        top: 22,
        right: 22,
        // itemStyle: {},
        // data: ['data1', 'data2'],
      },
    });
  });
  const curPath = `/graph/${graphId}/${graph.graphTypeId}`;
  router.push({ path: curPath }); // 跳转到新建立的图表
};

// 删除
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

    .el-dropdown-link {
      display: flex;
      & > * {
        margin: 0 4px;
      }
    }
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
