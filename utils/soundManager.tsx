import Sound from "react-native-sound"

export const playSound = (sound: any) => {
  const ass = new Sound(sound, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + ass.getDuration() + 'number of channels: ' + ass.getNumberOfChannels());

    // Play the sound with an onEnd callback
    ass.play((success) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  })
}
