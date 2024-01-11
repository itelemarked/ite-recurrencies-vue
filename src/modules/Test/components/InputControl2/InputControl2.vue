

<style>

</style>


<template>
  <div>
    <IonInput
      type="text"
      :value="props.modelValue.value"
      @ionChange="onInput"
    />
  </div>
</template>

<script setup lang="ts">
  import { IonInput } from '@ionic/vue';
  import { FormControl } from './models';

  const props = defineProps<{
    // FormControl type not working... WTF!!
    modelValue: any
  }>()

  const emit = defineEmits<{
    'update:modelValue': [formControl: FormControl]
  }>()

  function onInput(e: CustomEvent) {
    const newValue = (e.target as HTMLInputElement).value

    const newFormControl = props.modelValue.setValue(newValue)
    emit('update:modelValue', newFormControl)
  }
</script>


