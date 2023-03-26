<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">标题</section>
        <el-switch
          size="small"
          v-model="curGraph.title.show"
          @click.stop
          active-text="显示"
          inactive-text="隐藏"
        />
      </div>
    </template>
    <div class="item-con">
      <span>名称</span>
      <input type="text" v-model="curGraph.title.text" />
    </div>

    <div class="item-con-double">
      <section>
        <span>字号</span>
        <el-input-number
          size="small"
          v-model="curGraph.title.textStyle.fontSize"
        />
      </section>
      <section>
        <span>字体粗细</span>
        <el-switch
          class="bold-switcher"
          size="small"
          active-text="加粗"
          inactive-text="常规"
          v-model="curGraph.title.textStyle.fontWeight"
          active-value="bold"
          inactive-value="normal"
        />
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>水平边距</span>
        <el-input-number
          size="small"
          :model-value="leftPadding"
          :disabled="isCentering"
          @change="handleLeftPadding"
        />
      </section>
      <section>
        <span>垂直边距</span>
        <el-input-number size="small" v-model="curGraph.title.top" />
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>边距居中</span>
        <el-switch
          size="small"
          active-text="居中"
          inactive-text="常规"
          v-model="isCentering"
          @change="handleLeftPaddingCentering"
        />
      </section>
      <section>
        <span>颜色</span>
        <section>
          <el-color-picker
            v-model="curGraph.title.textStyle.color"
            size="default"
          />
        </section>
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
