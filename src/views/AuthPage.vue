
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

      <ion-label>Email</ion-label>
      <ion-item>
        <ion-input
          type="text"
        ></ion-input>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-button slot="end" fill="clear">
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <ion-icon :icon="eyeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<style scoped>
  ion-item {
    border: 1px solid var(--ion-color-medium);
    border-radius: 5px;
    --inner-padding-end: 0;
    margin-top: 10px;
  }
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonInput, IonLabel, IonItem, type InputCustomEvent, IonButton, IonIcon } from '@ionic/vue';
  import { eyeOutline } from 'ionicons/icons';


</script>