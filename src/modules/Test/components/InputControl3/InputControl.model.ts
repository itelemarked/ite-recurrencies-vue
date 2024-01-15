
export type InputControlType = 'text' | 'password'

export interface InputControlValidator {
  validWhen: (val: string) => boolean,
  invalidMessage: string
}

export interface InputControlConstructor {
  label?: string,
  type?: InputControlType,
  value?: string,
  validators?: InputControlValidator[]
  focused?: boolean,
  touched?: boolean,
  dirty?: boolean,
  showPassword?: boolean
}


/** CLASS WAY */

export class InputControl {
  /** Props must not be "getter-only", since the setters returns a brand new instance */
  
  label: string
  type: InputControlType
  value: string
  validators: InputControlValidator[]

  focused: boolean
  touched: boolean
  dirty: boolean
  showPassword: boolean

  constructor({
    label = '',
    type = 'text',
    value = '',
    validators = [],
    focused = false,
    touched = false,
    dirty = false,
    showPassword = false
  }: InputControlConstructor) {
    this.label = label
    this.type = type
    this.value = value
    this.validators = [...validators]
    this.focused = focused
    this.touched = touched
    this.dirty = dirty
    this.showPassword = showPassword
  }

  private _getErrors(): string[] {
    const validators = this.validators
    const value = this.value

    return validators
      .filter(validator => !validator.validWhen(value))
      .map(filteredValidator => filteredValidator.invalidMessage)
  }

  private _getCurrentType(): InputControlType {
    const showPassword = this.showPassword
    const type = this.type

    return type === 'password' && !showPassword ? 'password' : 'text'
  }

  update(newProps: InputControlConstructor): InputControl {
    return new InputControl({ ...this, ...newProps })
  }

  setValue(val: string): InputControl { return new InputControl({ ...this, value: val }) }
  
  setFocused(val: boolean): InputControl { return new InputControl({ ...this, focused: val }) }
  
  setTouched(val: boolean): InputControl { return new InputControl({ ...this, touched: val }) }
  
  setDirty(val: boolean): InputControl { return new InputControl({ ...this, dirty: val }) }

  setShowPassword(val: boolean): InputControl { return new InputControl({ ...this, showPassword: val }) }
  
  errors(): string[] { return this._getErrors() }

  currentType(): InputControlType { return this._getCurrentType() }

}


/** MODULE WAY */

// export interface InputControl {
//   readonly label: string,
//   readonly type: InputControlType,
//   readonly value: string,
//   readonly validators: InputControlValidator[],

//   readonly focused: boolean,
//   readonly touched: boolean,
//   readonly dirty: boolean
// }


// export function create({
//   label = '',
//   type = 'text',
//   value = '',
//   validators = [],
//   focused = false,
//   touched = false,
//   dirty = false
// }: InputControlConstructor): InputControl {
//   return {
//     label,
//     type,
//     value,
//     validators,
//     focused,
//     touched,
//     dirty
//   }
// }

// export function setValue(ctrl: InputControl, val: string): InputControl {
//   return { ...ctrl, value: val }
// }

// export function setFocused(ctrl: InputControl, val: boolean): InputControl {
//   return { ...ctrl, focused: val }
// }

// export function setTouched(ctrl: InputControl, val: boolean): InputControl {
//   return { ...ctrl, touched: val }
// }

// export function setDirty(ctrl: InputControl, val: boolean): InputControl {
//   return { ...ctrl, dirty: val }
// }

// export function errors(ctrl: InputControl): string[] {
//   return ctrl.validators
//     .filter(validator => !validator.condition(ctrl.value))
//     .map(filteredValidator => filteredValidator.errorMessage)
// }


/* OBJECT WAY */

// export interface InputControl {
//   label: string,
//   type: InputControlType,
//   value: string,
//   validators: InputControlValidator[],

//   focused: boolean,
//   touched: boolean,
//   dirty: boolean,
//   showPassword?: boolean
// }

// function createInputControl({
//   label = '',
//   type = 'text',
//   value = '',
//   validators = [],
//   focused = false,
//   touched = false,
//   dirty = false,
//   showPassword = false
// }: InputControlConstructor) {

//   const props = {
//     label,
//     type,
//     value,
//     validators,
//     focused,
//     touched,
//     dirty,
//     showPassword
//   }

//   function setValue(val: string): InputControl {
//     return createInputControl({ ...props, value: val })
//   }


//   return {
//     ...props,
//     setValue
//   }
// }


/* TESTING ABSTRACT CLASSES... NOT CONVINCING */

// abstract class AbstractFormControl {
//   protected _label: string
//   protected _type: FormControlType
//   protected _validators: Validator[]
//   protected _value: string

//   protected _focused = false
//   protected _touched = false
//   protected _dirty = false
//   protected _showPassword = false

//   // TODO
//   protected _getErrors(value: string, validators: Validator[], touched: boolean, dirty: boolean): string[] {
//     return ['aaa']
//   }
//   protected _isValueValid(value: string, validators: Validator[]): boolean {
//     return true
//   }
//   protected _getCurrentType(type: FormControlType, showPassword: boolean): FormControlType {
//     return 'text'
//   }
  
//   constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
//     this._label = label
//     this._type = type
//     this._value = value
//     this._validators = [...validators]
//   }
// }


// export class FormControl extends AbstractFormControl {

//   /* PUBLIC */

//   get label() { return this._label }
//   get type() { return this._type }
//   get validators() { return [...this._validators] }
//   get value() { return this._value }

//   get focused() { return this._focused }
//   get touched() { return this._touched }
//   get dirty() { return this._dirty }

//   get errors() { return this._getErrors(this._value, this._validators, this._touched, this._dirty) }
//   get valid() { return this._isValueValid(this._value, this._validators) }

//   setValue(val: string): FormControl {
//     this._value = val
//     return this
//   }

//   clone(): FormControl {
//     return new FormControl(this)
//   }

//   constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
//     super({ label, type, value, validators })
//   }

// }


// export class FormControlExtended extends FormControl {

//   /* PUBLIC */

//   get showPassword() { return this._showPassword }
  
//   setFocus(val: boolean): FormControlExtended {
//     this._focused = val
//     return this
//   }

//   setTouched(val: boolean): FormControlExtended {
//     this._touched = val
//     return this
//   }

//   setDirty(val: boolean): FormControlExtended {
//     this._dirty = val
//     return this
//   }

//   setShowPassword(val: boolean): FormControlExtended {
//     this._showPassword = val
//     return this
//   }

//   clone(): FormControlExtended {
//     return new FormControlExtended(this)
//   }

//   constructor({label = '', type = 'text', value = '', validators = []}: Constructor) {
//     super({ label, type, value, validators })
//   }
  

// }
