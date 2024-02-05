
/**
 * TYPE DEFINITIONS
 */

export type PeriodUnit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years';

interface RecurrencyCreate {
  id: string,
  title: string,
  lastEvent: string,
  period: {
    nb: number,
    unit: string
  }
}

export interface Recurrency {
  readonly id: string,
  readonly title: string,
  readonly lastEvent: string,
  readonly period: {
    readonly nb: number,
    readonly unit: PeriodUnit
  }
}

export type RecurrencyData = Omit<Recurrency, 'id'>

/**
 * UTITLITY FUNCTIONS
 */


/**
 * CREATE
 * Do always use create() to create a recurrency, in order to check lastEvent and periodNb formats
 */
export function create(val: RecurrencyCreate): Recurrency {
  return {
    id: 'aaa',
    title: 'aaa',
    lastEvent: '2024-01-01',
    period: {
      nb: 99,
      unit: 'days'
    }
  } as Recurrency
}

/**
 * CREATE
 * data could be for example the firestore data, or the modal data when creating a new recurrency.
 */
export function fromData(data: RecurrencyData, id: string): Recurrency {
  // TODO: check lastEvent and periodNb formats
  return { id, ...data }
}

// TODO
export function getExpiry(recurrency: Recurrency): string {  return '2024-01-01' }

// TODO
export function getProgress(recurrency: Recurrency): number { return 0.7 }

// TODO
export function getRemainingPeriodNb(recurrency: Recurrency, periodUnit: PeriodUnit): number { return 33.2 }

// TODO
export function setExpiry(recurrency: Recurrency, val: string): Recurrency { 
  return {
    id: 'aaa',
    title: 'aaa',
    lastEvent: '2024-01-01',
    period: {
      nb: 99,
      unit: 'days'
    }
  }
}






/**
 * TESTING... TEMPORARY
 */

// const a: Recurrency = {
//   id: 'aaa',
//   title: 'aaa',
//   lastEvent: '2024-01-01',
//   period: {
//     nb: 99,
//     unit: 'days'
//   }
// }

// a.period.nb = 999