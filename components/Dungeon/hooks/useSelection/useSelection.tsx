import { useCallback, useMemo, useState } from 'react'
import { isNotSelected } from './validators'
import { Position, TileBase } from '@classes'

export interface SelectionOptions {
  tiles: TileBase[]
  onTouchEnd?: (tile: TileBase[]) => void
}

export function useSelection(options: SelectionOptions) {
  const { tiles, onTouchEnd } = options

  const [selectedTiles, setSelectedTiles] = useState<TileBase[]>([])
  const lastSelectedTile = useMemo<TileBase>(() => selectedTiles[selectedTiles.length-1], [selectedTiles])
  const previousSelectedTile = useMemo<TileBase>(() => selectedTiles[selectedTiles.length-2], [selectedTiles])
  const lastSelectedAdjacentTiles = useMemo(() => !lastSelectedTile ? tiles : tiles.filter(tile => tile.isNear(lastSelectedTile)), [lastSelectedTile, tiles])

  const handleTileSelect = useCallback((tile: TileBase) => {
    const isValid = !selectedTiles || isNotSelected(tile, selectedTiles)

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
    const hitTile = lastSelectedAdjacentTiles.find(tile => tile.hitbox.isWithin(pos))
    if (!hitTile || hitTile === lastSelectedTile) return
    handleTileSelect(hitTile)
  }, [lastSelectedAdjacentTiles, handleTileSelect])

  const handleTouchEnd = useCallback(() => {
    onTouchEnd?.(selectedTiles)
    setSelectedTiles([])
  }, [onTouchEnd, selectedTiles])

  return {
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    selectedTiles
  }
}
