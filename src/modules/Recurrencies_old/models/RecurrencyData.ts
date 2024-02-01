import type { PeriodUnit } from "./PeriodUnit"

export interface RecurrencyData {
  title: string,
  lastEvent: string,
  period: {
    nb: number,
    unit: PeriodUnit
  }
}