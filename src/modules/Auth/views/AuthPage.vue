<!-- eslint-disable no-useless-escape -->

<template>
  <ion-page class="ite-auth-page">
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content class="ion-padding" :forceOverscroll="false">
      <div v-if="user === undefined" class="spinner-wrapper">
        <IonSpinner name="lines"/>
      </div>

      <div v-else-if="user === null" class="login-signup-wrapper">
        <LoginSignup/>
      </div>

      <div v-else  class="logout-wrapper">
        <Logout/>
      </div>

    </ion-content>
  </ion-page>
</template>

<style>
  .ite-auth-page {

    .spinner-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .login-signup-wrapper,
    .logout-wrapper {
      max-width: 450px;
      min-width: 250px;
      margin: auto;
      margin-top: 20%;
    }

  }
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonSpinner, IonInput, IonLabel, IonItem, IonButton, IonIcon, IonNote } from '@ionic/vue';
  import LoginSignup from '../components/LoginSignup.vue';
  import Logout from '../components/Logout.vue'
  import { useAuth } from '../use/useAuth';
  import { computed } from 'vue';
  
  const { user } = useAuth()
  const userValue = computed(() => {
    if (user.value === undefined) return 'User is undefined'
    if (user.value === null) return 'User is null'
    return user.value?.email
  })
</script>
  