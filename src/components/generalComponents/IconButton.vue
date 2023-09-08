<template>
  <el-icon
    size="15px"
    :title="title"
    @click.stop
    class="icon-button"
    :style="{ '--hoverColor': hoverColor }"
    :class="{ show_on_outer_hover: showOnOuterHover }"
    ><slot>
      <ElementPlus />
    </slot>
  </el-icon>
</template>

<script setup>
import { toRefs } from 'vue';
const props = defineProps({
  // 图标组件
  title: { type: String, default: '标题' },
  // 外侧组件悬浮触发按钮显示，需在外层元素中配合对应class和:deep穿透使用
  showOnOuterHover: { type: Boolean, default: false },
  hoverColor: { type: String, default: '#f56c6c' },
});
const { title, showOnOuterHover, hoverColor } = toRefs(props);
</script>

<style lang="less" scoped>
.icon-button:hover {
  color: var(--hoverColor);
}

.show_on_outer_hover {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.5s, color 0.2s;
}
</style>
