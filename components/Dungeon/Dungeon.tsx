import React, { useCallback } from 'react'
import { Arrow } from './Arrow'
import { Tile as TileComponent } from './Tile'
import { LayoutChangeEvent } from 'react-native'
import styled from 'styled-components/native'
import { useSelection, useTouch, useGrid } from './hooks'

const DungeonWrapper = styled.View`
  position: relative;
  background-color: black;
  flex-direction: row;
  aspect-ratio: 1;
`

const HitboxArea = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const DungeonColumn = styled.View`
  aspect-ratio: ${1/6};
  overflow: hidden;
  position: relative;
`

export const Dungeon = () => {
  const { setTileSize, tileSize, tiles, allTiles } = useGrid()
  const { selectedPoints, onTouchEnd, onTouchMove } = useSelection({ tiles: allTiles })
  const { panResponder } = useTouch({ onTouchEnd, onTouchMove })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width / 6)
  }, [])

  return (
    <DungeonWrapper onLayout={handleLayout}>
      {!!tileSize && (
        <>
          {tiles.map((col, colIndex) => (
            <DungeonColumn key={colIndex} >
              {col.map((row, rowIndex) => (
                <TileComponent
                  key={row.color}
                  size={tileSize}
                  row={rowIndex}
                  initialPosition={row.transitionStartRow}
                >
                  { row.color }
                </TileComponent>
              ))}
            </DungeonColumn>
          ))}
          <Arrow
            size={tileSize}
            points={selectedPoints}
          />
          <HitboxArea {...panResponder.current.panHandlers} />
        </>
      )}
    </DungeonWrapper>
  )
}