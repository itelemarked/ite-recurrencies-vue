
<template>
  <ion-page>
  <!-- <div> -->
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Recurrency</ion-title>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="end">
          <ion-button @click="onCreateRecurrency()">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <ion-icon slot="icon-only" :icon="addOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  
    <ion-content>
      <suspense>
        <recurrency-list></recurrency-list>

        <template #fallback>
          <!-- <p>Loading...</p> -->
          <ion-spinner></ion-spinner>
        </template>
      </suspense>
    </ion-content>
  </ion-page>
</template>

<style>
  
</style>


<script setup lang="ts">

  // import { RouterLink, RouterView } from 'vue-router'
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonMenuButton, alertController, modalController, IonSpinner } from '@ionic/vue';
  import { addOutline } from "ionicons/icons"
  import { reactive, watch } from 'vue';
  import RecurrencyEditModal from '../components/RecurrencyEditModal.vue';
  import { recurrencyDataService } from '../services/RecurrencyDataService';
  import RecurrencyList from '../components/RecurrencyList.vue';
  import { useAuth } from '../modules/Auth/use/useAuth';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const user = useAuth().user

  const unwatchUser = watch(user, (newUser) => {
    console.log('user changed!')
    console.log(newUser)
    if(newUser === null) {
      a()
      router.replace({ path: '/auth' })
    }
  })

  function a() {
    unwatchUser()
  }

  // watch(useAuth().user, () => {
  //   if (!useAuth().user.value) {
  //     console.log('should be redirected to auth...')
  //     router.replace({name: 'auth'})
  //   }
  // })

  async function onCreateRecurrency() {
    const modal = await modalController.create({
      component: RecurrencyEditModal,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9
    })

    await modal.present()
  }

</script>../../services/RecurrencyDataService