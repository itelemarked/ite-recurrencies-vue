

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
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

      <div
        v-for="(recurrency, idx) in datas"
        :key="idx">
        <recurrency-item
          :recurrency="recurrency"
          @edit="onEditRecurrency()"
          @delete="onDeleteRecurrency(recurrency.title)"
        ></recurrency-item>
      </div>

      <!-- <ion-modal ref="modal" :is-open="isOpen" @willDismiss="isOpen = false">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-input
              label="Enter your name"
              label-placement="stacked"
              ref="input"
              type="text"
              placeholder="Your name"
            ></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal> -->

    </ion-content>
  </ion-page>
</template>

<style>
  .alert-wrapper .ite-delete-button {
    color: var(--ion-color-danger);
  }
</style>


<script setup lang="ts">

  // import { RouterLink, RouterView } from 'vue-router'
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, alertController, modalController } from '@ionic/vue';
  import { addOutline } from "ionicons/icons"
  import RecurrencyItem from './RecurrencyItem.vue';
  import { MOCK_DATA } from './Recurrency.model';
  import { ref } from 'vue';
  import RecurrencyEditModal from './RecurrencyEditModal.vue';

  const datas = ref(MOCK_DATA);

  // const isOpen = ref(false)

  // const modal = ref();
  // const input = ref();

  // const open = () => isOpen.value = true

  // const cancel = () => modal.value.$el.dismiss(null, 'cancel');

  // const confirm = () => {
  //   const name = input.value.$el.value;
  //   modal.value.$el.dismiss(name, 'confirm');
  // };

  // const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  //   if (ev.detail.role === 'confirm') {
  //     //message.value = `Hello, ${ev.detail.data}!`;
  //   }
  //   isOpen.value = false
  // };

  async function onCreateRecurrency() {
    const modal = await modalController.create({
      component: RecurrencyEditModal,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9
    })

    await modal.present()
  }

  async function onEditRecurrency() {}

  async function onDeleteRecurrency(title: string) {
    const alert = await alertController.create({
      header: 'Delete ' + title + '?',
      message: 'Are you sure you want to proceed?',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          role: 'delete',
          cssClass: 'ite-delete-button'
        }
      ],
    });

    await alert.present();

    const { role } = await alert.onWillDismiss();
    if (role === 'delete') {
      // delete recurrency
      console.log(`Recurrency ${title} should be deleted!`)
    }
  }

</script>