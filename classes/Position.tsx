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
    return this.toString() === target.toString()
  }

  isNear(target: Position): boolean {
    const { x: x1, y: y1 } = this
    const { x: x2, y: y2 } = target

    return x2 >= x1 - 1
      && x2 <= x1 + 1
      && y2 >= y1 - 1
      && y2 <= y1 + 1
  }

  toString(): string {
    return [this.x, this.y].join('-')
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
}