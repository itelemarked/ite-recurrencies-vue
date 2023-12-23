
/**
 * TEMP INTERFACES
 */

export interface IUser {
  email: string
  uid: string
}




/**
 * THE CLASS WAY
 */

import { ref } from "vue";
import { auth } from "../../../js/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


class AuthServiceSingleton {

  readonly user = ref<IUser | null>(null)

  constructor() {
    onAuthStateChanged(auth, (usr) => {
      if (usr === null) {
        this.user.value = null
      } else {
        this.user.value = { email: usr.email!, uid: usr.uid }
      }
    })
  }

  async login(email: string, password: string): Promise<void> {
    return signInWithEmailAndPassword(auth, email, password)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err))
  }

  async logout(): Promise<void> {
    return signOut(auth)
  }

  async signup(email: string, password: string): Promise<void> {
    return createUserWithEmailAndPassword(auth, email, password)
    .then(() => Promise.resolve())
    .catch((err) => Promise.reject(err))
  }

}

/**
 * THE ANGULAR WAY
 */
export const authService = new AuthServiceSingleton()

/**
 * THE VUE WAY
 */
// export function useAuthService() {
//   return new AuthServiceSingleton()
// }



/**
 * THE MODULE WAY
 */

//import { reactive, ref, type Ref } from 'vue'
// import { auth, signInWithEmailAndPassword } from '../js/firebase'
// import { onAuthStateChanged, signOut  } from 'firebase/auth';


// const user = ref();

// // this will be triggered only once, by module creation
// onAuthStateChanged(auth, (usr) => {
//   user.value = { email: usr?.email }
//   console.log(`onAuthStateChanged: ${usr?.email}`)
// })


// export function AuthService() {

//   function getUser(): Ref<{email: string} | null> {
//     return user;
//   }

//   async function login(email: string, password: string): Promise<void> {
//     const credentials = await signInWithEmailAndPassword(auth, email, password)
//     return
//   }

//   async function logout(): Promise<void> {
//     return signOut(auth)
//   }

//   return {
//     getUser,
//     login,
//     logout
//   }

// }

