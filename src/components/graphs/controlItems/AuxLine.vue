<template>
  <el-collapse-item>
    <template #title>
      <div class="title-con">
        <section class="title-item">{{ axisTitle }}辅助线</section>
      </div>
    </template>
    <div class="item-con">
      <span>主辅助线</span>
      <el-switch
        size="small"
        v-model="axis.splitLine.show"
        active-text="显示"
        inactive-text="隐藏"
      />
    </div>
    <div class="item-con-double">
      <section>
        <span>主辅助线颜色</span>
        <section class="switcher-item">
          <el-color-picker
            v-model="axis.splitLine.lineStyle.color"
            size="default"
            :disabled="!axis.splitLine.show"
          />
        </section>
      </section>
      <section>
        <span>主辅助线宽度</span>
        <el-input-number
          v-model="axis.splitLine.lineStyle.width"
          size="small"
          :min="0"
          :step="0.2"
          :disabled="!axis.splitLine.show"
        />
      </section>
    </div>
    <div class="item-con">
      <span>副辅助线</span>
      <el-switch
        size="small"
        v-model="axis.minorSplitLine.show"
        active-text="显示"
        inactive-text="隐藏"
      />
    </div>
    <div class="item-con-double">
      <section>
        <span>副辅助线颜色</span>
        <setcion class="switcher-item">
          <el-color-picker
            v-model="axis.minorSplitLine.lineStyle.color"
            size="default"
            :disabled="!axis.minorSplitLine.show"
          />
        </setcion>
      </section>
      <section>
        <span>副辅助线宽度</span>
        <el-input-number
          v-model="axis.minorSplitLine.lineStyle.width"
          size="small"
          :min="0"
          :step="0.2"
          :disabled="!axis.minorSplitLine.show"
        />
      </section>
    </div>
  </el-collapse-item>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps(['axisTitle', 'axis']);
const { axis } = toRefs(props);
</script>

<style lang="less" scoped></style>
