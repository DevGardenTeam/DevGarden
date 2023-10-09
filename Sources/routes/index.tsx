import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Success } from '../screens/Success';

const { Navigator, Screen } = createStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
        <Screen
          name="Success"
          component={Success}
        />
    </NavigationContainer>
  )
}