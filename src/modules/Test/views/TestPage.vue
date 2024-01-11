
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

      <InputControl2 v-model="f"/>

      <p>
        f.value {{ f.value }}
      </p>

    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton } from '@ionic/vue';
  import { nextTick, onMounted, onUpdated, reactive, ref, type Ref } from 'vue';
  import { InputControl, VALIDATORS, type Exposed } from '../components/InputControl'
  import InputControl2 from '../components/InputControl2/InputControl2.vue'
  import { FormControl } from '../components/InputControl2/models';

  const emailCtrl = ref<Exposed>()
  const passwordCtrl = ref<Exposed>()

  const f = ref(new FormControl({
    value: 'abcd',
    label: 'some label'
  }))

  // const f = new FormControl({
  //   value: 'abcd'
  // })
  

</script>