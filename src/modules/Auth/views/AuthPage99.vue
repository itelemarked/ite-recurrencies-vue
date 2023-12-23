<!-- eslint-disable no-useless-escape -->

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Auth</ion-title>
      </ion-toolbar>
    </ion-header>
  
    <ion-content class="ion-padding">

      <div :class="emailCtrl.classes.value" class="email-control ion-padding-top">
        <ion-label>Email</ion-label>

        <ion-item>
          <ion-input
            type="email"
            v-model="emailCtrl.val.value"
            @ion-blur="emailCtrl.isTouched.value = true"
          ></ion-input>
        </ion-item>

        <ion-note
          v-if="emailCtrl.isTouched.value && !emailCtrl.isValid.value"
          color="danger"
        >Invalid email</ion-note>
      </div>

      <div :class="passwordCtrl.classes.value" class="password-control ion-padding-top">
        <ion-label>Password</ion-label>
        
        <ion-item>
          <ion-input
            :type="passwordCtrl.show.value ? 'text' : 'password'"
            v-model="passwordCtrl.val.value"
            @ion-blur="passwordCtrl.isTouched.value = true"
          ></ion-input>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <ion-button slot="end" fill="clear" @click="passwordCtrl.show.value = !passwordCtrl.show.value">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <ion-icon :icon="passwordCtrl.show.value ? eyeOffOutline : eyeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-item>

        <div class="error-messages" v-if="passwordCtrl.isTouched.value && !passwordCtrl.isValid.value">
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div v-for="msg in passwordCtrl.errorMessages.value">
            {{ msg }}
          </div>
        </div>
      </div>

      <div class="ion-padding-top">
        <ion-button @click="onLogin">Login</ion-button>
        <ion-button @click="onSignup">Signup</ion-button>
        <ion-button @click="onLogout">Logout</ion-button>
      </div>

      <!-- TEMP -->
      <p>
        user: {{ userEmail }}
      </p>

      <BaseInput
        v-model="customCtrl.val.value"
        label="Some Input Element"
        :type="customCtrl.type.value"
        :errors="customCtrl.errors.value"
      ></BaseInput>

      <p>
        custom control value: {{ customCtrl.val.value }}
      </p>


    </ion-content>
  </ion-page>
</template>

<style scoped>
  ion-item {
    border: 1px solid var(--ion-color-medium);
    border-radius: 5px;
    --inner-padding-end: 0;
    margin-top: 10px;
  }

  .control-touched.control-invalid ion-item {
    border-color: var(--ion-color-danger);
  }

  .error-messages {
    font-size: 0.7em;
    color: var(--ion-color-danger);
  }
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonInput, IonLabel, IonItem, IonButton, IonIcon, IonNote } from '@ionic/vue';
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
  import { computed, reactive, ref, watch } from 'vue';
  import { authService } from '../services/AuthService';
  import BaseInput from '@/components/BaseInput.vue'


  /*
    email control
  */
  const emailCtrl = (function() {
    const val = ref('')
    const isTouched = ref(false)
    
    const REGEX = /^\w+@\w+\.\w{2,4}$/
    const isValid = computed(() => {
      return REGEX.test(val.value)
    })

    const classes = computed(() => {
      return {
        'control-touched': isTouched.value,
        'control-invalid': !isValid.value,
        'control-valid': isValid.value,
      }
    })

    return { 
      val ,
      isTouched,
      isValid,
      classes,
    }
  }())

  /*
    password control
  */
  const passwordCtrl = (function () {
    const val = ref('')
    const isTouched = ref(false)
    const show = ref(false)
    
    // const AT_LEAST_NUM_SPECIAL_CAPITAL_8_CHAR_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[*.!@#$%^&(){}\[\]:;<>,.?/~_+\-=|]).{8,}$/
    // const AT_LEAST_ANY_6_CHARACTER_REGEX = /^.{6,}/
    const hasAtLeastOneDigit = computed(() => /\d/.test(val.value))
    const hasAtLeastOneCapitalCharacter = computed(() => /[A-Z]/.test(val.value))
    // eslint-disable-next-line no-useless-escape
    const hasAtLeastOneSpecialCharacter = computed(() => /[*.!@#$%^&(){}\[\]:;<>,.?/~_+\-=|]/.test(val.value))
    const hasAtLeast6Character = computed(() => /.{6,}/.test(val.value))

    const errorMessages = computed(() => {
      const errors = []
      if (!hasAtLeast6Character.value) errors.push('Must have at least 6 characters...')
      if (!hasAtLeastOneDigit.value) errors.push('Must have at least 1 digit...')
      if (!hasAtLeastOneCapitalCharacter.value) errors.push('Must have at least 1 capital letter...')
      if (!hasAtLeastOneSpecialCharacter.value) errors.push('Must have at least 1 special character...')
      return errors;
    })

    const isValid = computed(() => {
      return errorMessages.value.length === 0
    })

    const classes = computed(() => {
      return {
        'control-touched': isTouched.value,
        'control-invalid': !isValid.value,
        'control-valid': isValid.value,
      }
    })

    return {
      val,
      isTouched,
      isValid,
      show,
      classes,
      errorMessages
    }
  }())

  /*
    custom control
  */
  const customCtrl = (function() {
    const val = ref('bbb')
    const type = ref('password')
    const errors = ref(['must be longer', 'must be shorter'])

    return {
      val,
      type,
      errors,
    }
  }())

  

  /*
    user informations
  */
  const userEmail = computed(() => {
    if (authService.user.value === null) {
      return 'not logged in...'
    } else {
      return authService.user.value!.email
    }
  })

  /*
    actions
  */
  function onLogin() {
    authService.login(emailCtrl.val.value, passwordCtrl.val.value)
    .then(() => {
      resetForm()
      console.log('resolved!')
    })
    .catch((err) => {
      console.log('rejected')
      console.log(err)
    })
  }

  function onLogout() {
    authService.logout()
    .then(() => {
      resetForm()
    })
  }

  function onSignup() {
    authService.signup(emailCtrl.val.value, passwordCtrl.val.value)
    .then(() => {
      resetForm()
    })
    .catch((err) => {
      console.log(err)
    })
  }


  /*
    utils
  */
  function resetForm() {
    emailCtrl.val.value = ''
    emailCtrl.isTouched.value = false
    passwordCtrl.val.value = ''
    passwordCtrl.isTouched.value = false
  }


  // TEMP, testing watchers!
  watch(authService.user, (newValue, oldValue) => {
    console.log(`User changed. old: ${oldValue?.email}, new: ${newValue?.email}`)
  })

</script>
  