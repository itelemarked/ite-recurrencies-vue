import { computed, ref, watch, type WatchOptions, type WatchStopHandle } from "vue"
import { QueryDocumentSnapshot, collection, onSnapshot, type DocumentData, addDoc, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore"
import type { Unsubscribe } from "firebase/database"

import { db } from "@/modules/Firebase/firebase"
import type { User } from "@/modules/Auth/interfaces/user"
import type { Recurrency } from "@/modules/Recurrencies/models/Recurrency"
import * as useAuth from "@/modules/Auth/use/useAuth"


type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

/* a private reference used for this module only, listen to change and keep an updated value of the datas */
const _recurrencies = ref<Recurrency[]>([]);

/* the firebase ref for 'recurrencies', depends on current user */
const recurrenciesCollectionRef = (user: User) => collection(db, `users/${user.uid}/recurrencies`)
const recurrencyDocRef = (user: User, recurrencyId: string) => doc(db, 'users', user.uid, 'recurrencies', recurrencyId)

/* a getter utility function */
function _toRecurrency(recurrencyData: QueryDocumentSnapshot<DocumentData, DocumentData>): Recurrency {
  const id = recurrencyData.id
  const data = recurrencyData.data()
  return { id, ...data } as Recurrency
}

/* a getter utility function */
function _userChangeWatcher(callback: (newRecurrencies: Recurrency[]) => void) {

  let unsubscribeToDatasChange: Unsubscribe

  function onUserChange(newUser: User | null) {
    if (unsubscribeToDatasChange !== undefined) unsubscribeToDatasChange()

    if (newUser === null) {
      callback([])
    } else {
      const recurrenciesQuery = recurrenciesCollectionRef(newUser)
      unsubscribeToDatasChange = onSnapshot(recurrenciesQuery, (query) => {
        const mappedRecurrencies = query.docs.map(doc => _toRecurrency(doc))
        callback(mappedRecurrencies)
      })
    }
  }

  return onUserChange
}



/* CRUD Operations - GET (subscribe to changes) */
function onChanges(callback: (newData: Recurrency[]) => void, options?: WatchOptions): WatchStopHandle {
  return watch(_recurrencies, callback, options)
}

/* CRUD Operations - GET (Once) */
async function get(): Promise<Recurrency[]> {
  const recurrencies = computed<Recurrency[]>(() => _recurrencies.value)
  return Promise.resolve(recurrencies.value)
}


/* CRUD Operations - CREATE */
async function add(data: Omit<Recurrency, 'id'>): Promise<void> {
  const user = await useAuth.getCurrentUser()
  if (user === null) return Promise.resolve()

  const recurrenciesQuery = recurrenciesCollectionRef(user)
  try {
    await addDoc(recurrenciesQuery, data)
    return Promise.resolve()
  } catch(err) {
    return Promise.reject(err)
  }
}


/* CRUD Operations - UPDATE */
async function update(dataId: string, dataOptions: DeepPartial<Omit<Recurrency, 'id'>>): Promise<void> {
  const user = await useAuth.getCurrentUser()
  if (user === null) return Promise.resolve()

  const recurrencyQuery = recurrencyDocRef(user, dataId)
  try {
    await updateDoc(recurrencyQuery, dataOptions)
    return Promise.resolve()
  } catch(err) {
    return Promise.reject(err)
  }
}


/* CRUD Operations - DELETE */
async function remove(dataId: string): Promise<void> {
  const user = await useAuth.getCurrentUser()
  if (user === null) return Promise.resolve()

  const recurrencyQuery = recurrencyDocRef(user, dataId)
  try {
    await deleteDoc(recurrencyQuery)
    return Promise.resolve()
  } catch(err) {
    return Promise.reject(err)
  }
}


/* code which will executes on module creation */
(function onCreate() {

  useAuth.onChange(_userChangeWatcher(newRecurrencies => {
    _recurrencies.value = newRecurrencies
  }))

}())


/* exports */
export {
  onChanges,
  get,
  add,
  update,
  remove
}







/** TESTING BELOW!!! */



// watch(recurrencies, (newRecurrencies) => {
//   console.log('recurrencies changed......')
//   console.log(newRecurrencies)
// })


export function TEST() {

  onChanges((newRec) => console.log(newRec), {immediate: true})

  function createRandomRec(): Recurrency {
    const random = Math.random().toString()
    return {
      id: random,
      title: 'title number ' + random,
      period: {nb: 99, unit: 'days'},
      lastEvent: '2024-01-01'
    }
  }



  // setTimeout(async () => {
  //   console.log('----- timeout 1 -----')
  //   const docRef = doc(db, "users/Sob8X5IbKrcEDGUeJrnr2qFMDIh1/recurrencies", 'e8cvX0Tt6qxiLTqeodlo');
  //   const docSnap = await getDoc(docRef);
  //   console.log(docSnap.data())
  // }, 4000);

  // setTimeout(() => {
  //   console.log('----- timeout 2 -----')
  //   add(createRandomRec())
  // }, 2000);

  // setTimeout(() => {
  //   console.log('----- timeout 3 -----')
  //   useAuth.logout()
  // }, 12000);

  // setTimeout(() => {
  //   console.log('----- timeout 4 -----')
  //   useAuth.login('aaa@ite-recurrency.com', '111111')
  // }, 16000);
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








//   return {
//     get,
//     TEST
//   }

// }())



