<!-- eslint-disable no-useless-escape -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content class="ion-padding">

      <LoginSignup/>

    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonInput, IonLabel, IonItem, IonButton, IonIcon, IonNote } from '@ionic/vue';
  import LoginSignup from '../components/LoginSignup.vue';

</script>
  