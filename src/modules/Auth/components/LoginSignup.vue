

<style scoped>
  ion-item {
    border: 1px solid var(--ion-color-medium);
    border-radius: 5px;
    --inner-padding-end: 0;
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .control-invalid ion-item {
    border-color: var(--ion-color-danger);
  }

  .control-focused ion-item {
    outline: 2.5px solid var(--ion-color-dark);
  }

  .control-focused.control-invalid ion-item {
    outline: 2.5px solid var(--ion-color-danger);
  }

  ion-note {
    font-size: 0.8em;
    color: var(--ion-color-danger);
  }

  .error-wrapper {
    margin-top: 30px;
    border-radius: 5px;
    padding: 10px;
    background-color: var(--ion-color-danger);
    color: var(--ion-color-danger-contrast);
  }

  .login-signup-text-wrapper {
    border-top: 1px solid var(--ion-color-medium);
    margin-top: 30px; 
    text-align: center;
  }
</style>


<template>
  <div class="ite-login-signup">
    <form>

      <div class="email-wrapper">
        <InputControl
          ref="emailCtrl"
          type="text"
          label="Email"
          placeholder="Enter an email"
          :validators="[VALIDATORS.EMAIL]"
          v-model="emailCtrlValue"
        />
      </div>

      <div class="password-wrapper ion-padding-top">
        <InputControl
          ref="passwordCtrl"
          type="password"
          label="Password"
          placeholder="Enter a password"
          :validators="[VALIDATORS.MIN_LENGTH(6)]"
          v-model="passwordCtrlValue"
        />
      </div>

      <div class="button-wrapper ion-padding-top">
        <IonButton
          :disabled="!emailCtrl?.valid || !passwordCtrl?.valid"
          expand="block"
          shape="round"
          :color="loginOrSignup === 'login' ? 'primary' : 'warning'"
          @click="onLoginOrSignup"
        >
          {{ loginOrSignup === 'login' ? 'Login' : 'Signup' }}
        </IonButton>
      </div>

      <div class="error-wrapper" v-if="errors.length !== 0">
        <div v-for="error of errors"> <!-- eslint-disable-line vue/require-v-for-key -->
          {{ error }}
        </div>
      </div>

      <!-- <div style="border-top: 1px solid lightgrey; margin-top: 30px; text-align: center"> -->
      <div class="login-signup-text-wrapper">
        <p v-if="loginOrSignup === 'login'">
          No account yet?
          <ion-text color="warning" @click="loginOrSignup = 'signup'"><u>Signup</u></ion-text>
        </p>
        <p v-if="loginOrSignup === 'signup'">
          Already have an account?
          <ion-text color="primary" @click="loginOrSignup = 'login'"><u>Login</u></ion-text>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { IonButton,IonText } from '@ionic/vue'
  import { ref } from 'vue'
  import InputControl, { VALIDATORS, type Exposed } from '@/modules/Auth/components/InputControl.vue'
  import * as useAuth from '../use/useAuth';


  /** state */
  const loginOrSignup = ref<'login' | 'signup'>('login')
  const errors = ref<string[]>([])
  const { login, signup } = useAuth

  /** email control */
  const emailCtrl = ref<Exposed>()
  const emailCtrlValue = ref<string>('')

  /** password control */
  const passwordCtrl = ref<Exposed>()
  const passwordCtrlValue = ref<string>('')


  function onLoginOrSignup() {
    if (loginOrSignup.value === 'login') {
      onLogin()
    } else {
      onSignup()
    }
  }

  function onLogin() {
    errors.value = []
    login(emailCtrlValue.value, passwordCtrlValue.value)
      .then((usr) => {
        // TO DELETE, TESTING ONLY
        console.log(usr)
      })
      .catch((err) => {
        // TODO: better error message
        errors.value.push(err.code)
      })
  }

  // TODO
  function onSignup() {
    errors.value = []
    signup(emailCtrlValue.value, passwordCtrlValue.value)
      .then((usr) => {
        // TO DELETE, TESTING ONLY
        console.log(usr)
      })
      .catch((err) => {
        // TODO: better error message
        errors.value.push(err.code)
      })
  }

</script>
