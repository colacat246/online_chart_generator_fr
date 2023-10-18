<template>
  <div class="border-top footer-con">
    <div class="dev-info" style="grid-area: left">
      developed and maintained by colacat246
    </div>
    <InfoAlertVue style="grid-area: right"></InfoAlertVue>
  </div>
</template>

<script setup>
import InfoAlertVue from '@/components/generalComponents/InfoAlert.vue';
</script>

<style lang="less" scoped>
.footer-con {
  display: grid;
  grid-template-columns: 2fr 5fr 2fr;
  grid-template-areas: 'left middle right';
  .dev-info {
    display: flex;
    align-items: center;
    color: #525457;
    font-size: 13px;
    padding-left: 15px;
  }
}
</style>
