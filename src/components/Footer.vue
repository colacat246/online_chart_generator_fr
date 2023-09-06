<template>
  <div class="border-top footer-con">
      <InfoAlertVue class="info"></InfoAlertVue>
  </div>
</template>

<script setup>
import InfoAlertVue from '@/components/generalComponents/InfoAlert.vue';
</script>

<style lang="less" scoped>
.footer-con {
  display: flex;
  justify-content: right;
  align-items: center;
  .info {
    width: 350px;
  }
}
</style>
