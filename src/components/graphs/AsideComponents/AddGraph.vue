<!-- 新增图形 -->
<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-icon><circle-plus /></el-icon>
      <span>创建新图形</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu style="width: 180px">
        <el-dropdown-item
          style="justify-content: center"
          v-for="graph in typeRef"
          :key="graph.id"
          @click="addNewGraph(graph.id)"
          >{{ graph.name }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { toRefs, inject } from 'vue';
import Type1 from '@/graphConfs/type1.js';
import Type2 from '@/graphConfs/type2.js';

const genId = inject('genUuid');
const genNewName = inject('genNewName');

const emit = defineEmits(['added']);
const props = defineProps(['graphs']);
const { graphs } = toRefs(props);

const typeRef = [
  {
    id: 1,
    name: '折线图',
    class: Type1,
  },
  {
    id: 2,
    name: '柱状图',
    class: Type2,
  },
];

function addNewGraph(graphTypeId) {
  const ref = typeRef.find((i) => i.id === graphTypeId);
  const Generator = ref.class;
  // 确定新图形名称
  const uuid = genId();
  const name = genNewName(ref.name, graphs.value);
  const template = new Generator(uuid, name).template;

  graphs.value.push(template);
  emit('added', uuid);
}
</script>

<style lang="less" scoped>
.el-dropdown-link {
  display: flex;
  & > * {
    margin: 0 4px;
  }
}
.aside__button {
  margin: 8px;
  width: 60%;
}
</style>
