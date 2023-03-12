<template>
  <div>
    <section>
      <span>线形</span>
      <el-select
        class="el-select"
        :model-value="modelValue"
        @change="changeValue"
        size="small"
      >
        <el-option
          v-for="item in symbolOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </section>
    <section>
      <span>线宽</span>
      <el-input-number
        class="el-input-number"
        size="small"
        :model-value="lineWidth"
        :min="0.5"
        :max="5"
        :step="0.1"
        @change="changeLineWidth"
        :value-on-clear="1"
      />
    </section>
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

<style lang="less" scoped>
</style>
