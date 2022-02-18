import React, { useCallback, useEffect, useState } from 'react'
import { Position } from '@classes'
import { Arrow } from './Arrow'
import { Tile } from './Tile'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import { useSelection } from '@components/Dungeon/hooks'

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

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

interface TileState {
  initialPosition: number
  color: string
}

export const Dungeon = () => {
  const [tiles, setTiles] = useState<TileState[][]>([])

  useEffect(() => {
    const randomIds = Object.keys(Array(36).fill(0)).map<TileState>(key => ({
      initialPosition: -1-Number(key) % 6,
      color: getRandomColor()
    }))
    setTiles(Array(6).fill(0).map(_ => Array(6).fill(0).map(_ => randomIds.pop()!)))
  }, [])

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

  const [tileSize, setTileSize] = useState(0)
  const handleColumnLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width)
  }, [])

  const { selectedPoints, handleTileSelect } = useSelection()

  return (
    <DungeonWrapper>
      {tiles.map((col, colIndex) => (
        <DungeonColumn key={colIndex} onLayout={handleColumnLayout}>
          {!!tileSize && col.map((row, rowIndex) => {
            const position = new Position(colIndex, rowIndex)

            return <Tile key={row.color} onSelect={handleTileSelect} size={tileSize} position={position} initialPosition={row.initialPosition}>{ row.color }</Tile>
          })}
        </DungeonColumn>
      ))}
      {!!tileSize && (
        <Arrow size={tileSize} points={selectedPoints} />
      )}
    </DungeonWrapper>
  )
}