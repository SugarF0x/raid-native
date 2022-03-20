import { useCallback, useMemo, useState } from 'react'
import { isNotSelected } from './validators'
import { isPosWithinShape, isSameDungeonPosition, isTileNear, Position, Shape, Tile, TileRefs } from '@utils'

export interface SelectionOptions {
  tiles: Tile[]
  onTouchEnd?: (tile: Tile[]) => void
  tileRefs: TileRefs
  size: number
}

const HITBOX_MARGIN_PERCENT = .1

function getHitboxes(tiles: Tile[], size: number): WeakMap<Tile, Shape> {
  const offset = size * HITBOX_MARGIN_PERCENT

  return tiles.reduce((acc, val) => {
    acc.set(val, {
      x: val.col * size + offset,
      y: val.row * size + offset,
      width: size - offset * 2,
      height: size - offset * 2
    })

    return acc
  }, new WeakMap())
}

export function useSelection(options: SelectionOptions) {
  const { tiles, onTouchEnd, tileRefs, size } = options

  const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])
  const lastSelectedTile = useMemo<Tile>(() => selectedTiles[selectedTiles.length-1], [selectedTiles])
  const previousSelectedTile = useMemo<Tile>(() => selectedTiles[selectedTiles.length-2], [selectedTiles])
  const lastSelectedAdjacentTiles = useMemo(() => !lastSelectedTile ? tiles : tiles.filter(tile => isTileNear(tile, lastSelectedTile)), [lastSelectedTile, tiles])

  // these will also determine connectivity of tile types
  const activeTiles = useMemo(() => lastSelectedAdjacentTiles || tiles, [lastSelectedAdjacentTiles, tiles])
  const activeHitboxes = useMemo(() => getHitboxes(activeTiles, size), [activeTiles, size])

  const handleTileSelect = useCallback((tile: Tile) => {
    const isValid = !selectedTiles || isNotSelected(tile, selectedTiles)

    if (!isValid) return

    if (previousSelectedTile && isSameDungeonPosition(tile, previousSelectedTile)) {
      const newSelection = [...selectedTiles]
      const deselectedTile = newSelection.pop()!
      tileRefs.current?.get(deselectedTile)?.current?.deselect()
      setSelectedTiles(newSelection)
    } else {
      tileRefs.current?.get(tile)?.current?.select()
      setSelectedTiles([...selectedTiles, tile])
    }
  }, [selectedTiles, lastSelectedTile, previousSelectedTile])

  const handleTouchMove = useCallback((pos: Position) => {
    const hitTile = lastSelectedAdjacentTiles.find(tile => isPosWithinShape(activeHitboxes.get(tile), pos))
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
