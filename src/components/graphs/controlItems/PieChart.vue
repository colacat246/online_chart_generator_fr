<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">其余配置</section>
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
        <span>垂直位置</span>
        <el-input-number
          size="small"
          :model-value="parseFloat(curGraph.series.center[0])"
          @change="(v) => (curGraph.series.center[0] = v + '%')"
        />
      </section>
      <section>
        <span>水平位置</span>
        <el-input-number
          size="small"
          :model-value="parseFloat(curGraph.series.center[1])"
          @change="(v) => (curGraph.series.center[1] = v + '%')"
        />
      </section>
    </div>
    <div class="item-con-double">
      <section>
        <span>字体大小</span>
        <el-input-number
          size="small"
          v-model="curGraph.series.label.fontSize"
        />
      </section>
      <section>
        <span>半径尺寸</span>
        <el-input-number
          size="small"
          :model-value="parseFloat(curGraph.series.radius)"
          @change="(v) => (curGraph.series.radius = v + '%')"
        />
      </section>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps(['curGraph']);
const { curGraph } = toRefs(props);
</script>

<style lang="less" scoped>
.bold-switcher {
  justify-content: flex-end;
}
</style>
