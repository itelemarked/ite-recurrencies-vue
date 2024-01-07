
<template>
  <div class="form-control-input">
    <ion-label>
      <div v-for="error in errors">
        {{ error }}
      </div>
    </ion-label>
    <ion-item>
      <ion-input
        type="text"
        :value="value"
        @ionChange="onChange"
        @ionFocus="onFocus"
        @ionBlur="onBlur"
      ></ion-input>
    </ion-item>
  </div>
</template>


<script setup lang="ts">
  import { IonLabel, IonItem, IonInput } from '@ionic/vue';
  import { computed, ref } from 'vue';

  const props = defineProps<{
    type?: 'text' | 'password',
    initialValue?: string,
    errors?: {
      condition: (val: string) => boolean, 
      message: string
    }[]
  }>()

  const emit = defineEmits<{
    valueChange: [value: string]
  }>()

  const value = ref(props.initialValue ?? '')
  const dirty = ref(false) /* value has been modified at least once */
  const touched = ref(false) /* control has been blurred at least once */
  const focused = ref(false) /* control has currently focus */

  const errors = computed(() => {
    return props.errors?.
    filter((val) => val.condition(value.value))
    .map(error => error.message)
  })

  function onChange(e: CustomEvent) {
    value.value = (e.target as HTMLInputElement).value
    dirty.value = true
    emit('valueChange', (e.target as HTMLInputElement).value)
  }

  function onFocus() {
    focused.value = true
  }

  function onBlur() {
    focused.value = false
    touched.value = true
  }

  defineExpose({
    value: computed(() => value.value),
    dirty: computed(() => dirty.value),
    touched: computed(() => touched.value),
    focused: computed(() => focused.value)
  })
</script>


<style>

</style>





<!-- 

  <FormControl
    type="text"
    v-model="email"
    :pattern="
      {
        validator: () => {}
      }
    "
  ></FormControl>

-->



<!-- <template>
  <div class="form-control-input ion-padding-top" :class="{ 'input-text-invalid': errors.length !== 0 }">
    <ion-label>Email</ion-label>

    <ion-item>
      <ion-input
        :type="type"
        :value="modelValue"
        @ionChange="$emit('update:modelValue', $event.target.value)"
        @ionFocus="onFocus"
        @ionBlur="onBlur"
      ></ion-input>

      <ion-button
        slot="end"
        fill="clear"
        @click="show = !show"
      >
        <ion-icon
          :icon="show ? eyeOffOutline : eyeOutline"
          color="dark"
          slot="icon-only"
        ></ion-icon>
      </ion-button>
    </ion-item>

    <ion-note class="ion-padding-top" v-if="errors.length !== 0" color="danger">
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

  const props = defineProps(['modelValue'])
  const emits = defineEmits(['update:modelValue'])

  const touched = ref(false);
  const onBlur = (e: CustomEvent) => {
    touched.value = true;
  }

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
</style> -->


