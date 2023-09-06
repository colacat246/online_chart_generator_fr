<template>
  <section>
    <span>配色</span>
    <section class="switcher">
      <el-color-picker v-model="color" size="default" />
      <el-button type="primary" @click="resetColor($event)" size="small"
        >恢复默认配色</el-button
      >
    </section>
  </section>
</template>

<script setup>
import { toRefs, inject, computed } from 'vue';
import { colorSets } from '@/config/graphConfs.js';
const props = defineProps(['modelValue', 'series', 'id']);
const { series, id } = toRefs(props);

const emit = defineEmits(['update:modelValue']);
const blurBtn = inject('blurBtn');

const color = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
    return true;
  },
});
// 设置初始颜色
const defaultColor = computed(() => {
  const idx = series.value.findIndex((i) => i.$extra.id === id.value);
  const colorIdx = idx % colorSets.length;
  return colorSets[colorIdx];
});

if (!color.value) {
  color.value = defaultColor.value;
}

const resetColor = (evt) => {
  blurBtn(evt);
  color.value = defaultColor.value;
};

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
