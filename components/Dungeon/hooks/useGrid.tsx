import { useCallback, useEffect, useState } from 'react'
import { Position, Tile } from '@classes'

export function useGrid() {
  const [tileSize, setTileSize] = useState(0)
  const [tiles, setTiles] = useState<Tile[]>([])

  /** initially populate grid */
  useEffect(() => {
    if (!tiles.length && tileSize)
      setTiles(Array(6).fill(0).flatMap((_, col) => Array(6).fill(0).map((_, row) => new Tile({ col, row, transitionStartRow: row-6, size: tileSize }))))
  }, [tileSize])

  const handleTileDeletion = useCallback((selectedTiles: Tile[]) => {
    if (selectedTiles.length < 3) return

    const newTiles = [...tiles]

    // remove selected tiles
    selectedTiles.forEach(tile => {
      const tileIndex = newTiles.indexOf(tile!)
      newTiles.splice(tileIndex, 1)
    })

    // move hovering tiles downwards
    for (let col = 5; col >= 0; col--) {
      for (let row = 5; row >= 0; row--) {
        // if tile is empty - find next top tile and move to this position
        if (!newTiles.find(tile => tile.isSameDungeonPosition(new Position({ x: col, y: row })))) {
          for (let checkRow = row - 1; checkRow >= 0; checkRow--) {
            let nextTopTile = newTiles.find(tile => tile.isSameDungeonPosition(new Position({ x: col, y: checkRow })))
            if (nextTopTile) {
              nextTopTile.setTilePos(col, row)
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
        newTiles.push(new Tile({ col: col, row: newTilesRequired + row, transitionStartRow: row, size: tileSize }))
      }
    }

    setTiles(newTiles)
  }, [tiles, tileSize])

  return {
    tileSize,
    setTileSize,
    tiles,
    handleTileDeletion
  }
}
