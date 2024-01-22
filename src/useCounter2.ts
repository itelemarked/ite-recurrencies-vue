import { ref } from "vue"

/* SINGLETON */
const counter = ref(88)

export function useCounter() {
  
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

