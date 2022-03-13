import { Shape } from '@classes/Shape'
import { Position, SetPosArgType } from '@classes/Position'
import React from 'react'
import { SvgProps } from 'react-native-svg'

const HITBOX_MARGIN_PERCENT = .1

export interface TileOptions {
  col: number
  row: number
  transitionStartRow: number
  size: number
}

export abstract class Tile extends Shape {
  abstract svg: React.FC<SvgProps>

  abstract onSelect(): void
  abstract onDeselect(): void
  abstract onCollect(): void

  col: number
  row: number
  transitionStartRow: number
  id: number
  hitbox: Shape

  protected constructor(options: TileOptions | Tile) {
    const { col, row, transitionStartRow } = options

    if (options instanceof Tile) {
      const { x, y, width, height, id, hitbox } = options
      super({ x, y, width, height })
      this.id = id
      this.hitbox = hitbox
    } else {
      const { size } = options
      const [x, y] = [col * size, row * size]
      super({ x: col * size, y: row * size, width: size, height: size })
      this.id = Tile.getNewId()
      this.hitbox = Tile.getNewHitbox(x, y, size)
    }

    this.col = col;
    this.row = row;
    this.transitionStartRow = transitionStartRow;
  }

  isNear(target: Tile): boolean {
    const { col: col1, row: row1 } = this
    const { col: col2, row: row2 } = target

    return col2 >= col1 - 1
      && col2 <= col1 + 1
      && row2 >= row1 - 1
      && row2 <= row1 + 1
  }

  setTilePos(col: SetPosArgType, row: SetPosArgType, transitionStartRow?: number) {
    this.col = Tile.handleSetter(col, this.col)
    this.row = Tile.handleSetter(row, this.row)

    this.x = this.col * this.width
    this.y = this.row * this.width

    this.transitionStartRow = transitionStartRow ?? this.row

    this.updateHitbox()
  }

  setSize(w: SetPosArgType, h: SetPosArgType) {
    super.setSize(w, h)
    this.updateHitbox()
  }

  getNewHitbox(): Shape {
    return Tile.getNewHitbox(this.x, this.y, this.width)
  }

  updateHitbox() {
    this.hitbox = this.getNewHitbox()
  }

  toString(): string {
    return [super.toString(), this.col, this.row].join('-')
  }

  isSameDungeonPosition(target: Tile | Position): boolean {
    return Tile.isSameDungeonPosition(this, target)
  }

  static isSameDungeonPosition(tile1: Tile | Position, tile2: Tile | Position): boolean {
    let foo, bar

    if (tile1 instanceof Tile) foo = [tile1.col, tile1.row].join('-')
    else foo = tile1.toString()

    if (tile2 instanceof Tile) bar = [tile2.col, tile2.row].join('-')
    else bar = tile2.toString()

    return foo === bar
  }

  static getNewHitbox(x: number, y: number, size: number): Shape {
    const offset = size * HITBOX_MARGIN_PERCENT
    return new Shape({
      x: x + offset,
      y: y + offset,
      width: size - offset * 2,
      height: size - offset * 2
    })
  }

  static getNewId(): number {
    return Math.floor(Math.random() * 1000000)
  }
}
