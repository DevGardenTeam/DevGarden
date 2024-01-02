import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, StatusBar, TextInput, Text } from 'react-native';
import TextInputComponent from '../components/text_input_component';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.image}>
          <Image
            source={require('../assets/images/Rectangle_Login_1.png')}
          />
          <View style={styles.overlay}>
          <Text style={styles.title}>Bienvenue</Text>
            <TextInputComponent
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              iconSource={require('../assets/IconMail.png')}
            />
            <TextInputComponent
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              password = {true}
              iconSource={require('../assets/IconLock.png')}
            />
          </View>
        </View>

        <View style={styles.image}>
          <Image
            source={require('../assets/images/Rectangle_Login_2.png')}
          />
        </View>
    </SafeAreaView>
  );
};

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;


const styles = StyleSheet.create({
  title : {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 10,
    marginBottom: 20,
  },
  emailInput: { 
    width: WIDTH * 0.6,
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'flex-start',
  },
  image: {
    width: WIDTH,
    height: HEIGHT * 0.5,
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


});

export default LoginScreen;
