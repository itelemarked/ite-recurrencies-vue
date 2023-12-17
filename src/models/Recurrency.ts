import { DateTime } from "./DateTime"
import type { PeriodUnit } from "./PeriodUnit"

// export interface Recurrency {
//   id: string,
//   title: string,
//   lastEvent: DateTime,
//   period: {
//     nb: number,
//     unit: PeriodUnit
//   }
// }

export class Recurrency {

  constructor(
    public id: string,
    public title: string,
    public lastEvent: DateTime,
    public period: {
      nb: number,
      unit: PeriodUnit
    }
  ) {}

  getExpiry(): DateTime {
    const { nb, unit } = this.period
    return this.lastEvent.add(nb, unit).add(1, 'milliseconds');
  }

  getProgress(): number {
    const lastEvent = this.lastEvent
    const expiry = this.getExpiry()
    const now = DateTime.now()
    const periodMs = expiry.valueOf() - lastEvent.valueOf()
    const elapsedMs = now.valueOf() - lastEvent.valueOf()
    return periodMs === 0 ? 0 : elapsedMs / periodMs;
  }

}