import styled from 'styled-components/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, Animated } from 'react-native'
import { useTranslation } from '@components/Tile/hooks'

interface TileComponentProps {
  collected?: boolean
  color: string
  size: number
}

const TileComponent = styled(Animated.View)<TileComponentProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: ${props => props.color};
`

interface TileProps {
  onClick: (value: string) => void
  children: string
  size: number
  position: number
  initialPosition: number
}

export const Tile = (props: TileProps) => {
  const { onClick, children, position, initialPosition, size } = props

  const { translationAnimTiming, topOffset } = useTranslation({ size, position, initialPosition })
  const [currentPosition, setCurrentPosition] = useState(initialPosition)

  const handleTouchEnd = useCallback(() => {
    onClick?.(children || '')
  }, [onClick, children])

  useEffect(() => {
    if (position <= currentPosition) return

    translationAnimTiming.start(() => {
      setCurrentPosition(position)
    })
  }, [position])

  return (
    <TileComponent
      color={children}
      onTouchEnd={handleTouchEnd}
      size={size}
      style={{
        transform: [
          { translateY: topOffset },
          { perspective: 1000 }
        ]
      }}
    >
      { children && <Text style={{ color: 'white', padding: 5 }}>{''}</Text> }
    </TileComponent>
  )
}