import { MutableRefObject, RefObject } from 'react'

export interface Tile {
  col: number
  row: number
  type: TileType
}

export enum TileType {
  COIN
}

export interface TileRefImperative {
  collect: () => void
  select: () => void
  deselect: () => void
}

export type TileRefs = MutableRefObject<WeakMap<Tile, RefObject<TileRefImperative>>>
