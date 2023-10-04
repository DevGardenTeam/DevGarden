import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    const splashDuration = 3000; 

    setTimeout(() => {
      // Naviguez vers l'écran principal ou l'écran suivant
      // Ici, vous pouvez utiliser React Navigation ou une autre bibliothèque de navigation
      // Pour cet exemple, nous allons simplement afficher un écran vide (à remplacer par votre écran principal)
      // Remplacez 'MainScreen' par votre écran principal
      // navigation.navigate('MainScreen');
    }, splashDuration);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require('./Plant_GIF.gif')} 
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SplashScreen;