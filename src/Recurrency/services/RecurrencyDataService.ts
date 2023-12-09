import { collection, getDocs } from "firebase/firestore";
import { DateTime } from "../models/DateTime";
import { firestore } from "../../_js/firebase";
import type { Recurrency } from "../models/Recurrency";
import { OFFSET_STRING } from "./SettingsService";




class RecurrencyDataService {
  
  async getAll(): Promise<Recurrency[]> {
    const coll = await getDocs(collection(firestore, "recurrencies"));
    return coll.docs.map(doc => {
      const id = doc.id
      const title = doc.data().title
      const lastEvent = DateTime.create({dateString: doc.data().lastEvent, offsetString: OFFSET_STRING})
      const period = doc.data().period
      return { id, title, lastEvent, period }
    })
  }

  // getById(id: string): IRecurrency {}

}

export const recurrencyDataService = new RecurrencyDataService()