

<style>

</style>



<template>
  <p>CHILD COMPONENT</p>
  <p>firstname: {{ modelValue.firstname }}</p>
  <p>lastname: {{ modelValue.lastname }}</p>
</template>

<script setup lang="ts">
  import { type User } from './models';

  const props = defineProps(['modelValue'])
  const emit = defineEmits(['update:modelValue'])

  // setTimeout(() => {
  //   emit('update:modelValue', {firstname: 'Jane', lastname: 'birkin'})
  // }, 3000);
  
</script>


<!-- <template>
  <span>My input</span> <input v-model="model">
</template>


<script setup lang="ts">
  const model = defineModel()
</script> -->

