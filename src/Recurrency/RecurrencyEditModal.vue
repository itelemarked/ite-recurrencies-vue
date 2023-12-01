

<template>
  
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit or create</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :forceOverscroll="false">
      <ion-list>

        <ion-item>
          <ion-input 
            label="Title"
            label-placement="stacked"
            placeholder="Enter a title..."
          />
        </ion-item>
        <ion-item>
          <ion-input 
            label="Last Event"
            label-placement="stacked"
            placeholder="Enter a date..."
          />
        </ion-item>
        <ion-item>
          <ion-input 
            label="Period number"
            label-placement="stacked"
            placeholder="Enter a number..."
          />
        </ion-item>
        <ion-item>
          <ion-input 
            label="Period unit"
            label-placement="stacked"
            placeholder="Enter a unit..."
          />
        </ion-item>
        <ion-item>
          <ion-input 
            label="Testing"
            label-placement="stacked"
            placeholder="testing..."
          />
        </ion-item>
        <ion-item>
          <ion-input 
            label="Testing"
            label-placement="stacked"
            placeholder="testing..."
          />
        </ion-item>

      </ion-list>
    </ion-content>
</template>

<style scoped></style>


<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonLabel } from '@ionic/vue'
  // import { createOutline, trashOutline } from "ionicons/icons"

</script>