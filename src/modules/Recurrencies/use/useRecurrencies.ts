import { computed, ref, type Ref } from "vue"
import type { Recurrency } from "../models/Recurrency"
import { getFirestore } from "firebase/firestore"
import { firebaseApp } from "@/modules/Firebase"
import type { User } from "@/modules/Auth/interfaces/user"


const _recurrencies: Ref<Recurrency[]> = ref([])
const db = getFirestore(firebaseApp)


// function getRecurrencies(user: User): Recurrency[] {

// }

