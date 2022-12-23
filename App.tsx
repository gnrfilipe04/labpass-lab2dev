import React from 'react'
import { useFonts, Inter_900Black, Inter_400Regular } from '@expo-google-fonts/inter'
import { theme } from './src/theme'
import {
  NativeBaseProvider, StatusBar
} from 'native-base'

import { Routes } from './src/routes'
import { PasswordsProvider } from './src/contexts/PasswordsContext'
import { AuthProvider } from './src/contexts/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'

export default function App() {

  let [ fontsLoaded, ] = useFonts({
    Inter_400Regular,
    Inter_900Black,
  })

  if (!fontsLoaded) {
    return null
  }

  const nativeBaseConfig = {
    
    dependencies: {
      'linear-gradient': LinearGradient,
    },
  }

  return (
    <NativeBaseProvider theme={theme} config={nativeBaseConfig}>
      <AuthProvider>
        <PasswordsProvider>
          <StatusBar
            backgroundColor={'transparent'}
            barStyle={'light-content'} 
            translucent={true}
          />
          <Routes />
        </PasswordsProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
}
