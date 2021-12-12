import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from "styled-components/native"
import { HomeScreen } from "@screens"

const Wrapper = styled.View`
  
`

export default function App() {
  return (
    <Wrapper>
      <HomeScreen />
      <StatusBar />
    </Wrapper>
  );
}
