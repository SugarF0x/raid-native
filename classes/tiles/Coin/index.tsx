import { Tile, TileOptions } from '@classes/Tile'
import svgs from './assets/svgs'
import coins from '@classes/tiles/Coin/assets/svgs'

export class Coin extends Tile {
  selectSound
  collectSound
  svg

  constructor(options: TileOptions) {
    super(options)
    this.svg = svgs[this.id % coins.length]
    this.selectSound = 'piss'
    this.collectSound = 'piss'
  }

  onCollect() { console.log(`Coin collected: ${this.id}`) }
  onSelect() { console.log(`Coin selected: ${this.id}`) }
  onDeselect() { console.log(`Coin deselected: ${this.id}`) }
}
