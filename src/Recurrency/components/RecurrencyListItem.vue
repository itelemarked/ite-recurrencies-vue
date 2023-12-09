
<template>
  <ion-item-sliding ref="itemSlidingRef">
    <ion-item lines="none">
      <ion-label>
        <h2>{{ title }}</h2>
        <p>Last event: {{ lastEvent }}</p>
        <p>Period: {{ periodString }}</p>
        <p>Expires: {{ expiry }} (30 days left)</p>
      </ion-label>
    </ion-item>
    
    <ion-item-options>
      <ion-item-option color="light">
        <!--eslint-disable-next-line vue/no-deprecated-slot-attribute-->
        <ion-icon slot="icon-only" :icon="createOutline" @click="onSlidingItemButtonClick('edit')"></ion-icon>
      </ion-item-option>
      <ion-item-option color="danger">
        <!--eslint-disable-next-line vue/no-deprecated-slot-attribute-->
        <ion-icon slot="icon-only" :icon="trashOutline" @click="onSlidingItemButtonClick('delete')"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>

  <ion-progress-bar :value="0.7" color="warning"></ion-progress-bar>
</template>


<style scoped>

</style>


<script setup lang="ts">
  import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonProgressBar } from '@ionic/vue';
  import { createOutline, trashOutline } from 'ionicons/icons';
  import type { Recurrency } from '../models/Recurrency';
  import { computed } from 'vue';

  const props = defineProps<{recurrency: Recurrency}>()
  const emits = defineEmits<{
    delete: [id: number]
    edit: [value: string]
  }>()
  
  const OFFSET = '+01:00'

  const title = computed(() => props.recurrency.title)
  const lastEvent = computed(() => props.recurrency.lastEvent.getCHDateString(OFFSET))
  const periodString = computed(() => {
    const nb = props.recurrency.period.nb;
    const unit = props.recurrency.period.unit;
    const unitString = nb <= 1 ? singular(unit) : plural(unit)
    return `${nb} ${unitString}`
  })
  const expiry = computed(() => {
    /**
     * expiry corresponds to the moment when the recurrency has shortly expired! --> concretely, 1 milliseconds after the recurrency period, bringing it on the next day...
     */
    const { lastEvent } = props.recurrency
    const { nb, unit } = props.recurrency.period
    console.log(`lastEvent: ${lastEvent.getFullString(OFFSET)}`)
    console.log(`expiry: ${lastEvent.add(nb, unit).add(1, 'milliseconds').getFullString(OFFSET)}`)
    return lastEvent.add(nb, unit).add(1, 'milliseconds').getCHDateString(OFFSET)
  })

  function onSlidingItemButtonClick(role: 'edit' | 'delete') {}

  function singular(str: string): string {
    if (str[str.length - 1] === 's') return str.slice(0, -1);
    return str;
  }

  function plural(str: string): string {
    if (str[str.length - 1] === 's') return str;
    return `${str}s`
  }
</script>
