import React from 'react'
import Svg from 'react-native-svg'
import { Tile } from '@utils'
import { Arrowhead } from './Arrowhead'
import { Outline, Inline } from './Line'
import { View } from 'react-native'

export interface ArrowProps {
  tiles: Tile[],
  size: number
}

export function Arrow(props: ArrowProps) {
  const { tiles, size } = props

  if (tiles.length < 2) return null

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: .8 }} pointerEvents={'none'}>
      <Svg>
        <Arrowhead />
        <Outline tiles={tiles} size={size} />
        <Inline tiles={tiles} size={size} />
      </Svg>
    </View>
  )
}
