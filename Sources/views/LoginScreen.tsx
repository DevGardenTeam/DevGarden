import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, StatusBar, TextInput, Text } from 'react-native';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.image1}>
          <Image
            source={require('../assets/images/Rectangle_Login_1.png')}
          />
          <View style={styles.overlay}>
          <Text style={styles.title}>Bienvenue</Text>
            <TextInput
              style={styles.emailInput}
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        
        <View style={styles.space} />

        <View style={styles.image2}>
          <Image
            source={require('../assets/images/Rectangle_Login_2.png')}
          />
        </View>
    </SafeAreaView>
  );
};

const SIZE = Dimensions.get('window').width ;

const styles = StyleSheet.create({
  title : {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 10,
    marginBottom: 20,
  },
  emailInput: { 
    width: '60%',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'space-around',
  },
  image1: {
    width: SIZE,
    height: '50%',
    resizeMode: 'contain',
    position: 'relative',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    top: "10%",
    left: 0,
    right: 0,
    alignItems: 'center', // Horizontalement
    justifyContent: 'center', // Verticalement
  },
  image2: {
    width: SIZE,
    height: '40%',
    resizeMode: 'contain',
    position: 'relative',
    alignItems: 'center'
  },
  space: {
    height: 0,
  },
});

export default LoginScreen;
