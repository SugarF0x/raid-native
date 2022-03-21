import { useEffect, useMemo } from 'react'
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export const TILE_ANIMATION_CONFIG = {
  duration: 1000,
  easing: Easing.bezier(0.5, 0.01, 0, 1),
}

export interface UseTranslationOptions {
  position: number
  size: number
}

export function useTranslation(options: UseTranslationOptions) {
  const { position, size } = options

  const expectedOffset = useMemo(() => position * size, [size, position])

  const y = useSharedValue((position - 6) * size)
  const animation = useAnimatedStyle(() => ({
    transform: [
      { translateY: withTiming(y.value, TILE_ANIMATION_CONFIG) }
    ]
  }))

  useEffect(() => {
    if (y.value < expectedOffset) y.value = expectedOffset
  }, [expectedOffset])

  return {
    animation
  }
}
