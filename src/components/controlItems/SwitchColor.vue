<template>
  <section>
    <span>配色</span>
    <section class="switcher">
      <el-color-picker v-model="curColor" @change="setColor" size="default" />
      <el-button type="primary" @click="resetColor($event)" size="small"
        >恢复默认配色</el-button
      >
    </section>
  </section>
</template>

<script setup>
import { nextTick, ref, inject, computed, watch } from 'vue';
import bus from '../../libs/bus.js';
const { modelValue, series, id } = defineProps(['modelValue', 'series', 'id']);
const emit = defineEmits(['update:modelValue']);
const blurBtn = inject('blurBtn');
// 拿到myChart
const curChart = inject('curChart');
// 获取颜色
const curColor = ref();

const idx = computed(() => {
  return series.findIndex((i) => i.id === id);
});

watch(idx, updateColor, { immediate: true, flush: 'post' });

// 设置颜色
const setColor = (val) => {
  emit('update:modelValue', val);
  bus.emit('lineD:updateColor'); // 通知所有组件改变颜色
};
const resetColor = (evt) => {
  blurBtn(evt);
  emit('update:modelValue', undefined);
  bus.emit('lineD:updateColor'); // 通知所有组件改变颜色
};

// 当有一条曲线改变颜色时，更新全部曲线颜色
bus.on('lineD:updateColor', () => {
  updateColor();
});

function updateColor() {
  nextTick(() => {
    curColor.value = curChart.value.getVisual(
      { seriesIndex: idx.value },
      'color'
    );
  });
}
</script>

<style lang="less" scoped>
.switcher {
  display: flex;
  // margin-left: 5px;
  justify-content: space-between;
  align-items: center;
  & > * {
    flex: 1;
    &:last-child {
      margin-left: 20px;
    }
  }
}
</style>
