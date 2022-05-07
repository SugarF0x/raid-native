import React from 'react'
import { StyleSheet, View } from 'react-native'
import { STROKE_COLOR } from '@consts'
import { GoldCoin } from './Coin'

export interface GoldProps {
  value?: number
}

export const Gold = (props: GoldProps) => {
  const { value } = props

  return (
    <View style={styles.wrapper}>
      <GoldCoin />
    </View>
  )
}

export default Gold

const styles = StyleSheet.create({
  wrapper: {
    aspectRatio: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STROKE_COLOR,
    flex: 1
  }
})
