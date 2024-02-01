
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
  import { IonPage, IonHeader, IonTitle, IonButtons, IonToolbar, IonMenuButton, IonContent, onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue'
  import * as useRecurrencies from '../use/useRecurrencies'
  import * as mockStore from '../use/useMockStore'
  import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
  import { watch } from 'vue';

  useRecurrencies.TEST()

  // let subscriptions: (()=>void)[] = []
  
  // onIonViewWillEnter(() => {
  //   console.log('ionViewWillEnter')
  //   subscriptions.push(watch(store.recurrencies, (newRecurrencies) => {
  //     console.log('recurrencies changed')
  //   }, {deep: true}))
  // })

  // onIonViewWillLeave(() => {
  //   console.log('ionViewWillLeave')
  //   subscriptions.forEach(fn => fn())
  // })
  
</script>