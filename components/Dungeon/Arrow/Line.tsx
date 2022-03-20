import React from 'react'
import { Polyline, PolylineProps } from 'react-native-svg'
import { Tile } from '@utils'

function convertTilePositionToLineAttrs(points: Tile[], size: number) {
  const offset = Math.floor(size / 2)
  return points.reduce((acc, val) => `${acc} ${val.col * size + offset},${val.row * size + offset}`, '')
}

interface LineProps {
  tiles: Tile[]
  size: number
}

type BaseLineProps = LineProps & Pick<PolylineProps, 'stroke' | 'strokeWidth'> & { markerEnd: string }

const BaseLine = ({ tiles, size, ...rest }: BaseLineProps) => <Polyline points={convertTilePositionToLineAttrs(tiles, size)} fill="none" strokeLinejoin="round" strokeLinecap="round" {...rest} />

export const Inline = ({ tiles, size }: LineProps) => <BaseLine tiles={tiles} size={size} strokeWidth="12" stroke="green" markerEnd="url(#arrowInline)" />
export const Outline = ({ tiles, size }: LineProps) => <BaseLine tiles={tiles} size={size} strokeWidth="24" stroke="black" markerEnd="url(#arrowOutline)" />
