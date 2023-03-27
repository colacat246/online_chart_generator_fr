<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">整体尺寸</section>
      </div>
    </template>
    <div class="item-con-double">
      <section>
        <span>画布高度</span>
        <el-input-number size="small" v-model="curGraph.$extra.divHeight" />
      </section>
      <section>
        <span>画布高宽比</span>
        <el-input-number
          size="small"
          v-model="curGraph.$extra.w2hRatio"
          :min="0.01"
          :step="0.02"
        />
      </section>
    </div>
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
          @change="(val) => (curGraph.width = val.toString() + '%')"
        />
      </section>
      <section>
        <span>垂直缩放</span>
        <el-input-number
          size="small"
          :model-value="parseInt(curGraph.height)"
          @change="(val) => (curGraph.height = val.toString() + '%')"
        />
      </section>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { ref, toRefs } from 'vue';
const props = defineProps(['curGraph']);
const { curGraph } = toRefs(props);

// 处理左边距
const isCentering = ref(false);
const leftPadding = ref(0);
if (parseFloat(curGraph.value.title.left).toString() === 'NaN') {
  isCentering.value = true;
} else {
  leftPadding.value = curGraph.value.title.left;
}

function handleLeftPadding(val) {
  leftPadding.value = val;
  curGraph.value.title.left = val;
}
function handleLeftPaddingCentering(val) {
  if (val) {
    isCentering.value = true;
    curGraph.value.title.left = 'center';
  } else {
    isCentering.value = false;
    curGraph.value.title.left = leftPadding.value;
  }
}
</script>

<style lang="less" scoped>
.bold-switcher {
  justify-content: flex-end;
}
</style>
