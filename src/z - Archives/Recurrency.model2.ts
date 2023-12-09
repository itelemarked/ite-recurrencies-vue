
type IsoDateString = string & { _type: 'IsoDateString' };

function assertIsoDateString(val: string): asserts val is IsoDateString {
  // TODO
}

type PositiveInteger = number & { _type: 'PositiveInteger' };

function assertPositiveInteger(val: number): asserts val is PositiveInteger {
  // TODO
}




export class Recurrency {
  title: string;
  // WHY NOT DATE INSTEAD OF ISODATESTRING????
  lastEvent: IsoDateString
  period: {
    nb: PositiveInteger,
    unit: 'days' | 'weeks' | 'months' | 'years'
  };

  constructor(obj: { title: string, period: {nb: number, unit: 'days' | 'weeks' | 'months' | 'years'}, lastEvent: string }) {
    const { title, lastEvent } = obj
    const { nb, unit } = obj.period

    assertIsoDateString(lastEvent);
    assertPositiveInteger(nb);

    this.title = title;
    this.period = { nb, unit }
    this.lastEvent = lastEvent;
  }

  setLastEvent(val: string) {
    // TODO
  }

  setPeriod(val: {nb: number} | {unit: 'days' | 'weeks' | 'months' | 'years'} | {nb: number, unit: 'days' | 'weeks' | 'months' | 'years'}) {
    // TODO
  }

  setExpiry(val: string) {
    // TODO
  }

  expiry(): IsoDateString {
    // TODO
    return '' as IsoDateString;
  }

  progress(): number {
    // TODO
    return 99;
  }

  remaining(unit: 'days'): number {
    // TODO
    return 999;
  }
}