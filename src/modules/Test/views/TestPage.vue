
<style scoped>
  
</style>


<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>TEST</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content class="ion-padding">

      <p>Testing page works</p>

    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage, IonHeader, IonTitle, IonButtons, IonToolbar, IonMenuButton, IonContent } from '@ionic/vue'
  
  import dayjs from '../use/useDayjs'

  const timestamp = "2014-06-31 12:00"
  const tz = "Asia/Taipei"

  console.log(dayjs.tz(timestamp, tz).add(4, 'day').format())
  // console.log(dayjs.utc(timestamp).tz(tz).format())
  
</script>