import { computed, ref } from "vue";
import { auth } from "../../../libs/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


export interface IUser {
  email: string
  uid: string
}

/* 
* User is undefined if it hasn't been fetched, null if logged out, a IUser instance otherwise.
* Globally defined in order to be a singleton
*/
const _user = ref<IUser | null | undefined>()

export function useAuth() {

  /* a read only user */
  const user = computed(() => _user.value)

  onAuthStateChanged(auth, (usr) => {
    if (usr === null) {
      _user.value = null
    } else {
      _user.value = { email: usr.email!, uid: usr.uid }
    }
  })

  async function login(email: string, password: string): Promise<IUser> {
    return signInWithEmailAndPassword(auth, email, password)
    // .then(() => Promise.resolve())
    .then((credentials) => {
      const { uid } = credentials.user
      return Promise.resolve({email, uid})
    })
    .catch((err) => Promise.reject(err))
  }

  async function logout(): Promise<void> {
    return signOut(auth)
  }

  async function signup(email: string, password: string): Promise<IUser> {
    return createUserWithEmailAndPassword(auth, email, password)
    .then((credentials) => {
      const { uid } = credentials.user
      return Promise.resolve({email, uid})
    })
    .catch((err) => Promise.reject(err))
  }

  return {
    user,
    login,
    logout,
    signup
  }

}