import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styled from "styled-components/native"
import { NativeRouter, Routes, Route } from "react-router-native"
import { routes } from "./routes"

const Wrapper = styled.View`
  
`

export default function App() {
  return (
    <Wrapper>
      <NativeRouter>
        <Routes>
          {routes.map(Screen => (
            <Route key={Screen.path} path={Screen.path} element={<Screen />} />
          ))}
        </Routes>
      </NativeRouter>
      <StatusBar />
    </Wrapper>
  );
}
