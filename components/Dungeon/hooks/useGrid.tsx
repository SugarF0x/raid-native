import { useCallback, useRef, useState } from 'react'
import { isSameDungeonPosition, Tile, TileRefs, TileType } from '@utils'

function getInitialTiles(): Tile[] {
  return (
    Array(6).fill(0)
    .flatMap((_, col) =>
      Array(6).fill(0)
      .map<Tile>((_, row) => ({
        col,
        row,
        type: TileType.COIN,
        id: Math.floor(Math.random() * 1000000)
      }))
    )
  )
}

export function useGrid() {
  const [tileSize, setTileSize] = useState(0)
  const [tiles, setTiles] = useState<Tile[]>(getInitialTiles())
  const tileRefs: TileRefs = useRef(new WeakMap())

  const handleTileDeletion = useCallback((selectedTiles: Tile[]) => {
    if (selectedTiles.length < 3) return

    const newTiles = [...tiles]

    // remove selected tiles
    selectedTiles.forEach(tile => {
      const tileIndex = newTiles.indexOf(tile!)
      newTiles.splice(tileIndex, 1)
      tileRefs.current.get(tile)?.current?.collect()
    })

    // move hovering tiles downwards
    for (let col = 5; col >= 0; col--) {
      for (let row = 5; row >= 0; row--) {
        // if tile is empty - find next top tile and move to this position
        if (!newTiles.find(tile => isSameDungeonPosition(tile, {col, row}))) {
          for (let checkRow = row - 1; checkRow >= 0; checkRow--) {
            let nextTopTile = newTiles.find(tile => isSameDungeonPosition(tile, {col, row: checkRow}))
            if (nextTopTile) {
              nextTopTile.col = col
              nextTopTile.row = row
              break
            }
          }
        }
      }
    }

    // generate new tiles
    for (let col = 0; col < 6; col++) {
      const newTilesRequired = 6 - newTiles.filter(tile => tile.col === col).length
      for (let row = -1; row >= newTilesRequired * (-1); row--) {
        newTiles.push({ col: col, row: newTilesRequired + row, type: TileType.COIN, id: Math.floor(Math.random() * 1000000) })
      }
    }

    setTiles(newTiles)
  }, [tiles, tileSize])

  return {
    tileSize,
    setTileSize,
    tiles,
    tileRefs,
    handleTileDeletion
  }
}
