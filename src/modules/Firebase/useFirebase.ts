
import { QueryDocumentSnapshot, collection, getDocs, getFirestore, type DocumentData, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { useAuth } from "../Auth/use/useAuth";

import { firebaseApp } from ".";
import { watch } from "vue";
import type { Recurrency } from "@/modules/Recurrencies/models/Recurrency";

const db = getFirestore(firebaseApp)

const user = useAuth().user

const coll = collection(db, `users/${user?.value?.uid}/recurrencies`)

// export async function get(user: User | null | undefined, )



// export type Subscription = Unsubscribe

// interface GetList<T> {
//   once: () => Promise<T[]>
//   subscribe: (callback: (data: T[]) => void) => Unsubscribe
// }

// type CollectionName = keyof typeof STORES

// const STORES = {
//   'recurrencies': {
//     fromFirestore: (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Recurrency => {
//       const id = doc.id
//       const {title, period, lastEvent} = doc.data()
//       return {id, title, period, lastEvent}
//     }
//   }
// }


// async function getDocsOnce<T>(collectionName: CollectionName): Promise<T[]> {
//   const user = useAuth().user
//   if(user === null || user === undefined) return [] as T[]

//   const coll = collection(db, `users/${user?.value?.uid}/recurrencies`)

//   const query = await getDocs(coll);

//   return query.docs.map(doc => STORES[collectionName].fromFirestore(doc)) as T[]
// }

// function subscribeToCollectionChanges<T>(collectionName: CollectionName, callback: (data: T[]) => void) {
//   const user = useAuth().user
//   if(user === null || user === undefined) return (() => {}) as Unsubscribe

//   const query = collection(db, `users/${user?.value?.uid}/${collectionName}`)

//   return onSnapshot(query, (data) => {
//     const convertedDocs= data.docs.map(doc => STORES[collectionName].fromFirestore(doc)) as T[]
//     callback(convertedDocs)
//   });
// }


// export function getList<T>(collectionName: CollectionName): GetList<T> {
//   return {
//     once: () => getDocsOnce(collectionName),
//     subscribe: (callback: (data: T[]) => void) => subscribeToCollectionChanges(collectionName, callback)
//   }
// }



export function TEST() {
  const query = collection(db, `users`)
  console.log(query.type)
}
// firebase.get('recurrencies/AXSjsine7880n8')
// firebase.set('recurrencies/AXSjsine7880n8', {lastEvent: '2023-01-01', periode: {nb: 2, unit:'days', title:'Some event'}})
// firebase.update('recurrencies/AXSjsine7880n8', {title: 'An other title'})
// firebase.delete('recurrencies/AXSjsine7880n8')