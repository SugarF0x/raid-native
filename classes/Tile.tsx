import { Shape } from '@classes/Shape'
import { SetPosArgType } from '@classes/Position'

const HITBOX_MARGIN_PERCENT = .1

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export class Tile extends Shape {
  col: number
  row: number
  hitbox: Shape
  color: string

  constructor(tile: Tile);
  constructor(column: number, row: number, size: number);
  constructor(ct: Tile | number, r?: number, s?: number) {
    if (ct instanceof Tile) {
      super(ct.x, ct.y, ct.width, ct.height)

      this.col = ct.col
      this.row = ct.row
      this.hitbox = ct.hitbox
      this.color = ct.color
    } else {
      super(ct * s!, r! * s!, s!, s!)

      this.col = ct!
      this.row = r!

      const offset = s! * HITBOX_MARGIN_PERCENT
      this.hitbox = new Shape(this.x + offset, this.y + offset, this.width - offset * 2, this.height - offset * 2)

      this.color = getRandomColor()
    }
  }

  isNear(target: Tile): boolean {
    const { col: col1, row: row1 } = this
    const { col: col2, row: row2 } = target

    return col2 >= col1 - 1
      && col2 <= col1 + 1
      && row2 >= row1 - 1
      && row2 <= row1 + 1
  }

  setTilePos(col: SetPosArgType, row: SetPosArgType) {
    this.col = Tile.handleSetter(col, this.col)
    this.row = Tile.handleSetter(row, this.row)
  }

  toString(): string {
    return [super.toString(), this.col, this.row].join('-')
  }
}