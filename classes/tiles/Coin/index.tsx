import { Tile, TileOptions } from '@classes/Tile'
import svgs from './assets/svgs'
import coins from '@classes/tiles/Coin/assets/svgs'
import { Audio, AVPlaybackStatus } from 'expo-av'
import { playSound } from '@utils'

interface Sound {
  sound: Audio.Sound,
  status: AVPlaybackStatus
}

const coinSelectSound: any = [
  require('./assets/sounds/select/0.mp3'),
  require('./assets/sounds/select/1.mp3'),
  require('./assets/sounds/select/2.mp3'),
]

const coinCollectSound: any = [
  require('./assets/sounds/collect/0.mp3'),
  require('./assets/sounds/collect/1.mp3'),
  require('./assets/sounds/collect/2.mp3'),
]

export class Coin extends Tile {
  selectSound!: Sound
  collectSound!: Sound
  svg

  constructor(options: TileOptions) {
    super(options)
    this.svg = svgs[this.id % coins.length]
  }

  onCollect() { playSound(coinCollectSound[Math.floor(Math.random() * coinCollectSound.length)]) }
  onSelect() { playSound(coinSelectSound[Math.floor(Math.random() * coinSelectSound.length)]) }
  onDeselect() { playSound(coinSelectSound[Math.floor(Math.random() * coinSelectSound.length)]) }
}
