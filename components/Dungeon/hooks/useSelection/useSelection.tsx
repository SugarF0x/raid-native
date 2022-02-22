import { useCallback, useMemo, useState } from 'react'
import { isNotSelected } from './validators'
import { Position, Tile } from '@classes'

export interface SelectionOptions {
  tiles: Tile[]
}

export function useSelection(options: SelectionOptions) {
  const { tiles } = options

  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])
  const lastSelectedTile = useMemo<Tile>(() => selectedTiles[selectedTiles.length-1], [selectedTiles])
  const previousSelectedTile = useMemo<Tile>(() => selectedTiles[selectedTiles.length-2], [selectedTiles])
  const selectedPoints = useMemo<Position[]>(() => selectedTiles.map(tile => new Position(tile.col, tile.row)), [selectedTiles])

  const handleTileSelect = useCallback((tile: Tile) => {
    const isValid = [
      !lastSelectedTile || tile.isNear(lastSelectedTile),
      !selectedTiles || isNotSelected(tile, selectedTiles)
    ].every(Boolean)

    if (!isValid) return

    if (previousSelectedTile && Position.isSame(tile, previousSelectedTile)) {
      const newSelection = [...selectedTiles]
      newSelection.pop()
      setSelectedTiles(newSelection)
    } else {
      setSelectedTiles([...selectedTiles, tile])
    }
  }, [selectedTiles, lastSelectedTile, previousSelectedTile])

  const handleTouchMove = useCallback((pos: Position) => {
    const hitTile = tiles.find(tile => tile.hitbox.isWithin(pos))
    if (!hitTile) return
    handleTileSelect(hitTile)
  }, [tiles, handleTileSelect])

  const handleTouchEnd = useCallback(() => {
    setSelectedTiles([])
  }, [])

  return {
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    selectedPoints
  }
}