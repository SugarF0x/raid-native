import { Audio, AVPlaybackNativeSource, AVPlaybackStatus } from 'expo-av'
import { Sound } from 'expo-av/build/Audio/Sound'

const options = { shouldPlay: true }

function errorCatcher() {}

function soundUnloader(res: { sound: Sound, status: AVPlaybackStatus }) {
  res.sound.setOnPlaybackStatusUpdate((status) => {
    if(status.isLoaded && !status.didJustFinish) return
    res.sound.unloadAsync().catch(errorCatcher)
  })
}

export function playSound(sound: AVPlaybackNativeSource) {
  return Audio.Sound.createAsync(sound, options).then(soundUnloader).catch(errorCatcher)
}
