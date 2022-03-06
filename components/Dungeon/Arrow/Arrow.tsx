import React, { useMemo } from 'react'
import Svg from 'react-native-svg'
import { Position, Tile } from '@classes'
import { Arrowhead } from '@components/Dungeon/Arrow/Arrowhead'
import { Outline, Inline } from '@components/Dungeon/Arrow/Line'
import { View } from 'react-native'

export interface ArrowProps {
  tiles: Tile[],
  size: number
}

export function Arrow(props: ArrowProps) {
  const { tiles, size } = props

  const points = useMemo<Position[]>(() => tiles.map(tile => new Position(tile.col, tile.row)), [tiles])

  if (points.length < 2) return null

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: .8 }} pointerEvents={'none'}>
      <Svg>
        <Arrowhead />
        <Outline points={points} size={size} />
        <Inline points={points} size={size} />
      </Svg>
    </View>
  )
}
