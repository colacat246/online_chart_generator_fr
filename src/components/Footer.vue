<template>
  <div class="border-top footer-con">
    <section class="info">
      <InfoAlertVue></InfoAlertVue>
    </section>
  </div>
</template>

<script setup>
import InfoAlertVue from '@/components/generalComponents/InfoAlert.vue';
</script>

<style lang="less" scoped>
.footer-con {
  display: flex;
  justify-content: center;
  align-items: center;
  .info {
    align-self: stretch;
    width: 150px;
    // height: 25px;
  }
}
</style>
