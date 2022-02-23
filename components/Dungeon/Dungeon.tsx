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
  overflow: hidden;
`

const HitboxArea = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Dungeon = () => {
  const { setTileSize, tileSize, tiles, handleTileDeletion } = useGrid()
  const { selectedTiles, onTouchEnd, onTouchMove } = useSelection({ tiles })
  const { panResponder } = useTouch({ onTouchEnd, onTouchMove })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width / 6)
  }, [])

  return (
    <DungeonWrapper onLayout={handleLayout}>
      {tiles.map((tile) => (
        <TileComponent
          key={tile.color}
          meta={tile}
        />
      ))}
      <Arrow
        size={tileSize}
        tiles={selectedTiles}
      />
      <HitboxArea {...panResponder.current.panHandlers} onTouchStart={() => handleTileDeletion([ tiles[0], tiles[2], tiles[7] ])}/>
    </DungeonWrapper>
  )
}