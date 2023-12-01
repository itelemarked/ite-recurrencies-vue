
<template>
  <ion-item-sliding ref="itemSlidingRef">
    <ion-item lines="none">
      <ion-label>
        <h2>{{ recurrency.title }}</h2>
        <p>Last event: {{ recurrency.lastEvent }}</p>
        <p>Period: {{ recurrency.period.nb }} {{ recurrency.period.unit }}</p>
        <p>Expires: '####' (30 days left)</p>
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

<style scoped></style>


<script setup lang="ts">
  import { IonItemSliding, IonItem, IonLabel, IonProgressBar, IonItemOptions, IonItemOption, IonIcon } from '@ionic/vue'
  import { createOutline, trashOutline } from "ionicons/icons"
import { ref } from 'vue';

  defineProps(['recurrency'])

  const emits = defineEmits(['edit', 'delete'])

  const itemSlidingRef = ref()

  function onSlidingItemButtonClick(event: 'edit' | 'delete') {
    emits(event)
    itemSlidingRef.value.$el.close()
  }

</script>
