<script setup lang="ts">
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import AppMenu from './AppMenu.vue'
import { onMounted } from 'vue';
import { firestore } from './_libs/firebase'
import { collection, getDocs } from "firebase/firestore";

onMounted(mount)

async function mount() {
  const querySnapshot = await getDocs(collection(firestore, "recurrencies"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}
</script>


<template>
  <ion-app>
    <ion-split-pane when="md" contentId="main-pages">

      <app-menu contentId="main-pages"></app-menu>
      <ion-router-outlet id="main-pages"></ion-router-outlet>

    </ion-split-pane>
  </ion-app>

  <!-- <ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app> -->
</template>



<style scoped>

</style>
