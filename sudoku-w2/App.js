import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Provider} from 'react-redux'
import store from './store/'

import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import FinishScreen from './screens/Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
          />
          <Stack.Screen 
            name="Game" 
            component={GameScreen} 
          />
          <Stack.Screen 
            name="Finish" 
            component={FinishScreen} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

// #90EE90