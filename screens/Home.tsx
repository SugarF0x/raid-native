import styled from "styled-components/native";
import React from "react"
import { SafeAreaView, StyleProp, Text, TextStyle, TouchableOpacity } from "react-native"

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

const Touchable = ({ children, style, disabled }: { disabled?: boolean, children: React.ReactNode, style?: StyleProp<TextStyle> }) => {
  return (
    <TouchableOpacity disabled={disabled}>
      <Text style={style}>
        {children}
      </Text>
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
        <Button disabled>Continue</Button>
        <Button>New game</Button>
        <Button disabled>Options</Button>
        <Button disabled>Credits</Button>
      </Actions>
    </Wrapper>
  )
}