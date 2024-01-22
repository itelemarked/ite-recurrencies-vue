

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content>
      Home works!!

      <p>{{ counter }}</p>
      <button @click="increase">increase</button>

    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/vue';
  import { useCounter } from '@/useCounter2' 

  const { counter, increase } = useCounter()
</script>