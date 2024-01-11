
<style>
  .ite-input-control {
    /* CSS custom properties */
    --ite-border-color: var(--ion-color-medium);
    --ite-border-radius: 5px;
    --ite-invalid-color: var(--ion-color-danger);
    --ite-focused-border-width: 2.5px;
    --ite-focused-border-color: var(--ion-color-dark);
  }

  .ite-input-control {  
    & ion-item {
      border: 1px solid var(--ite-border-color);
      border-radius: var(--ite-border-radius);
      --inner-padding-end: 0;
      margin-top: 10px;
      margin-bottom: 5px;
    }

    &.input-control-invalid ion-item {
      border-color: var(--ite-invalid-color);
    }

    &.input-control-focused ion-item {
      outline-style: solid;
      outline-width: var(--ite-focused-border-width);
      outline-color: var(--ite-focused-border-color);
    }

    &.input-control-focused.input-control-invalid ion-item {
      outline-color: var(--ite-invalid-color);
    }

    & ion-note {
      font-size: 0.8em;
      color: var(--ite-invalid-color);
    }
  }
</style>


<template>
  <div>
    <IonInput
      type="text"
      :value="props.modelValue.value"
      @ionChange="onChange"
    />
  </div>
</template>


<script setup lang="ts">
  import { IonInput } from '@ionic/vue';
  import { FormControl } from './models';
import { ref } from 'vue';

  const props = defineProps<{
    // FormControl type not working... WTF!!
    modelValue: any
  }>()

  const emit = defineEmits<{
    'update:modelValue': [formControl: FormControl]
  }>()

  const showPassword = ref(false)

  function onChange(e: CustomEvent) {
    const newValue = (e.target as HTMLInputElement).value
    const newFormControl = (props.modelValue as FormControl).setValue(newValue)
    emit('update:modelValue', newFormControl)
  }

  function onFocus() {}

  function onBlur() {}
</script>


