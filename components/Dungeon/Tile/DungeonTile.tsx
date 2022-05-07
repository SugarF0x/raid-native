import React, { Ref, RefObject, useEffect, useMemo, useRef } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from './hooks'
import { Tile, TileRefImperative } from '@utils'
import tileTypeToComponentMapper from './mappers/typeToComponent'
import { StyleSheet } from 'react-native'

interface DungeonTileProps {
  tile: Tile
  tileRefs: RefObject<WeakMap<Tile, Ref<TileRefImperative>>>
  size: number
}

export const DungeonTile = (props: DungeonTileProps) => {
  const { tile, tileRefs, size } = props
  const { col, row, type } = tile

  const { animation } = useTranslation({ size, position: row })

  const tileRef = useRef<TileRefImperative>(null)

  const TileComponent = useMemo(() => tileTypeToComponentMapper[type], [type])

  useEffect(() => {
    tileRefs.current!.set(tile, tileRef)
  }, [])

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          width: size,
          height: size,
          left: col * size
        },
        animation
      ]}
    >
      <TileComponent ref={tileRef} />
    </Animated.View>
  )
}

const styles = StyleSheet.create(({
  wrapper: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}))
