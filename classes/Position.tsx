export type SetPosArgType = null | number | ((val: number) => number)

export class Position {
  x: number
  y: number

  constructor(pos: Position);
  constructor(x: number, y: number);
  constructor(xp: number | Position, y?: number) {
    if (xp instanceof Position) {
      this.x = xp.x
      this.y = xp.y
    } else {
      this.x = xp
      this.y = y!
    }
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