type SetPosArgType = null | number | ((val: number) => number)

export class Position {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number)
  constructor(pos: Position);
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
    let newX = this.x
    if (typeof x === 'number') {
      newX = x
    } else if (typeof x === 'function') {
      newX = x(this.x)
    }

    let newY = this.y
    if (typeof y === 'number') {
      newY = y
    } else if (typeof y === 'function') {
      newY = y(this.y)
    }

    return new Position(newX, newY)
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
    return `${this.x}-${this.y}`
  }
}