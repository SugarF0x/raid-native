import { Tile, TileOptions } from '@classes/Tile'
import svgs from './assets/svgs'
import coins from '@classes/tiles/Coin/assets/svgs'
import { Audio, AVPlaybackStatus } from 'expo-av'

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
    this.collectSound = coinCollectSound[Math.floor(Math.random() * coinCollectSound.length)]
    void this.loadSounds()
  }

  async loadSounds() {
    this.selectSound = await Audio.Sound.createAsync(coinSelectSound[Math.floor(Math.random() * coinSelectSound.length)])
    this.collectSound = await Audio.Sound.createAsync(coinCollectSound[Math.floor(Math.random() * coinCollectSound.length)])
    this.collectSound.sound.setOnPlaybackStatusUpdate((playbackStatus) => {
      if (playbackStatus.isLoaded && playbackStatus.didJustFinish) this.unloadSounds()
    })
  }

  async unloadSounds() {
    await this.selectSound.sound.unloadAsync()
    await this.collectSound.sound.unloadAsync()
  }

  onCollect() {
    void this.collectSound.sound.playAsync()
    void this.unloadSounds()
  }
  onSelect() { void this.selectSound.sound.replayAsync() }
  onDeselect() { void this.selectSound.sound.replayAsync() }
}
