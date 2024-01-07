
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

      <FormControlInput
        ref="emailCtrl"
        initialValue="initial value"
        :errors="[
          {
            condition: (val: string) => val === '999',
            message: 'Value must be different than \'999\''
          }
        ]"
        @valueChange="console.log($event)"
      ></FormControlInput>

      <p>
        emailCtrl.valid: {{ emailCtrl?.valid }}
      </p>
      <p>
        emailCtrl.value: {{ emailCtrl?.value }}
      </p>

    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonInput, IonLabel, IonItem, IonButton, IonIcon, IonNote } from '@ionic/vue';
  import FormControlInput from '../components/FormControlInput.vue';
  import { type Ref, onMounted, ref } from 'vue';

  const emailCtrl = ref()

</script>