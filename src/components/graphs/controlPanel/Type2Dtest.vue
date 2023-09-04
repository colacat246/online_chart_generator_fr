<template>
  <SeriesPanelContainerVue>
    <template v-slot="{ series }">
      <div>
        {{ series.$extra.id }}
      </div>
    </template>
  </SeriesPanelContainerVue>
</template>

<script setup>
import SeriesPanelContainerVue from '@/components/graphs/controlItems/SeriesPanelContainer.vue';
</script>

<style lang="less" scoped></style>
