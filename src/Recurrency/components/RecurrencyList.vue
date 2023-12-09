
<template>
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
</template>

<script setup lang="ts">
  import RecurrencyListItem from './RecurrencyListItem.vue';
  import { alertController } from '@ionic/vue';
  import { ref, type Ref } from 'vue';
  import { recurrencyDataService } from '../services/RecurrencyDataService';
  import type { Recurrency } from '../models/Recurrency';

  const recurrenciesData = await recurrencyDataService.getAll()
  const recurrencies = ref(recurrenciesData) as Ref<Recurrency[]>
  
  // const promise = new Promise((resolve) => {
  //   setTimeout(resolve, 10000);
  // })
  // const p = await promise

  async function onEditRecurrency() {}

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
</style>