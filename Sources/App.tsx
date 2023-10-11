import * as React from 'react';
import { View, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Routes } from './routes'
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/LogIn';

const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );

};
