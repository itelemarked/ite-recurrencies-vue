import { type Constructor, type FormControlType, type Validator } from './models'


abstract class AbstractFormControl {
  protected _label: string
  protected _type: FormControlType
  protected _validators: Validator[]
  protected _value: string

  protected _focused = false
  protected _touched = false
  protected _dirty = false
  protected _showPassword = false

  // TODO
  protected _getErrors(value: string, validators: Validator[], touched: boolean, dirty: boolean): string[] {
    return ['aaa']
  }
  protected _isValueValid(value: string, validators: Validator[]): boolean {
    return true
  }
  protected _getCurrentType(type: FormControlType, showPassword: boolean): FormControlType {
    return 'text'
  }
  
  constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
    this._label = label
    this._type = type
    this._value = value
    this._validators = [...validators]
  }
}


export class FormControl extends AbstractFormControl {

  /* PUBLIC */
  
  get label() { return this._label }
  get type() { return this._type }
  get validators() { return [...this._validators] }
  get value() { return this._value }

  get focused() { return this._focused }
  get touched() { return this._touched }
  get dirty() { return this._dirty }

  get errors() { return this._getErrors(this._value, this._validators, this._touched, this._dirty) }
  get valid() { return this._isValueValid(this._value, this._validators) }

  setValue(val: string): FormControl {
    this._value = val
    return this
  }

  clone(): FormControl {
    return new FormControl(this)
  }

  constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
    super({ label, type, value, validators })
  }

}


export class FormControlExtended extends FormControl {

  /* PUBLIC */

  get showPassword() { return this._showPassword }
  
  setFocus(val: boolean): FormControlExtended {
    this._focused = val
    return this
  }

  setTouched(val: boolean): FormControlExtended {
    this._touched = val
    return this
  }

  setDirty(val: boolean): FormControlExtended {
    this._dirty = val
    return this
  }

  setShowPassword(val: boolean): FormControlExtended {
    this._showPassword = val
    return this
  }

  clone(): FormControlExtended {
    return new FormControlExtended(this)
  }

  constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
    super({ label, type, value, validators })
  }

}