import styled from 'styled-components/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
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

  const { translationAnimTiming, topOffset } = useTranslation({ size, position: row, initialPosition: transitionStartRow })
  const [currentRow, setCurrentRow] = useState(transitionStartRow)

  useEffect(() => {
    if (row <= currentRow) return

    translationAnimTiming.start(() => {
      setCurrentRow(row)
    })
  }, [row])

  return (
    <TileComponent
      col={col}
      size={size}
      style={{
        transform: [
          { translateY: topOffset },
          { perspective: 1000 }
        ]
      }}
    >
      <Coin />
    </TileComponent>
  )
}