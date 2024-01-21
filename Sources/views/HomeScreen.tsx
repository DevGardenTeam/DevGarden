import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const HomeScreen: React.FC = () => {

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('../assets/splash.png')} 
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};

export default HomeScreen;