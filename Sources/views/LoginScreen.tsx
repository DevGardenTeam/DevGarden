import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
        <Image
            source={require('../assets/images/Rectangle_Login_1.png')}
            style={styles.image1}
        />
        <View style={styles.space} />
        <Image
            source={require('../assets/images/Rectangle_Login_2.png')}
            style={styles.image2}
        />
    </View>
  );
};

const SIZE = Dimensions.get('window').width * 0.9;
const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding:5,
    margin:5,
    justifyContent : 'space-around'
  },
  image1: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
    position: 'relative',
  },
  image2: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    position: 'relative',
  },
  space: {
    height: 0,
  },
});

export default LoginScreen;