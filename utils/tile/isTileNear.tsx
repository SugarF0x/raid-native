import Tile from './types'

export default function isTileNear(tile1: Tile, tile2: Tile): boolean {
  const { col: col1, row: row1 } = tile1
  const { col: col2, row: row2 } = tile2

  return (
    col2 >= col1 - 1
    && col2 <= col1 + 1
    && row2 >= row1 - 1
    && row2 <= row1 + 1
  )
}
