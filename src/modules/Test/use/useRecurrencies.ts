import { ref, watch, type Ref, reactive } from "vue"
import type { User } from "../../Auth/interfaces/user"
import type { Recurrency } from "../../Recurrencies/models/Recurrency"





  
// function get<T>(path: string[]): Ref<T> {
//   const data = MOCK.recurrencies
//   return ref(data) as Ref<T>
// }

// function createRecurrency(): Recurrency {
//   return {
//     id: Math.random().toString(),
//     title: 'aaa',
//     period: {nb: 2, unit: 'days'},
//     lastEvent: '2023-01-01'
//   }
// }

// setInterval(() => {
//   recurrencies.value.push(createRecurrency())
// }, 1000)



export const recurrencies$: Ref<Recurrency[]> = ref([])




export function TEST() {

}










// /* THE STORE MUST HAVE FOLLOWING METHODS */
// interface Store<T> {
//   get: (path: string[]) => Promise<T>,
//   TEST: () => void
// }

// /* THE STORE WILL RETURN FOLLOWING TYPES (IT WILL PARSE THE ARRAYS AS WELL) */
// type StoreDatas = Recurrency

// type STORE = Store<StoreDatas | StoreDatas[]>


// export default (function store(): Store<StoreDatas | StoreDatas[]> {
  
//   function get<T>(path: string[]): Promise<T> {
//     // const r: Recurrency = {
//     //   id: 'abc',
//     //   title: 'abc',
//     //   period: {
//     //     nb: 2,
//     //     unit: 'days'
//     //   },
//     //   lastEvent: '2023-01-01'
//     // }
//     const r: User = {
//       uid: 'abc',
//       email: 'aaa'
//     }
//     return Promise.resolve(r) as Promise<T>
//   }





//   function TEST() {
//     get(['abcd']).then(console.log)
//   }


//   return {
//     get,
//     TEST
//   }

// }())



