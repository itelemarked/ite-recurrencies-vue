
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
    <IonLabel>{{ modelValue.label }}</IonLabel>
    <IonInput
      type="text"
      :value="modelValue.value"
      @ionChange="onChange"
      @ionFocus="onFocus"
      @ionBlur="onBlur"
    />
  </div>
</template>


<script setup lang="ts">
  import { IonInput, IonLabel } from '@ionic/vue';
  import type { InputControl } from './InputControl.model';

  const props = defineProps<{
    // FormControl type not working... WTF!!
    modelValue: InputControl
  }>()

  const emit = defineEmits<{
    'update:modelValue': [formControl: InputControl]
  }>()

  function onChange(e: CustomEvent) {
    const newValue = (e.target as HTMLInputElement).value
    // const newFormControl = props.modelValue
    //   .setValue(newValue)
    //   .setDirty(true)
    const newFormControl = props.modelValue.update({ value: newValue, dirty: true })
    emit('update:modelValue', newFormControl)
  }

  function onFocus() {
    const newFormControl = props.modelValue
      .setFocused(true)
    emit('update:modelValue', newFormControl)
  }

  function onBlur() {
    const newFormControl = props.modelValue
      .setTouched(true)
      .setFocused(false)
    emit('update:modelValue', newFormControl)
  }
</script>


