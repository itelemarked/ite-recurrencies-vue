
import type { PeriodUnit } from "./PeriodUnit"

export interface Recurrency {
  id: string,
  title: string,
  lastEvent: string,
  period: {
    nb: number,
    unit: PeriodUnit
  }
}
