<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<!-- eslint-disable vue/require-v-for-key -->

<template>
  <div class="login-signup">

    <div class="email-control ion-padding-top" :class="{'control-invalid': !emailCtrl.valid.value}">
      <ion-label>Email</ion-label>

      <ion-item>
        <ion-input
          type="email"
          @ion-change="emailCtrl.onChange"
          @ion-blur="emailCtrl.onBlur"
        ></ion-input>
      </ion-item>

      <ion-note v-if="emailCtrl.errors.value.length !== 0" color="danger">
        <div v-for="error in emailCtrl.errors.value">{{ error }}</div>
      </ion-note>
    </div>

    <!-- <div :class="passwordCtrl.classes.value" class="password-control ion-padding-top">
      <ion-label>Password</ion-label>

      <ion-item>
        <ion-input
          :type="passwordCtrl.show.value ? 'text' : 'password'"
          v-model="passwordCtrl.val.value"
          @ion-blur="passwordCtrl.isTouched.value = true"
        ></ion-input>

        <ion-button
          slot="end"
          fill="clear"
          @click="passwordCtrl.show.value = !passwordCtrl.show.value"
        >
         
          <ion-icon
            :icon="passwordCtrl.show.value ? eyeOffOutline : eyeOutline"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
      </ion-item>

      <div
        class="error-messages"
        v-if="passwordCtrl.isTouched.value && !passwordCtrl.isValid.value"
      >
        <div v-for="msg in passwordCtrl.errorMessages.value">
          {{ msg }}
        </div>
      </div>
    </div> -->

    <!-- <div class="ion-padding-top">
      <ion-button @click="onLogin">Login</ion-button>
      <ion-button @click="onSignup">Signup</ion-button>
    </div> -->

    <!-- TEMP -->
    <!-- <p>user: {{ userEmail }}</p> -->
  </div>
</template>


<style>
  ion-item {
    border: 1px solid var(--ion-color-medium);
    border-radius: 5px;
    --inner-padding-end: 0;
    margin-top: 10px;
  }

  .control-invalid ion-item {
    border-color: var(--ion-color-danger);
  }

  ion-note {
    font-size: 0.7em;
    color: var(--ion-color-danger);
  }
</style>


<script setup lang="ts">
  import {
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonIcon,
    IonNote
  } from '@ionic/vue'
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons'
  import { computed, reactive, ref, watch } from 'vue'
  import { authService } from '../services/AuthService'

   /*
    email control
  */
  const emailCtrl = (function() {
    const touched = ref(false)

    const valid = ref(true)
    const errors = ref<string[]>([])

    
    function markValidity() {
      
    }
   
    function onChange(e: CustomEvent) {
      const VALID_EMAIL_REGEX = /^\w+@\w+\.\w{2,4}$/
      const target = e.target as HTMLInputElement
      if (!VALID_EMAIL_REGEX.test(target.value) && touched.value === true) {
        valid.value = false,
        errors.value = ['Invalid email...']
      } else {
        valid.value = true,
        errors.value = []
      }
    }

    function onBlur() {
      emailCtrl.touched.value = true
    }

    return { 
      touched,
      valid,
      errors,
      onChange,
      onBlur
    }
  }())

  // const emailCtrlRef = ref()
  // function onChange(e: CustomEvent) {
  //   const VALID_EMAIL_REGEX = /^\w+@\w+\.\w{2,4}$/
  //   const target = e.target as HTMLInputElement
  //   if (VALID_EMAIL_REGEX.test(target.value)) {
  //     emailCtrlRef.value.classList.remove('control-invalid')
  //     emailCtrlRef.value.classList.add('control-valid')
  //   } else {
  //     emailCtrlRef.value.classList.remove('control-valid')
  //     emailCtrlRef.value.classList.add('control-invalid')
  //   }
  // }


</script>
