import React, { useCallback, useEffect, useState } from 'react'
import { Arrow } from './Arrow'
import { Tile as TileComponent } from './Tile'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import { useSelection } from '@components/Dungeon/hooks'
import { Tile } from '@classes'

const DungeonWrapper = styled.View`
  position: relative;
  background-color: black;
  flex-direction: row;
  aspect-ratio: 1;
`

const DungeonColumn = styled.View`
  aspect-ratio: ${1/6};
  overflow: hidden;
  position: relative;
`

interface TileState {
  initialPosition: number
  tile: Tile
}

export const Dungeon = () => {
  const [tileSize, setTileSize] = useState(0)
  const [tiles, setTiles] = useState<TileState[][]>([])

  useEffect(() => {
    if (!tiles.length)
    setTiles(Array(6).fill(0).map((_, col) => Array(6).fill(0).map((_, row) => ({
      initialPosition: row-6,
      tile: new Tile(col, row, tileSize)
    }))))
  }, [tileSize])

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

  const handleColumnLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width)
  }, [])

  const { selectedPoints, handleTileSelect } = useSelection()

  return (
    <DungeonWrapper>
      {tiles.map((col, colIndex) => (
        <DungeonColumn
          key={colIndex}
          onLayout={handleColumnLayout}
        >
          {!!tileSize && col.map((row, rowIndex) => (
            <TileComponent
              key={row.tile.color}
              size={tileSize}
              row={rowIndex}
              initialPosition={row.initialPosition}
            >
              { row.tile.color }
            </TileComponent>
          ))}
        </DungeonColumn>
      ))}
      {!!tileSize && (
        <Arrow
          size={tileSize}
          points={selectedPoints}
        />
      )}
    </DungeonWrapper>
  )
}