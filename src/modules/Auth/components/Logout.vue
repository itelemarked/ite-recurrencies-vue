
<template>
  <div class="ite-logout">
    <p class="ion-text-center">User: {{ userValue }}</p>
    <IonButton
      expand="block"
      shape="round"
      color="danger"
      @click="logout"
    >
      Logout
    </IonButton>
  </div>
</template>

<script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  import { computed } from 'vue';
  import { useAuth } from '@/modules/Auth/use/useAuth';
  
  const { user, logout } = useAuth()
  const userValue = computed(() => {
    if (user.value === undefined) return 'User is undefined'
    if (user.value === null) return 'User is null'
    return user.value?.email
  })

</script>

<style></style>