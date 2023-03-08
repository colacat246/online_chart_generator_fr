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
    <span>大小</span>
    <el-input-number
      :model-value="symbolSize"
      :min="1"
      :max="20"
      @change="changeSymbolSize"
      :value-on-clear="1"
    />
  </div>
</template>

<script setup>
const { modelValue, symbolSize } = defineProps(['modelValue', 'symbolSize']);
const emit = defineEmits(['update:modelValue', 'update:symbolSize']);

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
const changeSymbolSize = (val) => {
  emit('update:symbolSize', val);
};
</script>

<style lang="less" scoped></style>
