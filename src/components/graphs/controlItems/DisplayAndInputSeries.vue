<template>
  <span class="con">
    <div class="text">
      {{ modelValue }}
    </div>
    <RequestDialogVue
      title="修改名称"
      confirm-name="确定"
      :confirm-fn="() => emit('update:modelValue', modelValueRef)"
    >
      <template v-slot="{ toggleFn }">
        <IconButtonVue
          class="btn"
          title="修改名称"
          :show-on-outer-hover="showOnOuterHover"
          @click="toggleFn($event)"
        >
          <Edit></Edit>
        </IconButtonVue>
      </template>
      <template #form>
        <el-form>
          <el-form-item label="名称">
            <el-input v-model="modelValueRef" autocomplete="off" />
          </el-form-item>
        </el-form>
      </template>
    </RequestDialogVue>
  </span>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import IconButtonVue from '@/components/generalComponents/IconButton.vue';
import { ref } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  showOnOuterHover: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);

const modelValueRef = ref(props.modelValue);
</script>

<style lang="less" scoped>
.con {
  display: flex;
  align-items: center;
  .text {
    // 这里如果不设置width，直接设置flex-basis=0的话，实际最小尺寸会对比content尺寸和flex-basis尺寸，取较大值，因此flex-basis=0被忽略
    width: 0;
    font-size: small;
    // flex-basis: auto，即以width作为宽度
    flex: 1 1 auto;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
  .btn {
    flex: 0 0 auto;
  }
}
</style>
