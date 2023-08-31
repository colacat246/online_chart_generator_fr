<template>
  <div>
    <el-button v-if="isBtn" @click="toggleDialog($event)" type="primary">{{
      togglerName
    }}</el-button>
    <span v-else @click="toggleDialog($event)">{{ togglerName }}</span>
    <el-dialog v-model="isVisible" :title="title" width="30%" align-center>
      <el-form :model="model">
        <template v-for="item in model" :key="item.label">
          <el-form-item :label="item.label">
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
import { ref, toRefs, defineProps, inject } from 'vue';
// 传进去的值
const props = defineProps({
  togglerName: String,
  isBtn: Boolean,
  title: String,
  confirmName: String,
  model: Object,
  confirmFn: Function, // 这个回调函数用于发送数据，在定义的时候有一个参数obj，是表单数据
});
const { title, confirmName, model, confirmFn } = toRefs(props);
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
  } catch (err) {
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
