import React, { useMemo, useState } from 'react'
import { Svg, Rect, LinearGradient, Defs, Stop } from 'react-native-svg'
import { BACKGROUND_COLOR, STROKE_COLOR } from "@consts"

export interface GoldCoinProps {
  disabled?: boolean
}

export const GoldCoin = (props: GoldCoinProps) => {
  const { disabled } = props

  const [randomOffset] = useState(Math.floor(Math.random() * 100) / 100)

  const [primary, secondary, gradientOpacity] = useMemo(() => {
    if (!disabled) return ['rgb(189,156,0)', 'rgb(254,255,20)', 0.6]
    return [STROKE_COLOR, BACKGROUND_COLOR, 0]
  }, [disabled])

  return (
    <Svg viewBox="0 0 12 4">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopOpacity="0" />
          <Stop offset={randomOffset} stopColor={primary} stopOpacity={gradientOpacity} />
          <Stop offset="1" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Rect width="12" height="4" fill={primary} />
      <Rect width="10" height="2" x="1" y="1" fill={secondary} />
      <Rect width="10" height="2" x="1" y="1" fill="url(#grad)" />
    </Svg>
  )
}

export default GoldCoin
