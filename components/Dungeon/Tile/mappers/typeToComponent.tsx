import React from 'react'
import { TileType, TileRefImperative } from '@utils'
import { Coin } from '../types'

type TileComponentType = React.ForwardRefExoticComponent<React.RefAttributes<TileRefImperative>>

export const tileTypeToComponentMapper: Record<TileType, TileComponentType> = {
  [TileType.COIN]: Coin
}

export default tileTypeToComponentMapper
