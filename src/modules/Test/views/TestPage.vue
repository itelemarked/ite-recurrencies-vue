
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

      <InputControl v-model="ctrl"/>

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
      </p>


    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton } from '@ionic/vue';
  import { ref, type Ref } from 'vue';

  import InputControl from '../components/InputControl/InputControl.vue';
  import { InputControl as InputControlModel } from '../components/InputControl/InputControl.model'
  
  const validator_required = {
    validWhen: (val: string) => val.trim() !== '',
    invalidMessage: 'Cannot be void...'
  }

  const ctrl = ref(new InputControlModel({
    label: 'some label',
    validators: [validator_required],
    value: 'aaa'
  })) as Ref<InputControlModel>

</script>