import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextInputComponent from '../components/text_input_component';
import BackNavigationButton from '../components/button_back_navigation_component';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import { HandleRegister } from "../view-models/AuthentificationViewModel";

interface RegisterViewProps {
  navigation: StackNavigationProp<any>;
}

const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const OnRegisterPress = () => {
    HandleRegister(email, password,navigation);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backButton}>
        <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
      </View>

      <View style={styles.mainBody}>
        <View style={styles.square1}>
          <Text style={styles.title}>Create account</Text>
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
            <TextInputComponent
                placeholder="Confirm Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                password = {true}
                iconSource={require('../assets/icons/IconLock.png')}
            />
          </View>
          <View style={styles.alreadyAccount}>
              <Text>Already have an account?  </Text>
              <TouchableOpacity>
                  <Text style={styles.loginText}>Log in</Text>
              </TouchableOpacity>
          </View>

        </View>

        <View style={styles.square2}>
            <TouchableOpacity style={styles.button} onPress={OnRegisterPress}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>  
      </View>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(20),
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 5,
  },

  safeArea: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    paddingTop: StatusBar.currentHeight || 0,
  },

  mainBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  backButton:{
    marginLeft: horizontalScale(20),
    marginTop: verticalScale(20)
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
    justifyContent: 'center',
    alignItems: 'center',
  },

  alreadyAccount: {
    flexDirection: 'row',
  },
  
  button: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    backgroundColor: 'green',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '30%',
  },

  buttonText: {
    color: 'white',
    fontSize: moderateScale(16),
  },
  loginText: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  
});

export default RegisterView;