import styled from 'styled-components/native'
import React, { useMemo } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from '@components/Dungeon/Tile/hooks'
import { Position, Tile as TileClass } from '@classes'
import { coins } from '@assets/svgs'

export interface TileMeta {
  position: Position
  // other stuff like tile type and shit will go here
  // this will also be used to save/load game states
}

interface TileComponentProps {
  size: number
  col: number
  children: React.ReactNode
}

const TileComponent = styled(Animated.View)<TileComponentProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  left: ${props => props.col * props.size}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface TileProps {
  meta: TileClass
}

export const Tile = (props: TileProps) => {
  const { meta } = props
  const { col, row, id, transitionStartRow, width: size } = meta

  const Coin = useMemo(() => coins[id % coins.length], [id])

  const { animation } = useTranslation({ size, position: row, initialPosition: transitionStartRow })

  return (
    <TileComponent
      col={col}
      size={size}
      style={animation}
    >
      <Coin />
    </TileComponent>
  )
}
