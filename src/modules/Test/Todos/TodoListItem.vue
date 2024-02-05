<style>

</style>


<template>
  <IonItem>
    <IonLabel>
      Title: {{ todo.title }} <br>
      <span style="font-size: 0.8em;">Completed: {{ todo.completed }}</span> <br>
      <span style="font-size: 0.8em;">id: {{ todo.id }}</span>
    </IonLabel>
    <IonButton @click="deleteTodo">Delete Todo</IonButton>
  </IonItem>
</template>


<script setup lang="ts">
  import { IonItem, IonLabel, IonButton } from '@ionic/vue';
  import { type Todo } from './Todo'
  import * as useTodos from './useTodos'

  const props = defineProps<{
    todo: Todo
  }>()

  function deleteTodo() {
    useTodos.deleteTodo(props.todo.id)
  }
</script>

../Todos/Todo./useTodos