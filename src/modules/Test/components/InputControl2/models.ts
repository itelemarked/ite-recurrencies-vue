
export type FormControlType = 'text' | 'password'

export interface Validator {
  condition: (val: string) => boolean,
  errorMessage: string
}

export interface Constructor {
  label?: string,
  type?: FormControlType,
  value?: string,
  validators?: Validator[]
}


export class FormControl {
  label: string
  type: FormControlType
  validators: Validator[]
  value: string

  focused = false
  touched = false
  dirty = false
  showPassword = false

  valid: boolean
  currentType: FormControlType

  constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
    this.label = label
    this.type = type
    this.value = value
    this.validators = [...validators]

    this.valid = this._isValidValue(value, validators)
    this.currentType = this._getType(type, this.showPassword)
  }

  private _isValidValue = (value: string, validators: Validator[]): boolean => {
    const errorMessages = validators.filter(validator => !validator.condition(value)).map(validator => validator.errorMessage)
    return errorMessages.length === 0 ? true : false
  }

  private _getType(type: FormControlType, showPassword: boolean): FormControlType {
    return type === 'password' && !showPassword ? 'password' : 'text'
  }

  setValue(val: string): FormControl {
    this.value = val
    return new FormControl(this)
  }
}


// class FormControl {
//   private _label: string
//   private _type: FormControlType
//   private _validators: Validator[]
//   protected _value: string

//   protected _focused = false
//   protected _touched = false
//   protected _dirty = false
//   private _showPassword = false

//   constructor({label = '', type = 'text', initialValue = '', validators = []}: Constructor) {
//     this._label = label
//     this._type = type
//     this._value = initialValue
//     this._validators = [...validators]
//   }

//   get label() { return this._label }
//   get type() { return this._getType(this._type, this._showPassword)}

//   get focused() { return this._focused }
//   get touched() { return this._touched }
//   get dirty() { return this._dirty }
//   get valid() { return this._validValue(this._value, this._validators) }

//   private _validValue = (value: string, validators: Validator[]): boolean => {
//     const errorMessages = validators.filter(validator => !validator.condition(value)).map(validator => validator.errorMessage)
//     return errorMessages.length === 0 ? true : false
//   }

//   private _getType(type: FormControlType, showPassword: boolean): FormControlType {
//     return type === 'password' && !showPassword ? 'password' : 'text'
//   }
// }

// class FormControlExtended extends FormControl {
//   // private _formControl: FormControl

//   // constructor(formControl: FormControl) { }

//   setTouched(val: boolean) {
//     this._touched = val
//   }

//   setFocused(val: boolean) {
//     this._focused = val
//   }

//   setDirty(val: boolean) {
//     this._dirty = val
//   }

//   setValue(val: string) {
//     this._value = val
//   }
// }


// const emailCtrl = new FormControl({
//   label: 'Email',
//   type: 'text',
//   initialValue: '',
//   validators: [
//     {
//       condition: (val: string) => /\d{3,}/.test(val),
//       errorMessage: 'Must be at least 4 digits'
//     }
//   ]
// })




