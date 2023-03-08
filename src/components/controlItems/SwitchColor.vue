<template>
  <div class="item-con">
    <span>配色方案</span>
    <el-switch
      active-text="自定义"
      inactive-text="默认"
      v-model="showColorSelector"
      @change="handleColorSwitchChange"
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
    />
    <!-- 勾选自定义颜色后弹出颜色选择框 -->
    <div class="demo-color-block">
      <div v-show="showColorSelector">
        <el-color-picker v-model="curColor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const { modelValue } = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const showColorSelector = ref(modelValue ? true : false);

// 暂存当前选择的颜色
const curColor = ref(modelValue);

watch(curColor, () => {
  emit('update:modelValue', curColor.value);
});

// 关闭开关时，颜色回到默认，开启时，回到先前选择的颜色
const handleColorSwitchChange = (val) => {
  if (!val) {
    emit('update:modelValue', undefined);
  } else {
    emit('update:modelValue', curColor.value);
  }
};

</script>

<style lang="less" scoped></style>
