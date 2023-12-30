<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<!-- eslint-disable vue/require-v-for-key -->

<template>
  <div class="login-signup">
    <div class="email-control ion-padding-top" :class="{ 'control-invalid': !emailCtrl.valid.value, 'control-focused': emailCtrl.focused.value }">
      <ion-label>Email</ion-label>

      <ion-item>
        <ion-input
          type="text"
          v-model="emailCtrl.val.value"
          @ionChange="emailCtrl.onChange"
          @ionBlur="emailCtrl.onBlur"
          @ionFocus="emailCtrl.onFocus"
        ></ion-input>
      </ion-item>

      <ion-note class="ion-padding-top" v-if="emailCtrl.errors.value.length !== 0" color="danger">
        <div v-for="error in emailCtrl.errors.value">{{ error }}</div>
      </ion-note>
    </div>

    <div
      class="password-control ion-padding-top"
      :class="{
        'control-invalid': !passwordCtrl.valid.value,
        'control-focused': passwordCtrl.focused.value
      }"
    >
      <ion-label>Password</ion-label>

      <ion-item>
        <ion-input
          :type="passwordCtrl.show.value ? 'text' : 'password'"
          v-model="passwordCtrl.val.value"
          @ion-change="passwordCtrl.onChange"
          @ion-blur="passwordCtrl.onBlur"
          @ion-focus="passwordCtrl.onFocus"
        ></ion-input>

        <ion-button
          slot="end"
          fill="clear"
          @click="passwordCtrl.show.value = !passwordCtrl.show.value"
        >
          <ion-icon
            :icon="passwordCtrl.show.value ? eyeOffOutline : eyeOutline"
            color="dark"
            slot="icon-only"
          ></ion-icon>
        </ion-button>
      </ion-item>

      <ion-note
        class="ion-padding-top"
        v-if="passwordCtrl.errors.value.length !== 0"
        color="danger"
      >
        <div v-for="error in passwordCtrl.errors.value">{{ error }}</div>
      </ion-note>
    </div>

    <div class="ion-padding-top">
      <ion-button
        :disabled="(!emailCtrl.valid.value || !passwordCtrl.valid.value) || (!emailCtrl.touched.value || !passwordCtrl.touched.value)" 
        v-if="loginOrSignup === 'login'"
        expand="block"
        shape="round"
        @click="onLogin"
        >Login</ion-button
      >
      <ion-button v-if="loginOrSignup === 'signup'" expand="block" shape="round" @click="onSignup"
        >Signup</ion-button
      >
    </div>

    <div class="error-wrapper" v-if="errors.length !== 0">
      <div v-for="error of errors">
        {{ error }}
      </div>
    </div>

    <div style="border-top: 1px solid lightgrey; margin-top: 30px; text-align: center">
      <p v-if="loginOrSignup === 'login'">
        No account yet?
        <ion-text color="primary" @click="loginOrSignup = 'signup'"><u>Signup</u></ion-text>
      </p>
      <p v-if="loginOrSignup === 'signup'">
        Already have an account?
        <ion-text color="primary" @click="loginOrSignup = 'login'"><u>Login</u></ion-text>
      </p>
    </div>

    <!-- TEMP -->
    <!-- <p>user: {{ userEmail }}</p> -->
  </div>
</template>

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
</style>

<script setup lang="ts">
  import { IonInput, IonLabel, IonItem, IonButton, IonIcon, IonNote, IonText } from '@ionic/vue'
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons'
  import { ref } from 'vue'
  import { authService } from '../services/AuthService'

  const loginOrSignup = ref<'login' | 'signup'>('login')

  const errors = ref<string[]>([])

  /*
    email control
  */
  const emailCtrl = (function () {
    /* track if emailCtrl has ever been blurred, for the onChange action */
    const touched = ref(false)

    const focused = ref(false)

    const val = ref('')

    /* render the class for invalid state */
    const valid = ref(true)

    /* render error messages below emailCtrl input */
    const errors = ref<string[]>([])

    function onChange(e: CustomEvent) {
      const target = e.target as HTMLInputElement
      if (!isValidEmail(target.value) && touched.value === true) {
        ;(valid.value = false), (errors.value = ['Invalid email'])
      } else {
        ;(valid.value = true), (errors.value = [])
      }
    }

    function onBlur(e: CustomEvent) {
      const target = e.target as HTMLInputElement
      if (!isValidEmail(target.value)) {
        ;(valid.value = false), (errors.value = ['Invalid email'])
      } else {
        ;(valid.value = true), (errors.value = [])
      }
      touched.value = true
      focused.value = false
    }

    function onFocus(e: CustomEvent) {
      focused.value = true
    }

    function isValidEmail(val: string): boolean {
      const VALID_EMAIL_REGEX = /^[\w-]+@[\w-]+\.\w{2,4}$/
      return VALID_EMAIL_REGEX.test(val)
    }

    return {
      touched,
      val,
      valid,
      errors,
      focused,
      onChange,
      onBlur,
      onFocus
    }
  })()

  /*
    password control
  */
  const passwordCtrl = (function () {
    /* track if emailCtrl has ever been blurred, needed for the onChange action */
    const touched = ref(false)

    const focused = ref(false)

    const val = ref('')

    /* render the class for invalid state */
    const valid = ref(true)

    /* render error messages below emailCtrl input */
    const errors = ref<string[]>([])

    /* if the text must be shown or hidden */
    const show = ref(false)

    function onChange(e: CustomEvent) {
      const target = e.target as HTMLInputElement
      if (!isValidPassword(target.value) && touched.value === true) {
        ;(valid.value = false), (errors.value = getErrorsForValue(target.value))
      } else {
        ;(valid.value = true), (errors.value = [])
      }
    }

    function onBlur(e: CustomEvent) {
      const target = e.target as HTMLInputElement
      if (!isValidPassword(target.value)) {
        ;(valid.value = false), (errors.value = getErrorsForValue(target.value))
      } else {
        ;(valid.value = true), (errors.value = [])
      }
      touched.value = true
      focused.value = false
    }

    function onFocus(e: CustomEvent) {
      console.log('focused!')
      focused.value = true
    }

    function getErrorsForValue(val: string): string[] {
      const hasAtLeastOneDigit = /\d/.test(val)
      const hasAtLeastOneCapitalCharacter = /[A-Z]/.test(val)
      // eslint-disable-next-line no-useless-escape
      const hasAtLeastOneSpecialCharacter = /[*.!@#$%^&(){}\[\]:;<>,.?/~_+\-=|']/.test(val)
      const hasAtLeast6Character = /.{6,}/.test(val)

      const errors: string[] = []
      if (!hasAtLeast6Character) {
        errors.push('Must have at least 6 characters')
      }
      if (!hasAtLeastOneCapitalCharacter) {
        errors.push('Must have at least one capital character')
      }
      if (!hasAtLeastOneDigit) {
        errors.push('Must have at least one digit character')
      }
      if (!hasAtLeastOneSpecialCharacter) {
        errors.push('Must have at least one special character')
      }

      return errors
    }

    function isValidPassword(val: string): boolean {
      return getErrorsForValue(val).length === 0
    }

    return {
      touched,
      val,
      focused,
      valid,
      errors,
      show,
      onChange,
      onBlur,
      onFocus
    }
  })()

  function onLogin() {
    authService.login(emailCtrl.val.value, passwordCtrl.val.value)
    .then(() => {
      // TODO: add a usr argument to the resolve promise
      console.log(authService.user)
    })
    .catch((err) => {
      errors.value.push(err.code)
    })
  }

  function onSignup() {}

</script>
