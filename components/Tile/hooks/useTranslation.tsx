import { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Easing } from 'react-native'

export const TRANSLATION_DURATION = 1000

export interface UseTranslationOptions {
  position: number
  initialPosition: number
  size: number
}

export function useTranslation(options: UseTranslationOptions) {
  const { position, initialPosition, size } = options

  const [topOffset, setTopOffset] = useState(initialPosition * size)
  const expectedTopOffset = useMemo(() => position * size, [size, position])

  const translationAnimation = useRef(new Animated.Value(topOffset))
  const translationAnimTiming = useMemo(() => Animated.timing(translationAnimation.current, {
    toValue: expectedTopOffset,
    duration: TRANSLATION_DURATION,
    easing: Easing.inOut(Easing.cubic),
    useNativeDriver: false
  }), [expectedTopOffset])

  useEffect(() => {
    translationAnimation.current.addListener(({ value }) => { setTopOffset(value) })

    return () => {
      translationAnimation.current.removeAllListeners()
    }
  }, [])

  return {
    topOffset,
    translationAnimTiming
  }
}