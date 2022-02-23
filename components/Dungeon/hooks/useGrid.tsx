import { useEffect, useMemo, useState } from 'react'
import { Tile } from '@classes'

export function useGrid() {
  const [tileSize, setTileSize] = useState(0)
  const [tiles, setTiles] = useState<Tile[][]>([])
  const allTiles = useMemo(() => tiles.flatMap(i => i), [tiles])

  /** initially populate grid */
  useEffect(() => {
    if (!tiles.length && tileSize)
      setTiles(Array(6).fill(0).map((_, col) => Array(6).fill(0).map((_, row) => new Tile(col, row, row-6, tileSize))))
  }, [tileSize])

  return {
    tileSize,
    setTileSize,
    tiles,
    allTiles
  }

  /*

    TILE DELETION METHOD

  const tilesIdSet = useRef(new Set()).current
  const handleTileClick = useCallback((value: string) => {
    tilesIdSet.delete(value)

    const column = tiles.find(columns => columns.some(entry => entry.color === value))
    if (!column) return null

    const columnIndex = tiles.indexOf(column)
    const tile = column.find(entry => entry.color === value)
    if (!tile) return null
    const tileIndex = column.indexOf(tile)

    let color = ''
    do color = getRandomColor()
    while (tilesIdSet.has(color))
    tilesIdSet.add(color)

    const newColumn = [...column]
    newColumn.splice(tileIndex, 1)
    newColumn.unshift({
      color,
      initialPosition: -1
    })

    const newTiles = [...tiles]
    newTiles.splice(columnIndex, 1, newColumn)

    setTiles(newTiles)
  }, [tiles])
   */
}