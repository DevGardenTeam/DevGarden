import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation/Navigation';
import { UserProvider } from './user/UserContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
      <Navigation></Navigation>
      </UserProvider>
    </SafeAreaProvider>
  );
}

