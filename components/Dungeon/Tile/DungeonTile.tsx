import styled from 'styled-components/native'
import React, { Ref, RefObject, useEffect, useMemo, useRef } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from './hooks'
import { Tile, TileRefImperative } from '@utils'
import tileTypeToComponentMapper from './mappers/typeToComponent'

interface TileComponentProps {
  size: number
  col: number
}

const Wrapper = styled(Animated.View)<TileComponentProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.col * props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
    <Wrapper
      col={col}
      size={size}
      style={animation}
    >
      <TileComponent ref={tileRef} />
    </Wrapper>
  )
}
