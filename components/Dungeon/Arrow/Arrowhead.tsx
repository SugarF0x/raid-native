import React from 'react'
import { Defs, Marker, Path } from 'react-native-svg'

export function Arrowhead() {
  return (
    <Defs>
      <Marker viewBox="0 0 3 3" id="arrowOutline" refX=".75" refY="1" orient="auto">
        {/* @ts-ignore */}
        <Path d="M0,0 L0,2 L2,1" fill="black" pointerEvents={'none'} />
      </Marker>
      <Marker viewBox="0 0 3 3" id="arrowInline" refX="2" refY="2" orient="auto">
        {/* @ts-ignore */}
        <Path d="M0.9,0.8 L0.9,3.2 L3.5,2" fill="green" pointerEvents={'none'} />
      </Marker>
    </Defs>
  )
}
