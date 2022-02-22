import { useEffect, useRef, useState } from 'react'
import { Position } from '@classes'
import { GestureResponderEvent, PanResponder } from 'react-native'

export interface TouchOptions {
  onTouchMove: (pos: Position) => void
  onTouchEnd: () => void
}

export function useTouch(options: TouchOptions) {
  const { onTouchMove, onTouchEnd } = options

  const [touchPos, setTouchPos] = useState<null | Position>(null)

  useEffect(() => {
    if (touchPos) onTouchMove(touchPos)
    else onTouchEnd()
  }, [touchPos])

  const panResponder = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e: GestureResponderEvent) => {
      const { locationX: x, locationY: y } = e.nativeEvent
      setTouchPos(new Position(x, y))
    },
    onPanResponderEnd: () => {
      setTouchPos(null)
    }
  }))

  return {
    panResponder
  }
}