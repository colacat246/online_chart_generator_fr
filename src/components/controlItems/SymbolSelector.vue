<template>
  <div>
    <span>标记</span>
    <el-select :model-value="modelValue" @change="changeValue">
      <el-option
        v-for="item in symbolOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>
const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const symbolOptions = [
  { label: '无', value: 'none' },
  { label: '圆角方形', value: 'roundRect' },
  { label: '圆形', value: 'circle' },
  { label: '方形', value: 'rect' },
  { label: '三角形', value: 'triangle' },
  { label: '针形', value: 'pin' },
  { label: '箭头形', value: 'arrow' },
];

const changeValue = (val) => {
  emit('update:modelValue', val);
};
</script>

<style lang="less" scoped></style>
