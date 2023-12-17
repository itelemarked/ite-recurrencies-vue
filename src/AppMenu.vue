


<template>
  <ion-menu :contentId="contentId">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-menu-toggle>
        <p>
          <router-link to="/">home</router-link>
        </p>
      </ion-menu-toggle>
      <ion-menu-toggle>
        <p>
          <router-link to="/recurrency">recurrency</router-link>
        </p>
      </ion-menu-toggle>
      <ion-menu-toggle>
        <p>
          <router-link to="/auth">auth</router-link>
        </p>
      </ion-menu-toggle>
    </ion-content>
  </ion-menu>
</template>



<style scoped>

</style>



<script setup lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonMenuToggle } from '@ionic/vue';
import { RouterLink } from 'vue-router';
defineProps(['contentId'])
</script>