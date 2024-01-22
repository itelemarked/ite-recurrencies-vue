
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

      <p>{{ counter }}</p>
      <button @click="increase">increase</button>

    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage, IonHeader, IonTitle, IonButtons, IonToolbar, IonMenuButton, IonContent } from '@ionic/vue'
  import { useCounter } from '@/useCounter2' 

  const { counter, increase } = useCounter()
  
</script>