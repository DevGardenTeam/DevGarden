import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions, SafeAreaView, StatusBar, TextInput, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import TextInputComponent from '../components/text_input_component';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setChecked] = useState(false);

  const BigSquare = () => {
    return <View style={styles.square1} />;
  };
  const SmallSquare = () => {
    return <View style={styles.square2} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.image}>
          <BigSquare/>
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
            <CheckBox
              title='Remember Password'
              checkedColor='green'
              checked={isChecked}
              onPress={() => setChecked(!isChecked)}
              >
            </CheckBox>
          </View>
        </View>

        <View style={styles.image}>
          <SmallSquare/>
          <View style={styles.overlay}>
            <TouchableOpacity>
              <Text style={styles.forgotPasswordText}>Forget Password</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
        </View>
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
    marginBottom: '20%',
  },

  emailInput: { 
    width: WIDTH * 0.6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    elevation: 3,
  },

  safeArea: {
    paddingTop: StatusBar.currentHeight,
  },

  image: {
    flex: 0,
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop: '5%',
  },

  overlay: {
    position: 'absolute',
    top: WIDTH * 0.1,
    left: 0,
    right: 0,
    alignItems: 'center', // Horizontalement
  },

  square1: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.6,
    backgroundColor: 'white', // Couleur du carré
    borderRadius: 15, // Bord arrondi
    elevation: 5, // Élévation pour l'ombre
    shadowColor: 'black', // Couleur de l'ombre
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  square2: {
    width: WIDTH * 0.8,
    height: HEIGHT * 0.3,
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
  },

  forgotPasswordText: {
    color: 'green',
    fontSize: 14,
    textDecorationLine: 'underline',
    left : WIDTH * 0.2,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop : '15%', // à changer apres pour le responsive
  },
  button: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    backgroundColor: 'green',
    width : WIDTH * 0.3,
    height : HEIGHT * 0.05,
    borderRadius : 20,
    alignItems: 'center', 
    justifyContent: 'center',
    margin : 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },

});

export default LoginScreen;
