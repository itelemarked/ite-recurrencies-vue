
<!-- ************************************************************

    <template>
      <InputControl
        ref="emailCtrlRef"                    /** optional                    */
        type="text"                           /** optional, defaults to 'text' */
        placeholder="Enter a email..."        /** optional, defaults to ''     */
        label="Email"                         /** optional, defaults to ''     */
        :validators="emailCtrl.validators"    /** optional, defaults to []. The preset VALIDATORS might also be used [e.g VALIDATORS.MIN_LENGTH(6)] */
        v-model="emailCtrl.value"             /** optional                     */
      />

      <p>
        emailCtrl.value: {{ emailCtrl.value }} <br/>

        emailCtrlRef.value: {{ emailCtrlRef?.value }} <br/>
        emailCtrlRef.dirty: {{ emailCtrlRef?.dirty }} <br/>
        emailCtrlRef.touched: {{ emailCtrlRef?.touched }} <br/>
        emailCtrlRef.valid: {{ emailCtrlRef?.valid }} <br/>
        emailCtrlRef.errors: {{ emailCtrlRef?.errors }} <br/>
      </p> 
    </template>

    <script>
      import InputControl, { type Validator, type Exposed } from '../components/InputControl3/InputControl.vue';

      const emailCtrlRef = ref<Exposed>()

      const emailCtrl = ref<{
        value: string,
        validators: Validator[]
      }>({
        value: 'abcd',
        validators: [
          {
            validWhen: (val: string) => val.trim() !== '',
            invalidMessage: 'Cannot be void...'
          }
        ]
      })
    </script>

************************************************************ -->


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
      'input-control-invalid': !valid && touched && dirty
    }"
  >
    <ion-label>
      {{ label }}
    </ion-label>

    <ion-item class="ion-item">
      <ion-input
        :type="typeMode"
        :value="modelValue"
        :placeholder="placeholder"
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
  import { computed, ref, type ComputedRef } from 'vue';

  const props = withDefaults(defineProps<{
    label?: string
    type?: Type,
    placeholder?: string,
    modelValue?: string,
    validators?: Validator[],
  }>(), {
    label: '',
    type: 'text',
    placeholder: '',
    modelValue: '',
    validators: () => []
  })

  const emits = defineEmits<{
    'update:modelValue': [val: string]
  }>()

  /** state */
  const dirty = ref(false) /* value has been modified at least once */
  const touched = ref(false) /* control has been blurred at least once */
  const focused = ref(false) /* control has currently focus */
  const showPassword = ref(false) /* in mode 'password', the text will be hidden by default */
  const errors = ref(updatedErrors(props.modelValue, props.validators, dirty.value, touched.value))
  const valid = ref(updatedValid(props.modelValue, props.validators))
  
  /** computed */
  const typeMode = computed(() => updatedTypeMode(props.type, showPassword.value))

  /** actions */
  function onChange(e: CustomEvent) {
    const newValue = (e.target as HTMLInputElement).value.trim()
    const newDirty = true
    dirty.value = newDirty
    errors.value = updatedErrors(newValue, props.validators, newDirty, touched.value)
    valid.value = updatedValid(newValue, props.validators)
    emits('update:modelValue', newValue)
  }

  function onFocus() {
    focused.value = true
  }

  function onBlur() {
    const newDirty = true
    const newTouched = true
    focused.value = false
    dirty.value = newDirty
    touched.value = newTouched
    errors.value = updatedErrors(props.modelValue, props.validators, newDirty, newTouched)
  }

  /** utils */
  function updatedErrors(val: string, validators: Validator[], dirty: boolean, touched: boolean): string[] {
    const messages = validators
      .filter((validator) => !validator.validWhen(val))
      .map(validator => validator.invalidMessage)
    return dirty && touched ? messages : []
  }

  function updatedValid(val: string, validators: Validator[]): boolean {
    return validators.filter((validator) => !validator.validWhen(val)).length === 0
  }

  function updatedTypeMode(type: 'text' | 'password', showPassword: boolean): 'text' | 'password' {
    return type === 'password' && !showPassword ? 'password' : 'text'
  }

  /** expose */
  defineExpose({
    value: computed(() => props.modelValue),
    dirty: computed(() => dirty.value),
    touched: computed(() => touched.value),
    valid,
    errors
  })
</script>

<script lang="ts">

  export interface Exposed {
    value: ComputedRef<string>
    dirty: ComputedRef<boolean>
    touched: ComputedRef<boolean>
    valid: ComputedRef<boolean>
    errors: ComputedRef<string[]>
  }

  export type Type = 'text' | 'password';

  export interface Validator {
    validWhen: (val: string) => boolean,
    invalidMessage: string
  }

  export const VALIDATORS: {
    EMAIL: Validator,
    MIN_LENGTH: (min: number) => Validator,
    HAS_SPECIAL_CHAR: Validator,
    HAS_DIGIT: Validator,
    HAS_CAPITAL_CHAR: Validator
  } = {
    EMAIL: {
      validWhen: (val: string) => {
        const regex = /^[\w-]+@[\w-]+\.\w{2,4}$/
        return regex.test(val)
      },
      invalidMessage: 'Invalid email...'
    },
    MIN_LENGTH: (min: number) => {
      return {
        validWhen: (val: string) => {
          return val.length >= min
        },
        invalidMessage: `Must have at least ${min} characters...`
      }
    },
    HAS_SPECIAL_CHAR: {
      validWhen: (val: string) => {
        const regex = /[*.!@#$%^&(){}\[\]:;<>,.?/~_+\-=|']/ // eslint-disable-line
        return regex.test(val)
      },
      invalidMessage: `Must have at least one special character...`
    },
    HAS_DIGIT: {
      validWhen: (val: string) => {
        const regex = /\d/
        return regex.test(val)
      },
      invalidMessage: `Must have at least one digit...`
    },
    HAS_CAPITAL_CHAR: {
      validWhen: (val: string) => {
        const regex = /[A-Z]/
        return regex.test(val)
      },
      invalidMessage: `Must have at least one capital letter...`
    }
  }

</script>