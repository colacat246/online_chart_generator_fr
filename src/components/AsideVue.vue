<template>
  <div>
    <el-menu
      default-active="2"
      class="border-bottom"
      @open="handleOpen"
      @close="handleClose"
      router
    >
      <el-menu-item index="/home">
        <el-icon><icon-menu /></el-icon>
        <span>home</span>
      </el-menu-item>
    </el-menu>
    <el-scrollbar>
      <el-menu
        default-active="2"
        class=""
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item
          v-for="graph in graphs"
          :key="graph.id"
          :index="'/graph/' + graph.id"
        >
          <el-icon><document /></el-icon>
          <span>graph {{ graph.id }}</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
    <footer class="border-top border-right">
      <el-button class="aside__button" @click.prevent="addNewGraph($event)"
        >create new</el-button
      >
    </footer>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue';
import { inject } from 'vue';
import { storeData } from '../store/data.js';
import { storeToRefs } from 'pinia';
const store = storeData();
const { graphs } = storeToRefs(store);
const $blurBtn = inject('blurBtn');

// TODO 写新图的模板
// TODO 变成菜单，选择图的种类
const addNewGraph = (evt) => {
  $blurBtn(evt);
  store.$patch((state) => {
    state.graphs.push({
      id: 13,
      type: 'line',
      data: [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
      ],
    });
  });
};

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
};
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3px;
    .aside__button {
      margin: 8px;
      width: 60%;
    }
  }
}
</style>
