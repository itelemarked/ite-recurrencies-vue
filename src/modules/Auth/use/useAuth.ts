import { computed, ref } from "vue";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { firebaseApp } from "../../Firebase/firebase";
import type { User } from "../interfaces/user";

/* 
* User is undefined if it hasn't been fetched, null if logged out, a IUser instance otherwise.
* Globally defined in order to be a singleton
*/
const _user = ref<User | null>(null)

const auth = getAuth(firebaseApp)

/* a read only user */
export const user = computed<User | null>(() => _user.value)

onAuthStateChanged(auth, (usr) => {
  if (usr === null) {
    _user.value = null
  } else {
    _user.value = { email: usr.email!, uid: usr.uid }
  }
})

export async function login(email: string, password: string): Promise<User> {
  return signInWithEmailAndPassword(auth, email, password)
  // .then(() => Promise.resolve())
  .then((credentials) => {
    const { uid } = credentials.user
    return Promise.resolve({email, uid})
  })
  .catch((err) => Promise.reject(err))
}

export async function logout(): Promise<void> {
  return signOut(auth)
}

export async function signup(email: string, password: string): Promise<User> {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((credentials) => {
    const { uid } = credentials.user
    return Promise.resolve({email, uid})
  })
  .catch((err) => Promise.reject(err))
}
