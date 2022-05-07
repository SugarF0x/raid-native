import React, { useCallback } from 'react'
import { Arrow } from './Arrow'
import { DungeonTile } from './Tile'
import { LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { useSelection, useTouch, useGrid } from './hooks'

export const Dungeon = () => {
  const { setTileSize, tileSize, tiles, tileRefs, handleTileDeletion } = useGrid()
  const { selectedTiles, onTouchEnd, onTouchMove } = useSelection({ tiles, onTouchEnd: handleTileDeletion, size: tileSize, tileRefs})
  const { panResponder } = useTouch({ onTouchEnd, onTouchMove })

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setTileSize(width / 6)
  }, [])

  return (
    <View style={styles.wrapper} onLayout={handleLayout}>
      {tileSize > 0 && (
        <>
          {tiles.map((tile) => (
            <DungeonTile
              key={tile.id}
              size={tileSize}
              tile={tile}
              tileRefs={tileRefs}
            />
          ))}
        </>
      )}
      <Arrow
        size={tileSize}
        tiles={selectedTiles}
      />
      <View style={styles.hitbox} {...panResponder.panHandlers} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    backgroundColor: "black",
    flexDirection: "row",
    aspectRatio: 1,
    overflow: "hidden"
  },
  hitbox: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,0.001)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
})
