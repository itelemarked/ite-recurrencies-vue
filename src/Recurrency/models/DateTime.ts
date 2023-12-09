import type { PeriodUnit } from "./PeriodUnit";

class OffsetString {

  private _REGEX = /^([+-])(?:(?:(0[0-9]|1[0-1]):([0-5][0-9]))|(12):(00))$/
  private _match: RegExpMatchArray;

  constructor(offsetStr: string) {
    const match = offsetStr.match(this._REGEX);
    if (match === null) throw new Error('invalid OffsetString argument')
    this._match = match
  }

  getSign(): string {
    return this._match[1]
  }

  getHours(): number {
    const signStr = this._match[1]
    const hourStr = this._match[2] ?? this._match[4]
    return +(signStr + hourStr)
  }

  getMinutes(): number {
    const signStr = this._match[1]
    const minuteStr = this._match[3] ?? this._match[5]
    return +(signStr + minuteStr)
  }

  getTime(): number {
    return this.getHours() * 60 * 60 * 1000 + this.getMinutes() * 60 * 1000;
  }

}


// TO DELETE??? UNUSED...
class DateString {

  private _REGEX = /^(\d{4})-(\d{2})-(\d{2})$/
  private _match: RegExpMatchArray;

  constructor(dateStr: string) {
    const match = dateStr.match(this._REGEX);
    const invalidDate = new Date(dateStr).toString() === 'Invalid Date'
    if (match === null || invalidDate) throw new Error('invalid DateString argument')
    this._match = match
  }

  getYear(): number {
    return +this._match[1]
  }

  getMonth(): number {
    return +this._match[2]
  }

  getDay(): number {
    return +this._match[3]
  }

}


// TO DELETE??? UNUSED...
class TimeString {

  private _REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9](?:.\d+)?))?$/
  private _match: RegExpMatchArray;

  constructor(timeStr: string) {
    const match = timeStr.match(this._REGEX);
    if (match === null) throw new Error('invalid TimeString argument')
    this._match = match
  }

  getHours(): number {
    return +this._match[1]
  }

  getMinutes(): number {
    return +this._match[2]
  }

  getSeconds(): number {
    if (this._match[3] === undefined) {
      return 0
    } else {
      return Math.floor(+this._match[3])
    }
  }

  getMilliseconds(): number {
    if (this._match[3] === undefined) {
      return 0
    } else {
      const int = Math.floor(+this._match[3])
      const fraction = +this._match[3] - int;
      return Math.floor(fraction * 1000)
    }
  }

}


const TIME_STRING = '23:59:59.999';
const OFFSET_STRING = '+00:00';


export class DateTime {

  private _date: Date;

  private constructor(d: Date | string | number) {
    const date = new Date(d)
    if (date.toString() === 'Invalid Date') throw Error(`DateTime constructor: invalid arguments... Evaluating: ${d}`)
    this._date = date;
  }

  static create({
    dateString,
    timeString = TIME_STRING,
    offsetString = OFFSET_STRING
  } : {dateString: string, timeString?: string, offsetString?: string}): DateTime {
    return new DateTime(`${dateString}T${timeString}${offsetString}`)
  }

  static createByDate(d: Date | string | number): DateTime {
    return new DateTime(d);
  }

  static now(): DateTime {
    return new DateTime(new Date())
  }

  static diff(d1: DateTime, d2: DateTime, unit: PeriodUnit = 'milliseconds'): number {
    const d1Ms = d1.valueOf()
    const d2Ms = d2.valueOf()
    const resultMs = d2Ms - d1Ms;

    const AVERAGE_YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;
    const AVERAGE_MONTH_MS = AVERAGE_YEAR_MS / 12;

    switch(unit) {
      case 'milliseconds':
        return resultMs;
      case 'seconds': 
        return resultMs / 1000;
      case 'minutes':
        return resultMs / 1000 / 60;
      case 'hours':
        return resultMs / 1000 / 60 / 60;
      case 'days':
        return resultMs / 1000 / 60 / 60 / 24;
      case 'weeks':
        return resultMs / 1000 / 60 / 60 / 24 / 7;
      // Months and years not really exact... takes in account the average milliseconds in 4 years...!
      case 'months':
        return resultMs / AVERAGE_MONTH_MS;
      case 'years':
        return resultMs / AVERAGE_YEAR_MS;
    }
  }

  _getCorrectedDate(offsetStr: string): Date {
    const dateMs = this._date.getTime()
    const offsetMs = (new OffsetString(offsetStr)).getTime()
    const correctedDate = new Date(dateMs + offsetMs)
    return correctedDate
  }

  add(nb: number, unit: PeriodUnit): DateTime {
    const copy = new Date(this._date)

    switch (unit) {
      case 'milliseconds': {
        copy.setUTCMilliseconds(copy.getUTCMilliseconds() + nb)
        break;
      }
      case 'seconds': {
        copy.setUTCSeconds(copy.getUTCSeconds() + nb)
        break;
      }
      case 'minutes': {
        copy.setUTCMinutes(copy.getUTCMinutes() + nb)
        break;
      }
      case 'hours': {
        copy.setUTCHours(copy.getUTCHours() + nb)
        break;
      }
      case 'days': {
        copy.setUTCDate(copy.getUTCDate() + nb)
        break;
      }
      case 'weeks': {
        copy.setUTCDate(copy.getUTCDate() + nb * 7)
        break;
      }
      case 'months': {
        copy.setUTCMonth(copy.getUTCMonth() + nb)
        break;
      }
      case 'years': {
        copy.setUTCFullYear(copy.getUTCFullYear() + nb)
        break;
      }
    }

    return DateTime.createByDate(copy)
  }

  valueOf(): number {
    return this._date.valueOf()
  }

  getYear(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCFullYear()
  }

  getMonth(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCMonth() + 1
  }

  getDay(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCDate()
  }

  getHours(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCHours()
  }

  getMinutes(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCMinutes()
  }

  getSeconds(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCSeconds()
  }

  getMilliseconds(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getUTCMilliseconds()
  }

  getTime(offsetStr: string) {
    const correctedDate = this._getCorrectedDate(offsetStr)
    return correctedDate.getTime()
  }

  getDateString(offsetStr: string) {
    const yyyy = this.getYear(offsetStr).toString()
    const mm = this.getMonth(offsetStr).toString().padStart(2, '0')
    const dd = this.getDay(offsetStr).toString().padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }

  getTimeString(offsetStr: string) {
    const hh = this.getHours(offsetStr).toString().padStart(2, '0')
    const mm = this.getMinutes(offsetStr).toString().padStart(2, '0')
    const ss = this.getSeconds(offsetStr).toString().padStart(2, '0')
    const ms = this.getMilliseconds(offsetStr).toString().padEnd(3, '0')
    return `${hh}:${mm}:${ss}.${ms}`
  }

  getFullString(offsetStr: string) {
    const dateStr = this.getDateString(offsetStr)
    const timeStr = this.getTimeString(offsetStr)
    return `${dateStr}T${timeStr}${offsetStr}`
  }

  getCHDateString(offsetStr: string) {
    const yyyy = this.getYear(offsetStr).toString()
    const mm = this.getMonth(offsetStr).toString().padStart(2, '0')
    const dd = this.getDay(offsetStr).toString().padStart(2, '0')
    return `${dd}.${mm}.${yyyy}`
  }

}