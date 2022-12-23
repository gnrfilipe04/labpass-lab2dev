import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome } from '../screens/Welcome'
import { Home } from '../screens/Home'
import { NewPass } from '../screens/NewPass'
import { Register } from '../screens/Register'
import { Login } from '../screens/Login'
import { Config } from '../screens/Config'

const { Navigator, Screen, } = createNativeStackNavigator()

export function StackRoutes () {

  return (
    <Navigator
      initialRouteName={'welcome'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name='welcome'
        component={Welcome}
      />
      <Screen
        name='login'
        component={Login}
      />
      <Screen
        name='register'
        component={Register}
      />
      <Screen
        name='home'
        component={Home}
      />
      <Screen
        name='newPass'
        component={NewPass}
      />
      <Screen
        name='config'
        component={Config}
      />
    </Navigator>
  )
}
