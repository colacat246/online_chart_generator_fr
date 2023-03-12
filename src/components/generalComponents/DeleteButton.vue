<template>
  <el-popconfirm
    confirm-button-text="是"
    cancel-button-text="否"
    :icon="Warning"
    icon-color="#f56c6c"
    title="确认删除吗？"
    @confirm="emit('deleteItem', itemToDelete)"
  >
    <template  #reference>
      <!-- 父组件的class绑定到这个上面，父组件用/deep/穿透可实现悬浮显示 -->
      <el-icon v-bind="$attrs" @click.stop class="delete-button"><delete /></el-icon>
    </template>
  </el-popconfirm>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
import { defineProps, defineEmits } from 'vue';
const { itemToDelete } = defineProps(['itemToDelete']);
const emit = defineEmits(['deleteItem']);
</script>

<style lang="less" scoped>
.delete-button {
  display: none;
  &:hover {

  color: #f56c6c;
  }
}
</style>
