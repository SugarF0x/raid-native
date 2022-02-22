import { Position, SetPosArgType } from '@classes/Position'

export class Shape extends Position {
  width: number
  height: number

  constructor(s: Shape);
  constructor(x: number, y: number, w: number, h: number);
  constructor(xs: Shape | number, y?: number, w?: number, h?: number) {
    if (xs instanceof Shape) {
      super(xs.x, xs.y)
      this.width = xs.width
      this.height = xs.height
    } else {
      super(xs, y!)
      this.width = w!
      this.height = h!
    }
  }

  setSize(w: SetPosArgType, h: SetPosArgType) {
    this.width = Shape.handleSetter(w, this.width)
    this.height = Shape.handleSetter(h, this.height)
  }

  isWithin(pos: Position): boolean {
    const { x, y } = pos
    return [
      x >= this.x,
      x <= this.x + this.width,
      y >= this.y,
      y <= this.y + this.height,
    ].every(Boolean)
  }

  toString(): string {
    return Shape.toString(this)
  }

  static toString(shape: Shape): string {
    return [super.toString(shape), shape.width, shape.height].join('-')
  }
}