import { Position, PositionOptions, SetPosArgType } from '@classes/Position'

export interface ShapeOptions extends PositionOptions {
  width: number
  height: number
}

export class Shape extends Position {
  width: number
  height: number

  constructor(options: ShapeOptions) {
    const { x, y, width, height } = options

    super({ x, y })

    this.width = width
    this.height = height
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
