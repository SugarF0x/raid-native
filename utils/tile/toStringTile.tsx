import { Tile } from './types'

export function toStringTile(tile: Tile): string {
  return `${tile.type}-${tile.col}-${tile.row}`
}

export default toStringTile
