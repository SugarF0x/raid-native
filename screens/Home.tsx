import styled from "styled-components/native";
import React from "react"
import { SafeAreaView, StyleProp, Text, TextStyle, TouchableOpacity } from "react-native"
import { Link } from "react-router-native"
import { GameScreen } from "@screens"

const Wrapper = styled(SafeAreaView)`
  display: flex;
  background-color: darkred;
  height: 100%;
  justify-content: space-between;
`

const Title = styled.Text`
  font-size: 48px;
  padding: 16px;
  color: yellow;
  font-weight: bold;
`

const Actions = styled.View`
  display: flex;
  align-items: flex-end;
`

const Touchable = ({ children, style, disabled, to }: { to: string, disabled?: boolean, children: React.ReactNode, style?: StyleProp<TextStyle> }) => {
  return (
    <TouchableOpacity disabled={disabled}>
      <Link to={to} disabled={disabled}>
        <Text style={style}>
          {children}
        </Text>
      </Link>
    </TouchableOpacity>
  )
}

const Button = styled(Touchable)`
  font-size: 32px;
  padding: 8px 16px;
  color: yellow;
  ${props => props.disabled && `
    opacity: .5;
  `}
`

export const HomeScreen = () => {

  return (
    <Wrapper>
      <Title>Raid Legacy</Title>
      <Actions>
        <Button to={'/'} disabled>Continue</Button>
        <Button to={GameScreen.path}>New game</Button>
        <Button to={'/'} disabled>Options</Button>
        <Button to={'/'} disabled>Credits</Button>
      </Actions>
    </Wrapper>
  )
}
HomeScreen.path = '/'
