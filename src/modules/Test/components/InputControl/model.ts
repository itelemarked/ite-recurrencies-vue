type InputControlType = 'text' | 'password'

interface InputControlValidator {
  condition: (val: string) => boolean,
  errorMessage: string
}

interface InputControlConstructor {
  label?: string,
  type?: InputControlType,
  value?: string,
  validators?: InputControlValidator[]
  focused?: boolean,
  touched?: boolean,
  dirty?: boolean,
  showPassword?: boolean
}

interface InputControlInterface {
  value: string,
  label: string,
  type: InputControlType,
  validators: InputControlValidator[],
  focused: boolean,
  touched: boolean,
  dirty: boolean,
  showPassword: boolean,
  errors: () => string[]
  currentType: () => InputControlType
}

interface InputControlReadonlyInterface {
  value: string,
  readonly label: string,
  readonly type: InputControlType,
  readonly validators: InputControlValidator[],
  readonly focused: boolean,
  readonly touched: boolean,
  readonly dirty: boolean,
  showPassword: boolean,
  errors: () => string[]
  currentType: () => InputControlType
}

abstract class InputControlAbstractClass {
  protected _value: string
  protected _label: string
  protected _type: InputControlType
  protected _validators: InputControlValidator[]
  protected _focused: boolean
  protected _touched: boolean
  protected _dirty: boolean
  protected _showPassword: boolean

  constructor({
    value = '',
    label = '',
    type = 'text',
    validators = [],
    focused = false,
    touched = false,
    dirty = false,
    showPassword = false
  }: InputControlConstructor) {
    this._value = value
    this._label = label
    this._type = type
    this._validators = validators
    this._focused = focused
    this._touched = touched
    this._dirty = dirty
    this._showPassword = showPassword
  }

  protected _getErrors(): string[] {
    const validators = this._validators
    const value = this._value

    return validators
      .filter(validator => !validator.condition(value))
      .map(filteredValidator => filteredValidator.errorMessage)
  }

  protected _getCurrentType(): InputControlType {
    const showPassword = this._showPassword
    const type = this._type

    return type === 'password' && !showPassword ? 'password' : 'text'
  }
}

class InputControlClass extends InputControlAbstractClass {
  get value(): string { return this._value }
  get label(): string { return this._label }
  get type(): InputControlType { return this._type }
  get validators(): InputControlValidator[] { return [...this._validators] }
  get focused(): boolean { return this._focused }
  get touched(): boolean { return this._touched }
  get dirty(): boolean { return this._dirty }
  get showPassword(): boolean { return this._showPassword }

  setValue(val: string): InputControlClass {
    return new InputControlClass({...this, value: val})
  }

  constructor({
    value = '',
    label = '',
    type = 'text',
    validators = [],
    focused = false,
    touched = false,
    dirty = false,
    showPassword = false
  }: InputControlConstructor){
    super({
      value,
      label,
      type,
      validators,
      focused,
      touched,
      dirty,
      showPassword,
    })
  }
}


// class Test {
//   private _getA() {return 'aaa'}
// }

// const a = new Test()
// a._getA()

