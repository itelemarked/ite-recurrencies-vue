<template>
  <div class="input-text ion-padding-top" :class="{ 'input-text-invalid': errors.length !== 0 }">
    <ion-label>Email</ion-label>

    <ion-item>
      <ion-input
        type="text"
        :value="modelValue"
        @ionChange="$emit('update:modelValue', $event.target.value)"
        @ionBlur="onBlur"
      ></ion-input>
    </ion-item>

    <ion-note class="ion-padding-top" v-if="errors.length !== 0" color="danger">
      <!-- eslint-disable-next-line vue/require-v-for-key --> 
      <div v-for="error in errors">{{ error }}</div>
    </ion-note>
  </div>
</template>


<script setup lang="ts">
  import { computed, ref } from 'vue';
  import {
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonNote
  } from '@ionic/vue'

  const props = defineProps(['pattern', 'modelValue'])
  const emits = defineEmits(['update:modelValue'])

  const touched = ref(false);
  const onBlur = (e: CustomEvent) => {
    touched.value = true;
  }

  const errors = computed(() => {
    if(!touched.value) return []
    const validValue = props.pattern.test(props.modelValue)
    if (validValue) return []
    
    return ['Invalid value']
  })

</script>


<style>
  ion-item {
    border: 1px solid var(--ion-color-medium);
    border-radius: 5px;
    --inner-padding-end: 0;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .input-text-invalid ion-item {
    border-color: var(--ion-color-danger);
  }

  ion-note {
    font-size: 0.8em;
    color: var(--ion-color-danger);
  }
</style>
