
<style scoped>
  
</style>


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

      <p>Todos</p>

      <ion-item>
        <ion-label>Title</ion-label>
        <ion-input type="text" v-model="todoTitle"></ion-input>
      </ion-item>
      <ion-button @click="saveTodo">save Todo</ion-button>

      <div>
        <div v-for="todo in todos">
        <TodoListItem
          :todo="todo"
        />
        </div>
      </div>


    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
  import { IonPage, IonHeader, IonTitle, IonButtons, IonToolbar, IonMenuButton, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue'
  import { ref } from 'vue';
  import TodoListItem from '../components/TodoListItem.vue';
  import { type Todo } from '../interface/Todo';
  import * as useTodos from '../use/useTodos'
  
  const todoTitle = ref('')

  const todos = useTodos.todos

  function saveTodo() {
    const title = todoTitle.value
    const completed = false
    useTodos.addTodo({title, completed})
  }


</script>