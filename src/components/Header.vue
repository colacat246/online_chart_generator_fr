<template>
  <div class="header_con">
    <el-menu class="header_menu" mode="horizontal" router>
      <el-menu-item index="/home">Home</el-menu-item>
      <el-menu-item index="/graphs">Graphs</el-menu-item>
    </el-menu>
    <h1>Online Chart Generator</h1>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.header_con {
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
  // justify-items: center;
  // color: #e5eaf3;
  // opacity: 0.8;
  // box-shadow: var(--el-box-shadow);
  & > h1 {
    font-size: 22px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #66b1ff;
  }
  & > .header_menu {
    // border: 5px solid red;
    width: 300px;
    height: 50px;
  }
}
</style>
