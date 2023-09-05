<template>
  <Transition>
    <div v-if="show" class="info" :style="config[infoType].style">
      <el-icon style="padding-right: 10px"
        ><component :is="config[infoType].icon"
      /></el-icon>
      <span> {{ infoContent }} </span>
      <el-icon style="cursor: pointer" @click="clearInfo"><Close /></el-icon>
    </div>
  </Transition>
</template>
<script setup>
import { SuccessFilled, WarningFilled } from '@element-plus/icons-vue';
import useInfoAlert from '@/composables/infoAlert.js';
const { infoContent, infoType, show, clearInfo } = useInfoAlert();

const config = {
  warn: {
    icon: WarningFilled,
    style: {
      color: '#e6a23c',
      backgroundColor: '#fdf6ec',
    },
  },
  success: {
    icon: SuccessFilled,
    style: {
      color: '#67c23a',
      backgroundColor: '#f0f9eb',
    },
  },
};
</script>

<style lang="less" scoped>
.info {
  display: flex;
  padding: 0px 10px;
  // justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 15px;
  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// 用于Transition组件
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
