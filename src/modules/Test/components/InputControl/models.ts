import type { ComputedRef } from "vue"

export type Validator = {
  condition: (val: string) => boolean, 
  message: string
}

export interface Props {
  initialValue?: string,  /* default: '' */
  type?: 'text' | 'password', /* default: 'text' */
  label?: string, /* default: undefined */
  validators?: Validator[] /* default: [] */
}

export interface Exposed {
  setValue: (val: string) => void,
  value: ComputedRef<boolean>,
  dirty: ComputedRef<boolean>,
  touched: ComputedRef<boolean>,
  focused: ComputedRef<boolean>,
  valid: ComputedRef<boolean>,
}

export const VALIDATORS: {
  email: Validator,
  minLength: (min: number) => Validator,
  hasSpecialCharacter: Validator,
  hasDigit: Validator,
  hasCapitalCharacter: Validator
} = {
  email: {
    condition: (val: string) => {
      const regex = /^[\w-]+@[\w-]+\.\w{2,4}$/
      return regex.test(val)
    },
    message: 'Invalid email...'
  },
  minLength: (min: number) => {
    return {
      condition: (val: string) => {
        return val.length >= min
      },
      message: `Must have at least ${min} characters...`
    }
  },
  hasSpecialCharacter: {
    condition: (val: string) => {
      const regex = /[*.!@#$%^&(){}\[\]:;<>,.?/~_+\-=|']/ // eslint-disable-line
      return regex.test(val)
    },
    message: `Must have at least one special character...`
  },
  hasDigit: {
    condition: (val: string) => {
      const regex = /\d/
      return regex.test(val)
    },
    message: `Must have at least one digit...`
  },
  hasCapitalCharacter: {
    condition: (val: string) => {
      const regex = /[A-Z]/
      return regex.test(val)
    },
    message: `Must have at least one capital letter...`
  }
}


