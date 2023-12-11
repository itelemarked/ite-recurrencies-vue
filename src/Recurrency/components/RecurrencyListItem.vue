
<template>
  <ion-item-sliding ref="itemSlidingRef">
    <ion-item lines="none">
      <ion-label>
        <h2>{{ title }}</h2>
        <p>Last event: {{ lastEvent }}</p>
        <p>Period: {{ periodString }}</p>
        <p>Expires: {{ expiry }} ({{ remainingDaysString }})</p>
      </ion-label>
    </ion-item>
    
    <ion-item-options>
      <ion-item-option color="light" @click="onSlidingItemButtonClick('edit')">
        <!--eslint-disable-next-line vue/no-deprecated-slot-attribute-->
        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
      </ion-item-option>
      <ion-item-option color="danger" @click="onSlidingItemButtonClick('delete')">
        <!--eslint-disable-next-line vue/no-deprecated-slot-attribute-->
        <ion-icon slot="icon-only" :icon="trashOutline"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>

  <ion-progress-bar :value="progress" :color="progressColor"></ion-progress-bar>
</template>


<style scoped>

</style>


<script setup lang="ts">
  import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonProgressBar } from '@ionic/vue';
  import { createOutline, trashOutline } from 'ionicons/icons';
  import { Recurrency } from '../models/Recurrency';
  import { computed, ref } from 'vue';
  import { OFFSET_STRING } from '../services/SettingsService';
  import { DateTime } from '../models/DateTime';

  /**
    inputs/outputs
  */
  
  const props = defineProps<{
    recurrency: Recurrency
  }>()

  const emits = defineEmits<{
    delete: []
    edit: []
  }>()

  const onSlidingItemButtonClick = async (role: 'edit' | 'delete') => {
    itemSlidingRef.value.$el.close()
    emit(role)
  }

  /*
    Template variables
  */
  
  const itemSlidingRef = ref()

  const title = computed(() => props.recurrency.title)

  const lastEvent = computed(() => props.recurrency.lastEvent.getCHDateString(OFFSET_STRING))

  const periodString = computed(() => {
    const nb = props.recurrency.period.nb;
    const unit = props.recurrency.period.unit;
    const unitString = nb <= 1 ? singular(unit) : plural(unit)
    return `${nb} ${unitString}`
  })

  const expiry = computed(() => props.recurrency.getExpiry().getCHDateString(OFFSET_STRING))

  const progress = computed(() => props.recurrency.getProgress())

  const progressColor = computed(() => {
    if (progress.value < 0.66) return 'primary'
    if (progress.value < 1) return 'warning'
    return 'danger'
  })

  const remainingDaysString = computed(() => {
    if (progress.value >= 1) return 'expired...'
    const remainingDaysRounded = Math.floor(DateTime.diff(DateTime.now(), props.recurrency.getExpiry(), 'days'))
    return remainingDaysRounded <= 1 ? `${remainingDaysRounded} day left` : `${remainingDaysRounded} days left`
  })

  /*
    utils
  */
  
  function singular(str: string): string {
    if (str[str.length - 1] === 's') return str.slice(0, -1);
    return str;
  }

  function plural(str: string): string {
    if (str[str.length - 1] === 's') return str;
    return `${str}s`
  }
</script>
