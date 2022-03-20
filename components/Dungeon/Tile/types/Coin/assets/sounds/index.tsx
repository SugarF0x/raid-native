import { AVPlaybackNativeSource } from 'expo-av'

const collect: AVPlaybackNativeSource[] = [
  require('./collect/0.mp3'),
  require('./collect/1.mp3'),
  require('./collect/2.mp3'),
]

const select: AVPlaybackNativeSource[] = [
  require('./select/0.mp3'),
  require('./select/1.mp3'),
  require('./select/2.mp3'),
]

export default {
  collect,
  select
}
