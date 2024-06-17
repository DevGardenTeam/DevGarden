import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextInputComponent from '../components/text_input_component';
import {moderateScale} from '../service/Metrics';

interface LoginScreenProps {
  navigation: StackNavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.safeArea}>
          <View style={styles.square1}>
            <Text style={styles.title}>Bienvenue</Text>
            <View style={styles.emailContainer}>
                <TextInputComponent
                  placeholder="Email Address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  iconSource={require('../assets/icons/IconMail.png')}
                />
                <TextInputComponent
                  placeholder="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  password = {true}
                  iconSource={require('../assets/icons/IconLock.png')}
                />
              </View>

          </View>

          <View style={styles.square2}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forget Password</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AllPlatforms")}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(20),
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 5,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  emailContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  square1: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  square2: {
    width: '80%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  forgotPasswordText: {
    color: 'green',
    fontSize: moderateScale(14),
    textDecorationLine: 'underline',
    },

  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  button: {
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    height: 'auto',
    
  },
  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
    margin: 5
  },
  
});

export default LoginScreen;