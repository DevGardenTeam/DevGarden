import React, { useState } from 'react';
import { View, Image, StyleSheet, Dimensions,SafeAreaView, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextInputComponent from '../components/text_input_component';
import BackNavigationButton from '../components/button_back_navigation_component';

interface RegisterViewProps {
  navigation: StackNavigationProp<any>;
}

const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listTop}>
        <View style={styles.backButton}>
          <BackNavigationButton onPress={() => navigation.navigate("Login")}/> 
        </View>
        <TouchableOpacity style={styles.cercle}>
            <Image source={require('../assets/dashboard_page_icon/tree.png')} style={styles.treeIcone}></Image>
        </TouchableOpacity>
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
        </View>  
      </View>

    </SafeAreaView>
  );
};

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 5,
  },

  safeArea: {
    flexDirection: 'column',
    height: '100%',
  },

  mainBody: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  cercle:{
    display: 'flex',
    width: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.15,
    height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.15,
    borderRadius: WIDTH, 
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: 'black',
    alignContent:'center',
    alignItems:'center',
  },
  treeIcone:{
    resizeMode: 'contain',
    height:'100%',
    width:'100%',
  },
  listTop:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop: StatusBar.currentHeight || 0,
    padding: '5%',
    marginBottom: '-5%'
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
    // borderBottomWidth: 1,
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
    fontSize: 16,
  },
  loginText: {
    color: 'green',
    textDecorationLine: 'underline',
  },
  
});

export default RegisterView;