

<style scoped>
.container {
  border: 1px solid white;
  border-radius: 10px;
  padding: 10px;
}
</style>


<template>
  <div class="container">
    <p>{{ todo.name }}</p>
    Completed?
    <!-- <input
      v-model="completedInputModel"
      type="checkbox"
    /> -->
    <input
      type="checkbox"
      :checked="props.todo.completed"
      @input="onChange"
    />
  </div>
</template>


<script setup lang="ts">
import { type Todo } from './Todo.model';

const props = defineProps<{
  todo: Todo;
}>();

const emit = defineEmits<{
  'update-completed': [value: Todo]
}>()

// const completedInputModel = computed({
//   // getter
//   get() {
//     return props.todo.completed
//   },
//   // setter
//   set(newValue: boolean) {
//     emit('update-completed', {...props.todo, completed: newValue})
//   }
// })

function onChange(e: Event) {
  console.log(e)
  const newValue = (e.target as HTMLInputElement).checked
  emit('update-completed', {...props.todo, completed: newValue})
}
</script>

