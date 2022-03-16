import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { NativeRouter, Routes, Route } from "react-router-native"
import { routes } from "./routes"
import 'react-native-console-time-polyfill'
import { View } from 'react-native'

export default function App() {
  return (
    <View>
      <NativeRouter>
        <Routes>
          {routes.map(Screen => (
            <Route key={Screen.path} path={Screen.path} element={<Screen />} />
          ))}
        </Routes>
      </NativeRouter>
      <StatusBar />
    </View>
  );
}
