import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Success } from '../screens/Success';
import Login from '../screens/LogIn';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
        <Screen
          name="Success"
          component={Success}
        />

        <Screen
          name="Login"
          component={Login}/>
    </NavigationContainer>
  )
}