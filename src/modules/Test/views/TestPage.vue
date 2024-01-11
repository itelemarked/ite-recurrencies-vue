
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

      <InputControl2
        v-model="f"
      />

      <p>
        f.value {{ f.value }}
      </p>

      <!-- <div class="ion-padding-top">
        <InputControl
          ref="emailCtrl"
          type="text"
          label="Email"
          initialValue="Some initial value"
          :validators="[VALIDATORS.email]"
        ></InputControl>
      </div>
      
      <div class="ion-padding-top">
        <InputControl
          ref="passwordCtrl"
          type="password"
          label="Password"
          :validators="[VALIDATORS.minLength(6), VALIDATORS.hasCapitalCharacter, VALIDATORS.hasDigit, VALIDATORS.hasSpecialCharacter]"
        ></InputControl>
      </div>

      <p>emailCtrl.value: {{ emailCtrl?.value }}</p>
      <p>emailCtrl.dirty: {{ emailCtrl?.dirty }}</p>
      <p>emailCtrl.touched: {{ emailCtrl?.touched }}</p>
      <p>emailCtrl.focused: {{ emailCtrl?.focused }}</p>
      <p>emailCtrl.valid: {{ emailCtrl?.valid }}</p>

      <div class="ion-padding-top">
        <ion-button>
          Button
        </ion-button>
        <ion-button
          :disabled="!emailCtrl?.valid || !passwordCtrl?.valid"
          v-if="loginOrSignup === 'login'"
          expand="block"
          shape="round"
          @click="onLogin"
          >
          Login
        </ion-button>
      </div> -->

    </ion-content>
  </ion-page>
</template>

<style scoped>
  
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonButton } from '@ionic/vue';
  import { nextTick, onMounted, onUpdated, reactive, ref, type Ref } from 'vue';
  import { InputControl, VALIDATORS, type Exposed } from '../components/InputControl'
  import InputControl2 from '../components/InputControl2/InputControl2.vue'
  import { FormControl } from '../components/InputControl2/models';

  const emailCtrl = ref<Exposed>()
  const passwordCtrl = ref<Exposed>()

  const f = ref(new FormControl({
    value: 'abcd'
  }))

  // const f = new FormControl({
  //   value: 'abcd'
  // })
  

</script>