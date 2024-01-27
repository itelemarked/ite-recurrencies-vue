
<template>
  <div class="ite-logout">
    <p class="ion-text-center">User: {{ userValue }}</p>
    <IonButton
      expand="block"
      shape="round"
      color="danger"
      @click="emits('logout')"
    >
      Logout
    </IonButton>
  </div>
</template>

<script setup lang="ts">
  import { IonButton } from '@ionic/vue';
  import { computed } from 'vue';
  // import { useAuth } from '@/modules/Auth/use/useAuth';
  import type { User } from '../interfaces/user';
  
  // const { user, logout } = useAuth()
  const props = defineProps<{
    user: User | null | undefined
  }>()

  const emits = defineEmits<{
    logout: []
  }>()

  const userValue = computed(() => {
    if (props.user === undefined) return 'User is undefined'
    if (props.user === null) return 'User is null'
    return props.user?.email
  })

</script>

<style></style>