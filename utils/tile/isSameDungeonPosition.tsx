import Tile from './types'

export default function isSameDungeonPosition(tile1: Tile, tile2: Tile): boolean {
  return (
    tile1.col === tile2.col
    && tile1.row === tile2.row
  )
}
