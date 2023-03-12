<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">整体尺寸</section>
      </div>
    </template>
    <div class="item-con-double">
      <section>
        <span>水平位置</span>
        <el-input-number
          size="small"
          :model-value="parseInt(curGraph.grid.left)"
          @change="(val) => (curGraph.grid.left = val.toString() + '%')"
        />
      </section>
      <section>
        <span>垂直位置</span>
        <el-input-number
          size="small"
          :model-value="parseInt(curGraph.grid.top)"
          @change="(val) => (curGraph.grid.top = val.toString() + '%')"
        />
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>水平缩放</span>
        <el-input-number
          size="small"
          :model-value="parseInt(curGraph.width)"
          @change="(val) => (curGraph.grid.width = val.toString() + '%')"
        />
      </section>
      <section>
        <span>垂直位置</span>
        <el-input-number
          size="small"
          :model-value="parseInt(curGraph.height)"
          @change="(val) => (curGraph.grid.height = val.toString() + '%')"
        />
      </section>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { template } from 'lodash';
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

function handleLeftPadding(val) {
  leftPadding.value = val;
  curGraph.title.left = val;
}
function handleLeftPaddingCentering(val) {
  if (val) {
    isCentering.value = true;
    curGraph.title.left = 'center';
  } else {
    isCentering.value = false;
    curGraph.title.left = leftPadding.value;
  }
}
</script>

<style lang="less" scoped>
.bold-switcher {
  justify-content: flex-end;
}
</style>
