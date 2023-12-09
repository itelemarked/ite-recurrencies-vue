import type { DateTime } from "./DateTime"
import type { PeriodUnit } from "./PeriodUnit"

export interface Recurrency {
  id: string,
  title: string,
  lastEvent: DateTime,
  period: {
    nb: number,
    unit: PeriodUnit
  }
}