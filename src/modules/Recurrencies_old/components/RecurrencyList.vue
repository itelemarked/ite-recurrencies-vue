
<template>
  <ion-list ref="recurrencyListRef">
    <div
      v-for="(recurrency, idx) in recurrencies"
      :key="idx"
      class="ite-recurrency-list"
    >
      <recurrency-list-item
        :recurrency="recurrency"
        @edit="onEditRecurrency()"
        @delete="onDeleteRecurrency(recurrency.title)"
      ></recurrency-list-item>
    </div>
  </ion-list>
</template>

<script setup lang="ts">
  import RecurrencyListItem from './RecurrencyListItem.vue';

  import { alertController, IonList } from '@ionic/vue';
  import { ref, type Ref } from 'vue';

  import type { Recurrency } from '../models/Recurrency';
  import { recurrencyDataService } from '../use/RecurrencyDataService';

  const recurrencyListRef = ref()

  const recurrenciesData = await recurrencyDataService.getAll()
  const recurrencies = ref(recurrenciesData) as Ref<Recurrency[]>
  
  // const promise = new Promise((resolve) => {
  //   setTimeout(resolve, 10000);
  // })
  // const p = await promise

  async function onEditRecurrency() {
    recurrencyListRef.value.closeSlidingItems()
  }

  async function onDeleteRecurrency(title: string) {
    const alert = await alertController.create({
      header: 'Delete recurrency?',
      message: `Are you sure you want to delete "${title}"?`,
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

<style>
  .alert-wrapper .ite-delete-button {
    color: var(--ion-color-danger);
  }
</style>../z - Archives/RecurrencyDataService../z - Archives/services/RecurrencyDataService../use/RecurrencyDataService