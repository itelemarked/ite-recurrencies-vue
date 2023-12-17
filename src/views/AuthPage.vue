
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
  
    <ion-content>

      Auth works!!
      <p>user: {{ email }}</p>

    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton } from '@ionic/vue';
  import { authService } from '../services/AuthService';
  import { computed } from 'vue';
  // const authService = AuthService()

  // authService.logout()
  authService.login('aaa@ite-recurrency.com', '111111')

  const email = computed(() => {
    const res = authService.getUser().value?.email
    console.log(`computed email: ${res}`)
    return res
  })

</script>