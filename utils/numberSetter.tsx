export type NumberSetterArg = null | number | ((val: number) => number)

export function numberSetter(value: NumberSetterArg, initialValue: number): number {
  let newValue = initialValue

  if (typeof value === 'number') {
    newValue = value
  } else if (typeof value === 'function') {
    newValue = value(initialValue)
  }

  return newValue
}

export default numberSetter
