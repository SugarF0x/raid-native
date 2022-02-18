import styled from 'styled-components/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'
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
  onSelect: (meta: TileMeta) => void
  children: string
  size: number
  position: Position
  initialPosition: number
}

export const Tile = (props: TileProps) => {
  const { onSelect, children, position, initialPosition, size } = props

  const meta = useMemo<TileMeta>(() => ({
    position
  }), [position])

  const { translationAnimTiming, topOffset } = useTranslation({ size, position: position.y, initialPosition })
  const [currentPosition, setCurrentPosition] = useState(initialPosition)

  const handleTouch = useCallback(() => {
    onSelect(meta)
  }, [meta])

  useEffect(() => {
    if (position.y <= currentPosition) return

    translationAnimTiming.start(() => {
      setCurrentPosition(position.y)
    })
  }, [position])

  return (
    <TouchableWithoutFeedback onPress={handleTouch}>
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
    </TouchableWithoutFeedback>
  )
}