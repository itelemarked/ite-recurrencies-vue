import { ref } from "vue"

/* DIFFERENT INSTANCES */
export function useCounter() {
  
  const counter = ref(99)

  function increase() {
    counter.value++
  }

  function decrease() {
    counter.value++
  }

  return {
    counter,
    increase,
    decrease
  }
}