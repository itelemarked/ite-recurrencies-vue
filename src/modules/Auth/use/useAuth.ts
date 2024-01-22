import { computed, ref } from "vue";
import { auth } from "../../../libs/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


export interface IUser {
  email: string
  uid: string
}


const _user = ref<IUser | null | undefined>()

export function useAuth() {

  const user = computed(() => _user.value)

  onAuthStateChanged(auth, (usr) => {
    if (usr === null) {
      _user.value = null
    } else {
      _user.value = { email: usr.email!, uid: usr.uid }
    }
  })

  async function login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err))
  }

  async function logout(): Promise<void> {
    return signOut(auth)
  }

  async function signup(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err))
  }

  return {
    user,
    login,
    logout,
    signup
  }

}