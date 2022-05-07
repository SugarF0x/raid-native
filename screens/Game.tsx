import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { BACKGROUND_COLOR, STROKE_COLOR } from '@consts'
import { Dungeon } from '@components'

export const GameScreen = () => {
  const [dungeonKey, setDungeonKey] = useState(0)
  const rerenderDungeon = useCallback(() => {
    setDungeonKey(key => ++key)
  }, [])

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.game}>
        <View style={styles.header}>
          {Object.keys([...Array(4)]).map(index => <View style={styles.headerItem} key={index} /> )}
          <View style={styles.headerItemLast}>
            <View style={styles.headerItemLastButton} />
            <View style={styles.headerItemLastButtonLast} onTouchStart={rerenderDungeon}>
              <Text style={{ color: 'white', fontSize: 10, padding: 2 }}>rerender dungeon</Text>
            </View>
          </View>
        </View>
        <Dungeon key={dungeonKey} />
        <View style={styles.hud}>
          <View style={styles.bar} />
          <View style={styles.mid} />
          <View style={styles.bar} />
        </View>
      </View>
    </SafeAreaView>
  )
}
GameScreen.path = '/game'

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "black",
    height: "100%",
    display: "flex",
    justifyContent: "center"
  },
  game: {
    backgroundColor: BACKGROUND_COLOR
  },
  header: {
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerItem: {
    borderWidth: 1,
    borderColor: STROKE_COLOR,
    borderStyle: 'solid',
    aspectRatio: 1,
    flex: 1.5,
    marginRight: 8
  },
  headerItemLast: {
    flex: 1,
    marginRight: 0
  },
  headerItemLastButton: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STROKE_COLOR,
    flex: 1,
    marginBottom: 8
  },
  headerItemLastButtonLast: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: STROKE_COLOR,
    flex: 1
  },
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
