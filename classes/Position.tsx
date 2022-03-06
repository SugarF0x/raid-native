export type SetPosArgType = null | number | ((val: number) => number)

export interface PositionOptions {
  x: number
  y: number
}

export class Position {
  x: number
  y: number

  constructor(options: PositionOptions) {
    const { x, y } = options

    this.x = x
    this.y = y
  }

  setPos(x: SetPosArgType, y: SetPosArgType) {
    this.x = Position.handleSetter(x, this.x)
    this.y = Position.handleSetter(y, this.y)
  }

  isSame(target: Position): boolean {
    return Position.isSame(this, target)
  }

  toString(): string {
    return Position.toString(this)
  }

  static handleSetter(value: SetPosArgType, initialValue: number): number {
    let newValue = initialValue
    if (typeof value === 'number') {
      newValue = value
    } else if (typeof value === 'function') {
      newValue = value(initialValue)
    }

    return newValue
  }

  static isSame(pos1: Position, pos2: Position): boolean {
    return Position.toString(pos1) === Position.toString(pos2)
  }

  static toString(pos: Position): string {
    return [pos.x, pos.y].join('-')
  }
}
