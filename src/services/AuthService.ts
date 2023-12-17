
/**
 * TEMP INTERFACES
 */

export interface User {
  email: string
}




/**
 * THE CLASS WAY
 */

import { ref, type Ref } from "vue";
import { auth } from "../js/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";


class AuthServiceSingleton {

  user = ref()

  constructor() {
    onAuthStateChanged(auth, (usr) => {
      this.user.value = { email: usr?.email }
      console.log(`onAuthStateChanged: ${usr?.email}`)
    })
  }

  getUser(): Ref<User | null> {
    return this.user;
  }

  async login(email: string, password: string): Promise<void> {
    const credentials = await signInWithEmailAndPassword(auth, email, password)
    return
  }

  async logout(): Promise<void> {
    return signOut(auth)
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

