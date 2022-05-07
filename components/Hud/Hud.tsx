import React from 'react'
import { StyleSheet, View } from 'react-native'
import { STROKE_COLOR } from '@consts'
import { Gold } from './Stats'

export const Hud = () => {


  return (
    <View style={styles.hud}>
      <Gold />
      <View style={styles.mid} />
      <View style={styles.bar} />
    </View>
  )
}

const styles = StyleSheet.create({
  hud: {
    flexDirection: "row",
    padding: 8
  },
  bar: {
    aspectRatio: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STROKE_COLOR,
    flex: 1
  },
  mid: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STROKE_COLOR,
    marginHorizontal: 8,
    flex: 1.5
  }
})
