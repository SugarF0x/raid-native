import Tile from './types'

export default function toStringTile(tile: Tile): string {
  return `${tile.type}-${tile.col}-${tile.row}`
}
