
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

      <p>test page works!</p>

    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage, IonHeader, IonTitle, IonButtons, IonToolbar, IonMenuButton, IonContent, onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue'
  import * as useRecurrencies from '../Recurrencies/useRecurrencies'

  useRecurrencies.TEST()
  
</script>