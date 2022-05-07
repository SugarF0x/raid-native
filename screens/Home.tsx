import React, { useMemo } from 'react'
import { SafeAreaView, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import { Link } from "react-router-native"
import { GameScreen } from "@screens/Game"

const LinkButton = ({ children, style, disabled, to }: { to: string, disabled?: boolean, children: React.ReactNode, style?: StyleProp<TextStyle> }) => {
  const textStyles = useMemo<StyleProp<TextStyle>>(() => ([
    styles.link,
    disabled && styles.linkDisabled
  ]), [style, disabled])

  return (
    <Link to={to} disabled={disabled} activeOpacity={.75} underlayColor={'transparent'}>
      <Text style={textStyles}>
        {children}
      </Text>
    </Link>
  )
}

export const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.title}>Raid Legacy</Text>
      <View style={styles.actions}>
        <LinkButton to={'/'} disabled>Continue</LinkButton>
        <LinkButton to={GameScreen.path}>New game</LinkButton>
        <LinkButton to={'/'} disabled>Options</LinkButton>
        <LinkButton to={'/'} disabled>Credits</LinkButton>
      </View>
    </SafeAreaView>
  )
}
HomeScreen.path = '/'

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    backgroundColor: "darkred",
    height: "100%",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 48,
    padding: 16,
    color: "yellow",
    fontWeight: "bold"
  },
  actions: {
    display: "flex",
    alignItems: "flex-end"
  },
  link: {
    fontSize: 32,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: "yellow"
  },
  linkDisabled: {
    opacity: .5
  }
})
