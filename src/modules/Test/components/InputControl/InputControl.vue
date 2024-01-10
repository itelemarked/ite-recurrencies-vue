
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
  <div 
    class="ite-input-control"  
    :class="{
      'input-control-focused': focused,
      'input-control-invalid': !valid
    }"
  >
    <ion-label>
      {{ label }}
      <!-- <p>valid: {{ valid }}</p> -->
    </ion-label>

    <ion-item class="ion-item">
      <ion-input
        :type="typeMode"
        :value="val"
        @ionChange="onChange"
        @ionFocus="onFocus"
        @ionBlur="onBlur"
      ></ion-input>

      <ion-button v-if="type === 'password'" slot="end" fill="clear" @click.stop.prevent="showPassword = !showPassword"> <!-- eslint-disable-line vue/no-deprecated-slot-attribute -->
        <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" color="dark" slot="icon-only"></ion-icon> <!-- eslint-disable-line vue/no-deprecated-slot-attribute -->
      </ion-button>
    </ion-item>

    <ion-note class="ion-padding-top" v-if="!valid" color="danger">
      <!-- eslint-disable-next-line vue/require-v-for-key -->
      <div v-for="error in errors">{{ error }}</div>
    </ion-note>
  </div>
</template>


<script setup lang="ts">
  import { IonLabel, IonItem, IonInput, IonNote, IonButton, IonIcon } from '@ionic/vue';
  import { eyeOffOutline, eyeOutline } from 'ionicons/icons'
  import { computed, ref } from 'vue';
  import type { Props, Validator } from '.';
  

  const props = withDefaults(defineProps<Props>(), {
    initialValue: '',
    type: 'text',
    validators: () => []
  })

  // const props = defineProps(['initialValue', 'validators', 'type', 'label'])

  const val = ref(props.initialValue) /* current value of the control */
  const dirty = ref(false) /* value has been modified at least once */
  const touched = ref(false) /* control has been blurred at least once */
  const focused = ref(false) /* control has currently focus */
  const showPassword = ref(false) /* in mode 'password', the text will be hidden by default */
  
  const errors = computed(() => updatedErrors(val.value, props.validators, dirty.value, touched.value))
  const valid = computed(() => updatedValid(val.value, props.validators, dirty.value, touched.value), {
    onTrigger: (e: any) => {
      console.log(e)
    }
  })
  // const errors = computed(() => [])
  // const valid = computed(() => props.validators === null, {
  //   onTrigger(e) {
  //     console.log(e)
  //   }
  // })

  const typeMode = computed(() => updatedTypeMode(props.type, showPassword.value))

  function updatedErrors(val: string, validators: Validator[], dirty: boolean, touched: boolean): string[] {
    const messages = validators
      .filter((validator) => !validator.condition(val))
      .map(validator => validator.message)
    return dirty && touched ? messages : []
  }

  function updatedValid(val: string, validators: Validator[], dirty: boolean, touched: boolean): boolean  {
    const hasError = updatedErrors(val, validators, dirty, touched).length !== 0
    return !(dirty && touched && hasError)
  }
  // function updatedValid(val: string, validators: Validator[], dirty: boolean, touched: boolean): boolean  {
    
  //   return true
  // }
  

  function updatedTypeMode(type: 'text' | 'password', showPassword: boolean): 'text' | 'password' {
    return type === 'password' && !showPassword ? 'password' : 'text'
  }

  function onChange(e: CustomEvent) {
    val.value = (e.target as HTMLInputElement).value.trim()
    dirty.value = true
  }

  function onFocus() {
    focused.value = true
  }

  function onBlur() {
    focused.value = false
    dirty.value = true
    touched.value = true
  }

  function setVal(newVal: string) {
    val.value = newVal;
  }

  defineExpose({
    setValue: setVal,
    value: computed(() => val.value),
    dirty: computed(() => dirty.value),
    touched: computed(() => touched.value),
    focused: computed(() => focused.value),
    valid: valid,
  })
</script>


