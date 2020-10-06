import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import HomeScreen from './screens/Home'
import GameScreen from './screens/Game'
import FinishScreen from './screens/Finish'

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FFFF00'
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
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
  )
}

// #90EE90

