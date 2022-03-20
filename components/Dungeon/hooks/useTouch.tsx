import { useMemo } from 'react'
import { Position } from '@utils'
import { GestureResponderEvent, PanResponder } from 'react-native'

export interface TouchOptions {
  onTouchMove: (pos: Position) => void
  onTouchEnd: () => void
}

export function useTouch(options: TouchOptions) {
  const { onTouchMove, onTouchEnd } = options

  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e: GestureResponderEvent) => {
      const { locationX: x, locationY: y } = e.nativeEvent
      onTouchMove({ x, y })
    },
    onPanResponderEnd: () => {
      onTouchEnd()
    }
  }), [onTouchEnd, onTouchMove])

  return {
    panResponder
  }
}
