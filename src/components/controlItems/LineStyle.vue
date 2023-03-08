<template>
  <div>
    <span>线形</span>
    <el-select :model-value="modelValue" @change="changeValue">
      <el-option
        v-for="item in symbolOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span>线宽</span>
    <el-input-number
      :model-value="lineWidth"
      :min="0.5"
      :max="5"
      :step="0.1"
      @change="changeLineWidth"
      :value-on-clear="1"
    />
  </div>
</template>

<script setup>
const { modelValue, lineWidth } = defineProps(['modelValue', 'lineWidth']);
const emit = defineEmits(['update:modelValue', 'update:lineWidth']);

const symbolOptions = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点状线', value: 'dotted' },
];

const changeValue = (val) => {
  emit('update:modelValue', val);
};
const changeLineWidth = (val) => {
  emit('update:lineWidth', val);
};
</script>

<style lang="less" scoped></style>
