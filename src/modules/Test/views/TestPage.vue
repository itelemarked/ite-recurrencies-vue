
<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>TEST</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content class="ion-padding">

      <!-- <InputControl v-model="ctrl"/>

      <p>
        value: {{ ctrl.value }} <br/>
        label: {{ ctrl.label }} <br/>
        type: {{ ctrl.type }}<br/>
        validators: {{ ctrl.validators }}<br/>
        focused: {{ ctrl.focused }}<br/>
        touched: {{ ctrl.touched }}<br/>
        dirty: {{ ctrl.dirty }}<br/>
        showPassword: {{ ctrl.showPassword }}<br/>
        errorMessages: {{ ctrl.errors() }}
      </p> -->

      <InputControl
        ref="emailCtrlRef"
        type="password"
        label="Email"
        placeholder="Enter an email..."
        v-model="emailCtrl.value"
      />

      <p>
        emailCtrl.value: {{ emailCtrl.value }} <br/>
        emailCtrlRef.value: {{ emailCtrlRef?.value }} <br/>
        emailCtrlRef.dirty: {{ emailCtrlRef?.dirty }} <br/>
        emailCtrlRef.touched: {{ emailCtrlRef?.touched }} <br/>
        emailCtrlRef.valid: {{ emailCtrlRef?.valid }} <br/>
        emailCtrlRef.errors: {{ emailCtrlRef?.errors }} <br/>
      </p> 

      <IonButton :disabled="!emailCtrlRef?.touched || !emailCtrlRef?.dirty || !emailCtrlRef?.valid">Btn</IonButton>

    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton } from '@ionic/vue';
  import { ref } from 'vue';

  import InputControl, { type Validator, type Exposed, VALIDATORS } from '../components/InputControl/InputControl.vue';

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