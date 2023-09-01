<template>
  <SeriesPanelContainerVue>
    <template v-slot="{ series }"> {{ series.$extra.id }}</template>
  </SeriesPanelContainerVue>
</template>

<script setup>
import SeriesPanelContainerVue from '@/components/graphs/controlItems/SeriesPanelContainer.vue';
</script>

<style lang="less" scoped></style>
