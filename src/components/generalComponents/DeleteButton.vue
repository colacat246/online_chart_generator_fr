<template>
  <el-popconfirm
    confirm-button-text="是"
    cancel-button-text="否"
    :icon="Warning"
    icon-color="#f56c6c"
    title="确认删除吗？"
    @confirm="emit('deleteItem', itemToDelete)"
    :teleported="true"
  >
    <template #reference>
      <IconButton
        title="删除"
        :show-on-outer-hover="true"
        v-bind="$attrs"
        @click.stop
        ><delete
      /></IconButton>
    </template>
  </el-popconfirm>
</template>

<script setup>
import IconButton from '@/components/generalComponents/IconButton.vue';
import { Warning } from '@element-plus/icons-vue';
const { itemToDelete } = defineProps(['itemToDelete']);
const emit = defineEmits(['deleteItem']);
</script>

<style lang="less" scoped></style>
