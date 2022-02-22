import styled from 'styled-components/native'
import React, { useEffect, useState } from 'react'
import { Animated } from 'react-native'
import { useTranslation } from '@components/Dungeon/Tile/hooks'
import { Position } from '@classes'

export interface TileMeta {
  position: Position
  // other stuff like tile type and shit will go here
  // this will also be used to save/load game states
}

interface TileComponentProps {
  size: number
  color: string
}

const TileComponent = styled(Animated.View)<TileComponentProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
`

interface TileProps {
  children: string
  size: number
  row: number
  initialPosition: number
}

export const Tile = (props: TileProps) => {
  const { children, row, initialPosition, size } = props

  const { translationAnimTiming, topOffset } = useTranslation({ size, position: row, initialPosition })
  const [currentRow, setCurrentRow] = useState(initialPosition)

  useEffect(() => {
    if (row <= currentRow) return

    translationAnimTiming.start(() => {
      setCurrentRow(row)
    })
  }, [row])

  return (
    <TileComponent
      color={children}
      size={size}
      style={{
        transform: [
          { translateY: topOffset },
          { perspective: 1000 }
        ]
      }}
    />
  )
}