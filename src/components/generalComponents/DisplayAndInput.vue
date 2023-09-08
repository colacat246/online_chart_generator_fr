<template>
  <span class="con">
    <div class="text">{{ modelValue }}</div>
    <RequestDialogVue
      title="修改名称"
      confirm-name="确定"
      :model="[
        {
          label: '图id',
          key: 'createdGraphId',
          val: createdGraphId,
          show: false,
        },
        { label: '名称', key: 'graphName', val: modelValue, show: true },
      ]"
      :confirm-fn="
        async (data) => await updateGraphNameAPI(data, graphListStore)
      "
    >
      <template v-slot="{ toggleFn }">
        <IconButtonVue
          title="修改名称"
          :show-on-outer-hover="true"
          @click="toggleFn($event)"
        >
          <Edit></Edit>
        </IconButtonVue>
      </template>
    </RequestDialogVue>
  </span>
</template>

<script setup>
import RequestDialogVue from '@/components/generalComponents/RequestDialog.vue';
import IconButtonVue from '@/components/generalComponents/IconButton.vue';
import { ref, inject } from 'vue';
import { updateGraphNameAPI } from '@/api/graphNameAPI.js';
import { useGraphListStore } from '@/store/graphList';
const graphListStore = useGraphListStore();

const props = defineProps({
  createdGraphId: { type: Number, required: true },
  modelValue: [String, Number],
  showOnOuterHover: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);
const blurBtn = inject('blurBtn');

const show = ref(false);
const val = ref(props.modelValue);

function save(evt) {
  blurBtn(evt);
  emit('update:modelValue', val);
  show.value = false;
}
</script>

<style lang="less" scoped>
.con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text {
    // 这里如果不设置width，直接设置flex-basis=0的话，实际最小尺寸会对比content尺寸和flex-basis尺寸，取较大值，因此flex-basis=0被忽略
    width: 0;
    font-size: small;
    // flex-basis: auto，即以width作为宽度
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn {
    flex: 0 0 auto;
  }
}
</style>
