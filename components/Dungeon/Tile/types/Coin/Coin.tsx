import React, { Ref, useImperativeHandle, useMemo } from 'react'
import { svgs, sounds } from './assets'
import { TileRefImperative, playSound } from '@utils'

export interface CoinProps {

}

function playRandomSound(sounds: any[]) {
  playSound(sounds[Math.floor(Math.random() * sounds.length)])
}

const CoinComponent = (props: CoinProps, ref: Ref<TileRefImperative>) => {
  const Svg = useMemo(() => svgs[Math.floor(Math.random() * svgs.length)] , [])

  useImperativeHandle(ref, () => ({
    select: () => { playRandomSound(sounds.select) },
    deselect: () => { playRandomSound(sounds.select) },
    collect: () => { playRandomSound(sounds.collect) }
  }), [])

  return <Svg />
}

export const Coin = React.forwardRef(CoinComponent)
export default Coin
