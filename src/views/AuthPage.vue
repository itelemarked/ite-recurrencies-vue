
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

      <div class="email-control ion-padding-top">
        <ion-label>Email</ion-label>
        <ion-item>
          <ion-input
            type="email"
            v-model="emailCtrl.value"
            @ion-blur="emailCtrl.isTouched = true"
          ></ion-input>
        </ion-item>
      </div>

      <div class="ion-padding-top">
        <ion-label>Password</ion-label>
        <ion-item>
          <ion-input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
          ></ion-input>
          <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
          <ion-button slot="end" fill="clear" @click="showPassword = !showPassword">
            <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
            <ion-icon :icon="showPassword ? eyeOffOutline : eyeOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-item>
      </div>

      <div class="ion-padding-top">
        <ion-button @click="onLogin">Login</ion-button>
        <ion-button @click="onSignup">Signup</ion-button>
        <ion-button @click="onLogout">Logout</ion-button>
      </div>

      <p>
        user: {{ userEmail }}
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
</style>

<script setup lang="ts">
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonInput, IonLabel, IonItem, IonButton, IonIcon } from '@ionic/vue';
  import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
  import { computed, reactive, ref, watch } from 'vue';
  import { authService } from '../services/AuthService';

  const password = ref('')

  const emailCtrl = reactive({
    isTouched: false,
    isValid: false,
    value: ''
  })

  const emailCtrlClasses = computed(() => {
    const EMAIL_REGEX = / /
    return {
      'email-control-touched': emailCtrl.isTouched,
      'email-control-invalid': EMAIL_REGEX.test(emailCtrl.value)
    }
  })

  const emailCtrl2 = {
    classes: computed(() => {
      return {'some-classes-here': true}
    })
  }

  const showPassword = ref(false)

  const userEmail = computed(() => {
    if (authService.user.value === null) {
      return 'not logged in...'
    } else {
      return authService.user.value!.email
    }
  })

  function onLogin() {
    authService.login(emailCtrl.value, password.value)
    .then(() => {
      emailCtrl.value = ''
      password.value = ''
      console.log('resolved!')
    })
    .catch((err) => {
      console.log('rejected')
      console.log(err)
    })
    
  }

  function onLogout() {
    authService.logout()
    emailCtrl.value = ''
    password.value = ''
  }

  function onSignup() {
    authService.signup(emailCtrl.value, password.value)
    .then(() => {
      emailCtrl.value = ''
      password.value = ''
    })
    .catch((err) => {
      console.log(err)
    })
  }


  // TEMP, testing watchers!
  watch(authService.user, (newValue, oldValue) => {
    console.log(`User changed. old: ${oldValue?.email}, new: ${newValue?.email}`)
  })

  
</script>