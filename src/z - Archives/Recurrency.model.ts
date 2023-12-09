
export interface Recurrency {
  title: string,
  lastEvent: string,
  period: {
    unit: 'days',
    nb: number
  }
}



export const MOCK_DATA: Recurrency[] = [
  {
    title: 'hello1',
    lastEvent: '2023-01-11',
    period: {
      unit: 'days',
      nb: 66
    }
  },
  {
    title: 'hello2',
    lastEvent: '2023-01-10',
    period: {
      unit: 'days',
      nb: 94
    }
  },
]


// export function expiry(recurrency: Recurrency): string {
//   // const lastEventDate = new Date(recurrency.lastEvent)
//   // const expiryDate = new Date(recurrency.lastEvent);
//   // expiryDate.setDate(lastEventDate.getDate() + recurrency.period.nb)
//   // return expiryDate.toISOString()
//   const { lastEvent } = recurrency;
//   const { nb, unit } = recurrency.period;
//   return add(lastEvent, nb, unit)
// }


// export function progress(recurrency: Recurrency): number {}


// export function remainingPeriod(recurrency: Recurrency, unit: 'days'): number {}


// type IsoDateString = string;

// function toIsoDateString(str: string): IsoDateString {}

// function add(date: IsoDateString, nb: number, unit: 'days' | 'weeks' | 'months' | 'years'): IsoDateString {}
