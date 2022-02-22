import React from 'react'
import { Polyline, PolylineProps } from 'react-native-svg'
import { Position } from '@classes'

function convertPositionToLineAttrs(points: Position[], size: number) {
  const offset = Math.floor(size / 2)
  return points.reduce((acc, val) => `${acc} ${val.x * size + offset},${val.y * size + offset}`, '')
}

interface LineProps {
  points: Position[]
  size: number
}

type BaseLineProps = LineProps & Pick<PolylineProps, 'stroke' | 'strokeWidth'> & { markerEnd: string }

const BaseLine = ({ points, size, ...rest }: BaseLineProps) => <Polyline points={convertPositionToLineAttrs(points, size)} fill="none" strokeLinejoin="round" strokeLinecap="round" {...rest} />

export const Inline = ({ points, size }: LineProps) => <BaseLine points={points} size={size} strokeWidth="12" stroke="green" markerEnd="url(#arrowInline)" />
export const Outline = ({ points, size }: LineProps) => <BaseLine points={points} size={size} strokeWidth="24" stroke="black" markerEnd="url(#arrowOutline)" />
