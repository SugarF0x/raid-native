import { useCallback, useMemo, useState } from 'react'
import { isNotSelected } from './validators'
import { TileMeta } from '@components/Dungeon/Tile'

export function useSelection() {
  const [selectedTiles, setSelectedTiles] = useState<TileMeta[]>([])
  const lastSelectedTile = useMemo(() => selectedTiles[selectedTiles.length-1], [selectedTiles])
  const previousSelectedTile = useMemo(() => selectedTiles[selectedTiles.length-2], [selectedTiles])
  const selectedPoints = useMemo(() => selectedTiles.map(meta => meta.position), [selectedTiles])

  const handleTileSelect = useCallback((meta: TileMeta) => {
    const isValid = [
      !lastSelectedTile?.position || meta.position.isNear(lastSelectedTile.position),
      isNotSelected(meta.position, selectedPoints)
    ].every(Boolean)

    if (!isValid) return

    if (previousSelectedTile?.position && meta.position.isSame(previousSelectedTile.position)) {
      const newSelection = [...selectedTiles]
      newSelection.pop()
      setSelectedTiles(newSelection)
    } else {
      setSelectedTiles([...selectedTiles, meta])
    }
  }, [selectedTiles, selectedPoints, lastSelectedTile, previousSelectedTile])

  return {
    selectedTiles,
    selectedPoints,
    handleTileSelect
  }
}