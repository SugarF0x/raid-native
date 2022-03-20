import React, { Ref, useImperativeHandle, useMemo } from 'react'
import { svgs } from './assets'
import { TileRefImperative } from '@utils'

export interface CoinProps {

}

const CoinComponent = (props: CoinProps, ref: Ref<TileRefImperative>) => {
  const Svg = useMemo(() => svgs[Math.floor(Math.random() * svgs.length)] , [])

  useImperativeHandle(ref, () => ({
    select: () => { console.log('Coin selected') },
    deselect: () => { console.log('Coin deselected') },
    collect: () => { console.log('Coin collected') }
  }), [])

  return <Svg />
}

export const Coin = React.forwardRef(CoinComponent)
export default Coin
