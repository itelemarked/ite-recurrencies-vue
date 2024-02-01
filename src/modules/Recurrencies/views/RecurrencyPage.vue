
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
      </ion-toolbar>
    </ion-header>
  
    <ion-content>
      <p>Recurrency page works</p>
      <p>User email: {{ user?.email }}</p>
      <p>User uid: {{ user?.uid }}</p>

      <!-- <div>
        <div v-for="recurrency in recurrencies" :key="recurrency.uid">
          <p>title: {{ recurrency.title }}</p>
        </div>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<style>
  
</style>


<script setup lang="ts">
  import * as useAuth from '@/modules/Auth/use/useAuth';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonMenuButton, alertController, modalController, IonSpinner } from '@ionic/vue';
  import { computed, ref, watch, type Ref } from 'vue';

  import type { Recurrency } from '../models/Recurrency';
  import type { User } from '@/modules/Auth/interfaces/user';

  import { collection, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
  import { firebaseApp } from '@/modules/Firebase/firebase';
  import {  } from 'vue';


  function useRecurrencies() {
    const recurrencies: Ref<Recurrency[]> = ref([])
    const onChanges = (fn: () => void) => {
      fn();
    }
    return { 
      recurrencies,
      onChanges
    }
  }
  const user = useAuth.user
  const recurrencies = useRecurrencies().recurrencies

  const db = getFirestore(firebaseApp)

  async function getRecurrencies(user: User | undefined | null): Promise<Recurrency[]> {
    if (user !== undefined && user !== null) {
      const recurrenciesColl = collection(db, `users/${user.uid}/recurrencies`)
      const query = await getDocs(recurrenciesColl)
      return query.docs.map(doc => {
        const { title, period, lastEvent } = doc.data()
        const id = doc.id
        return { id, title, period, lastEvent } as Recurrency
      })
    } else {
      return []
    }
  }

  /** listen to user data changes */
  watch (user, (newUser) => {
    getRecurrencies(newUser).then(recs => {
      recurrencies.value = recs
    })
  })

  /** listen to recurrencies data changes */
  const q = collection(db, `users/${user?.value?.uid}/recurrencies`);
  onSnapshot(q, () => {
    console.log('recurrencies changed!');
    // TODO
    // recurrencies.value = (...)
  });

</script>