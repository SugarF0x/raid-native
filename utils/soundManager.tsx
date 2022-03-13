import { Audio, AVPlaybackNativeSource } from 'expo-av'

export function playSound(sound: AVPlaybackNativeSource) {
  Audio.Sound.createAsync(
    sound,
    { shouldPlay: true }
  ).then((res)=>{
    res.sound.setOnPlaybackStatusUpdate((status)=>{
      if(status.isLoaded && !status.didJustFinish) return
      res.sound.unloadAsync().catch(()=>{})
    })
  }).catch((error)=>{
    console.log(error)
  })
}
