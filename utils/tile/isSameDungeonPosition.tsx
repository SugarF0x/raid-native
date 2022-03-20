import { Tile } from './types'

type TilePosProps = Pick<Tile, 'col' | 'row'>

export function isSameDungeonPosition(tile1: TilePosProps, tile2: TilePosProps): boolean {
  return (
    tile1.col === tile2.col
    && tile1.row === tile2.row
  )
}

export default isSameDungeonPosition
