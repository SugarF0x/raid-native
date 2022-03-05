import { Shape } from '@classes/Shape'
import { Position, SetPosArgType } from '@classes/Position'

const HITBOX_MARGIN_PERCENT = .1

export class TileBase extends Shape {
  col: number
  row: number
  transitionStartRow: number
  hitbox!: Shape
  id: number

  constructor(tile: TileBase);
  constructor(column: number, row: number, transitionStartRow: number, size: number);
  constructor(ct: TileBase | number, r?: number, t?: number, s?: number) {
    if (ct instanceof TileBase) {
      super(ct.x, ct.y, ct.width, ct.height)

      this.col = ct.col
      this.row = ct.row
      this.transitionStartRow = ct.transitionStartRow
      this.hitbox = ct.hitbox
      this.id = ct.id
    } else {
      super(ct * s!, r! * s!, s!, s!)

      this.col = ct!
      this.row = r!
      this.transitionStartRow = t!

      this.computeHitbox()

      this.id = Math.floor(Math.random() * 1000000)
    }
  }

  isNear(target: TileBase): boolean {
    const { col: col1, row: row1 } = this
    const { col: col2, row: row2 } = target

    return col2 >= col1 - 1
      && col2 <= col1 + 1
      && row2 >= row1 - 1
      && row2 <= row1 + 1
  }

  setTilePos(col: SetPosArgType, row: SetPosArgType, transitionStartRow?: number) {
    this.col = TileBase.handleSetter(col, this.col)
    this.row = TileBase.handleSetter(row, this.row)

    this.x = this.col * this.width
    this.y = this.row * this.width

    this.transitionStartRow = transitionStartRow ?? this.row

    this.computeHitbox()
  }

  setSize(w: SetPosArgType, h: SetPosArgType) {
    super.setSize(w, h)
    this.computeHitbox()
  }

  computeHitbox() {
    const offset = this.width * HITBOX_MARGIN_PERCENT
    this.hitbox = new Shape(this.x + offset, this.y + offset, this.width - offset * 2, this.height - offset * 2)
  }

  toString(): string {
    return [super.toString(), this.col, this.row].join('-')
  }

  isSameDungeonPosition(target: TileBase | Position): boolean {
    return TileBase.isSameDungeonPosition(this, target)
  }

  static isSameDungeonPosition(tile1: TileBase | Position, tile2: TileBase | Position): boolean {
    let foo, bar

    if (tile1 instanceof TileBase) foo = [tile1.col, tile1.row].join('-')
    else foo = tile1.toString()

    if (tile2 instanceof TileBase) bar = [tile2.col, tile2.row].join('-')
    else bar = tile2.toString()

    return foo === bar
  }
}
