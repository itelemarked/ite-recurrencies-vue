
<script setup lang="ts">
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { RouterLink } from 'vue-router';
defineProps(['contentId'])
</script>


<template>
  <ion-menu :contentId="contentId">
    <ion-header>
      <ion-toolbar color="tertiary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>
        <router-link to="/">home</router-link>
      </p>
      <p>
        <router-link to="/recurrency">recurrency</router-link>
      </p>
    </ion-content>
  </ion-menu>
</template>



<style scoped>

</style>