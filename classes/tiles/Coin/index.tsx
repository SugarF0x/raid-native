import { Tile, TileOptions } from '@classes/Tile'
import { svgs, sounds } from './assets'
import coins from '@classes/tiles/Coin/assets/svgs'
import { playSound } from '@utils'

export class Coin extends Tile {
  svg

  constructor(options: TileOptions) {
    super(options)
    this.svg = svgs[this.id % coins.length]
  }

  onCollect() { playSound(sounds.collect[Math.floor(Math.random() * sounds.collect.length)]) }
  onSelect() { playSound(sounds.select[Math.floor(Math.random() * sounds.select.length)]) }
  onDeselect() { playSound(sounds.select[Math.floor(Math.random() * sounds.select.length)]) }
}
