<template>
  <div>
    <!-- 按钮插槽 -->
    <slot :toggleFn="toggleDialog">
      <el-button @click="toggleDialog($event)">触发{{ title }}对话框</el-button>
    </slot>
    <el-dialog v-model="isVisible" :title="title" width="30%" align-center append-to-body>
      <el-form :model="model">
        <template v-for="item in model" :key="item.label">
          <el-form-item v-if="item.show" :label="item.label">
            <el-input v-model="item.val" autocomplete="off" />
          </el-form-item>
        </template>
      </el-form>
      <el-alert v-if="isAlert" :title="alertContent" type="warning" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">{{
            confirmName
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, defineProps, inject } from 'vue';
// 传进去的值
const props = defineProps({
  title: String,
  confirmName: String,
  model: Array,
  confirmFn: Function, // 这个回调函数用于发送数据，在定义的时候有一个参数obj，是表单数据
  after: { // 方法完成后的回调
    type: Function,
    default: function () {},
  },
});
const {
  title,
  confirmName,
  model: modelProp,
  confirmFn,
  after,
} = toRefs(props);
const model = reactive(modelProp);

const blurBtn = inject('blurBtn');
const isVisible = ref(false);
const isAlert = ref(false);
const alertContent = ref('');

async function confirm() {
  const obj = reform(model.value);
  try {
    isAlert.value = false;
    await confirmFn.value(obj);
    isVisible.value = false;
    after.value();
  } catch (err) {
    console.log(err);
    alertContent.value = err.message;
    isAlert.value = true;
  }
}

function toggleDialog(evt) {
  blurBtn(evt);
  isVisible.value = true;
}

function reform(arr) {
  const obj = {};
  for (const i of arr) {
    obj[i.key] = i.val;
  }
  return obj;
}
</script>

<style lang="less" scoped></style>
