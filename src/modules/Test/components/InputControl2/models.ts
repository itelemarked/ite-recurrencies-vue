
export interface User {
  firstname: string,
  lastname: string
}




type FormControlType = 'text' | 'password'

interface Validator {
  condition: (val: string) => boolean,
  errorMessage: string
}

interface Constructor {
  label?: string,
  type?: FormControlType,
  initialValue?: string,
  validators?: Validator[]
}


class FormControl {
  private _label: string
  private _type: FormControlType
  private _validators: Validator[]
  private _value: string

  private _focused = false
  private _touched = false
  private _dirty = false
  private _showPassword = false

  constructor({label = '', type = 'text', initialValue = '', validators = []}: Constructor) {
    this._label = label
    this._type = type
    this._value = initialValue
    this._validators = [...validators]
  }

  get label() { return this._label }
  get type() { return this._getType(this._type, this._showPassword)}

  get focused() { return this._focused }
  get touched() { return this._touched }
  get dirty() { return this._dirty }
  get valid() { return this._validValue(this._value, this._validators) }

  private _validValue = (value: string, validators: Validator[]): boolean => {
    const errorMessages = validators.filter(validator => !validator.condition(value)).map(validator => validator.errorMessage)
    return errorMessages.length === 0 ? true : false
  }

  private _getType(type: FormControlType, showPassword: boolean): FormControlType {
    return type === 'password' && !showPassword ? 'password' : 'text'
  }

}


const emailCtrl = new FormControl({
  label: 'Email',
  type: 'text',
  initialValue: '',
  validators: [
    {
      condition: (val: string) => /\d{3,}/.test(val),
      errorMessage: 'Must be at least 4 digits'
    }
  ]
})