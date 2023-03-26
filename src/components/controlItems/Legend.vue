<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">图例</section>
        <el-switch
          size="small"
          v-model="curGraph.legend.show"
          @click.stop
          active-text="显示"
          inactive-text="隐藏"
        />
      </div>
    </template>
    <div class="item-con">
      <span>方向</span>
      <el-switch
        size="small"
        v-model="curGraph.legend.orient"
        @click.stop
        active-text="纵向"
        inactive-text="横向"
        active-value="verticle"
        inactive-value="horizontal"
      />
    </div>
    <div class="item-con-double">
      <section>
        <span>水平位置</span>
        <el-input-number size="small" v-model="curGraph.legend.right" />
      </section>
      <section>
        <span>垂直位置</span>
        <el-input-number size="small" v-model="curGraph.legend.right" />
      </section>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { ref } from 'vue';
const { curGraph } = defineProps(['curGraph']);

// 处理左边距
const isCentering = ref(false);
const leftPadding = ref(0);
if (parseFloat(curGraph.title.left).toString() === 'NaN') {
  isCentering.value = true;
} else {
  leftPadding.value = curGraph.title.left;
}
</script>

<style lang="less" scoped>
.bold-switcher {
  justify-content: flex-end;
}
</style>
