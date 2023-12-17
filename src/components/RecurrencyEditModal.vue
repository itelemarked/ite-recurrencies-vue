

<template>
  
    <ion-header>
      <ion-toolbar>
        <ion-title>Edit or create</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :forceOverscroll="false">
      <ion-list>

        <ion-item>
          <ion-label position="stacked">Title</ion-label>
          <ion-input
            placeholder="Enter a title..."
          />
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Last Event Date</ion-label>
          <ion-input
            type="date"
            placeholder="Enter a date..."
          />
        </ion-item>
        <ion-item class="half">
          <ion-label position="stacked">Period</ion-label>
          <ion-input
            placeholder="Enter a number..."
            inputmode="numeric"
          />
        </ion-item>
        <ion-item class="half">
          <ion-label class="hidden" position="stacked">unit</ion-label>
          <ion-select interface="action-sheet" placeholder="Select">
            <ion-select-option value="days">Days</ion-select-option>
            <ion-select-option value="weeks">Weeks</ion-select-option>
            <ion-select-option value="months">Months</ion-select-option>
            <ion-select-option value="years">Years</ion-select-option>
          </ion-select>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Expiry Date</ion-label>
          <ion-input type="date"/>
        </ion-item>
        
      </ion-list>

      <div class="ion-padding-top">
        <ion-button
          expand="full"
        >
          Create or Edit
        </ion-button>
      </div>

    </ion-content>
</template>

<style scoped>
  .half {
    display: inline-block;
    width: 50%;
  }

  .hidden {
    visibility: hidden;
  }
</style>


<script setup lang="ts">
  import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption, IonButton } from '@ionic/vue'
  // import { createOutline, trashOutline } from "ionicons/icons"

</script>