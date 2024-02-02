import { computed, ref, watch, type WatchOptions } from "vue";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../../Firebase/firebase";
import type { User } from "../interfaces/user";

/* keeps a track of the fetched user */
const _user = ref<User | null>(null)


/* CRUD Operations - GET (subscribe to changes) */
export function onChange(callback: (user: User | null) => void, options?: WatchOptions) {
  watch(_user, callback, options)
}

/* CRUD Operations - GET (Once) */
export function getCurrentUser(): Promise<User | null> {
  const user = computed(() => _user.value)
  return Promise.resolve(user.value)
}

/* CRUD Operations - CREATE (New one) */
export async function login(email: string, password: string): Promise<User> {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    const { uid } = credentials.user
    const user = { uid, email }
    return Promise.resolve(user)
  } catch(err) {
    return Promise.reject(err)
  }
}

/* CRUD Operations - CREATE (existing one) */
export async function signup(email: string, password: string): Promise<User> {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    const { uid } = credentials.user
    const user = { uid, email }
    return Promise.resolve(user)
  } catch(err) {
    return Promise.reject(err)
  }
}

/* CRUD Operations - DELETE */
export async function logout(): Promise<void> {
  try {
    await signOut(auth)
    Promise.resolve()
  } catch(err) {
    Promise.reject(err)
  }
}


(function onCreate() {

  onAuthStateChanged(auth, (usr) => {
    if (usr === null) {
      _user.value = null
    } else {
      _user.value = { email: usr.email!, uid: usr.uid }
    }
  })

}())
