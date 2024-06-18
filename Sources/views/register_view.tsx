import React, { useState } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import TextInputComponent from '../components/text_input_component';
import { moderateScale, horizontalScale, verticalScale } from '../service/Metrics';
import { HandleRegister } from "../view-models/AuthentificationViewModel";
import { useTranslation } from "react-i18next"; // A ajouter pour le multi langue
import { useTheme } from '@react-navigation/native';

interface RegisterViewProps {
  navigation: StackNavigationProp<any>;
}

const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifPassword, setverifPassword] = useState('');

  const OnRegisterPress = () => {
    HandleRegister(email, password, verifPassword,navigation);
  };

  const { t } = useTranslation();

  const { colors } = useTheme();

  return (
    <View style={styles.safeArea}>
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.icon, { tintColor: colors.text }]} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainBody}>
        <View style={styles.square1}>
          <Text style={styles.title}>Create account</Text>
          <View style={styles.emailContainer}>
            <TextInputComponent
                placeholder={t('login.password')}
                value={email}
                onChangeText={(text) => setEmail(text)}
                iconSource={require('../assets/icons/IconMail.png')}
            />
            <TextInputComponent
                placeholder={t('login.password')}
                value={password}
                onChangeText={(text) => setPassword(text)}
                password = {true}
                iconSource={require('../assets/icons/IconLock.png')}
            />
            <TextInputComponent
                placeholder={t('register.confirmPassword')}
                value={verifPassword}
                onChangeText={(text) => setverifPassword(text)}
                password = {true}
                iconSource={require('../assets/icons/IconLock.png')}
            />
          </View>
          <View style={styles.alreadyAccount}>
              <Text>{t('register.alreadyAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.loginText}>{t("login.login")}</Text>
              </TouchableOpacity>
          </View>

        </View>

        <View style={styles.square2}>
            <TouchableOpacity style={styles.button} onPress={OnRegisterPress}>
              <Text style={styles.buttonText}>{t('register.createAccount')}</Text>
            </TouchableOpacity>
        </View>  
      </View>

    </View>
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
  
  view: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
},
icon: {
    width: horizontalScale(40),
    height: verticalScale(40),
},
});

export default RegisterView;