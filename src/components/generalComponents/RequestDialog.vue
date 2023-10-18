<template>
  <div class="container container-align-center">
    <slot :toggleFn="toggleDialog">
      <el-button @click="toggleDialog($event)">触发{{ title }}对话框</el-button>
    </slot>
    <el-dialog
      v-model="isVisible"
      :title="title"
      width="30%"
      align-center
      append-to-body
    >
      <slot name="form">
        <el-form v-if="model" :model="model">
          <div v-for="item in model" :key="item.label" class="item-con">
            <template v-if="item.show">
              <span>{{ item.label }}</span>
              <el-input v-model="item.val" autocomplete="off" :type="Object.keys(item).includes('isPassword') ? 'password' : null"/>
            </template>
            <!-- <el-form-item v-if="item.show" :label="item.label">
              <el-input v-model="item.val" autocomplete="off" />
            </el-form-item> -->
          </div>
        </el-form>
        <span v-else>mo model, add it manually</span>
      </slot>
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
import { ref, reactive, toRefs, inject } from 'vue';
import { ElLoading } from 'element-plus';
// 传进去的值
const props = defineProps({
  title: String,
  confirmName: String,
  model: Array,
  confirmFn: Function, // 这个回调函数用于发送数据，在定义的时候有一个参数obj，是表单数据
  after: {
    // 方法完成后的回调
    type: Function,
    default: function () {},
  },
  loadingArea: {
    default: null,
    type: Object,
  },
});
const {
  title,
  confirmName,
  model: modelProp,
  confirmFn,
  after,
  loadingArea,
} = toRefs(props);
const model = reactive(modelProp);

const blurBtn = inject('blurBtn');
const isVisible = ref(false);
const isAlert = ref(false);
const alertContent = ref('');

async function confirm() {
  let loadingInstance;
  try {
    if (loadingArea.value) {
      isVisible.value = false;
      loadingInstance = ElLoading.service({
        target: loadingArea.value,
      });
    }

    isAlert.value = false;

    if (model.value) {
      const obj = reform(model.value);
      await confirmFn.value(obj);
    } else {
      await confirmFn.value();
    }
    isVisible.value = false;
    after.value();
  } catch (err) {
    isVisible.value = true;
    alertContent.value = err.message;
    isAlert.value = true;
  } finally {
    if (loadingInstance) loadingInstance.close();
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
