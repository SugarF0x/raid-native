import styled, { css } from 'styled-components/native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Text, Animated, Easing } from 'react-native'

const TRANSLATION_DURATION = 1000

const TileComponent = styled(Animated.View)<{
  touched?: boolean
  collected?: boolean
  color: string
  size: number
  topOffset: number
}>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  top: ${props => props.topOffset}px;
  background-color: ${props => props.color};
  ${props => !props.touched ? css`
    border: 1px solid white;
    flex: 1;
  ` : css`
    background-color: grey;
    flex: 0;
  `}
`

interface TileProps {
  onClick?: (value: string) => void
  children: string
  size: number
  position: number
  initialPosition: number
}

export const Tile = (props: TileProps) => {
  const { onClick, children, position, initialPosition, size } = props

  const [currentPosition, setCurrentPosition] = useState(initialPosition)
  const [topOffset, setTopOffset] = useState(initialPosition * size)
  const [isTouched, setIsTouched] = useState(false)
  const [isCollected, setIsCollected] = useState(false)

  const expectedTopOffset = useMemo(() => position * size, [size, position])

  const translationAnimation = useRef(new Animated.Value(topOffset))
  const translationAnimTiming = useMemo(() => Animated.timing(translationAnimation.current, {
    toValue: expectedTopOffset,
    duration: TRANSLATION_DURATION,
    easing: Easing.inOut(Easing.cubic),
    useNativeDriver: true
  }), [expectedTopOffset])

  const collect = useCallback(() => {
    setIsCollected(true)
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsTouched(true)
  }, [])

  const handleTouchEnd = useCallback(() => {
    collect()
    onClick?.(children || '')
  }, [onClick, children])

  useEffect(() => {
    if (position <= currentPosition) return

    translationAnimTiming.start(() => {
      setCurrentPosition(position)
    })
  }, [position])

  useEffect(() => {
    translationAnimation.current.addListener(({ value }) => { setTopOffset(value) })

    return () => {
      translationAnimation.current.removeAllListeners()
    }
  }, [])

  return (
    <TileComponent color={children} onTouchStart={handleTouchStart} touched={isTouched} collected={isCollected} onTouchEnd={handleTouchEnd} topOffset={topOffset} size={size} >
      { children && <Text style={{ color: 'white', padding: 5 }}>{''}</Text> }
    </TileComponent>
  )
}