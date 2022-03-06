import styled from 'styled-components/native'
import React, { useMemo } from 'react'
import Animated from 'react-native-reanimated'
import { useTranslation } from '@components/Dungeon/Tile/hooks'
import { Tile as TileClass } from '@classes'

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

  const Svg = useMemo(() => meta.svg, [id])

  const { animation } = useTranslation({ size, position: row, initialPosition: transitionStartRow })

  return (
    <TileComponent
      col={col}
      size={size}
      style={animation}
    >
      <Svg />
    </TileComponent>
  )
}
