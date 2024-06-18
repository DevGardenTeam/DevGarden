import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, View, Text, StyleSheet, TouchableOpacity, ImageSourcePropType, Platform, ColorValue  } from 'react-native';
import { LogOutHandler } from '../view-models/LogoutViewModel';

type ParmetersButton = {
    title: string,
    iconSource: ImageSourcePropType,
    tint : ColorValue,
    navigation: StackNavigationProp<any>
}
  
const ParmetersButton: React.FC<ParmetersButton> = ({ title, iconSource, tint, navigation }) => {

  const OnLogOutPress = () => {
    LogOutHandler(navigation);
  };

    return (
        <TouchableOpacity style={styles.button} onPress={OnLogOutPress}>
            <View style={styles.buttonContent}>
                <Image source={iconSource} style={[styles.icon,{tintColor:tint}]} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 10,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
      width: '40%',
      margin: 10
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems:"center",
      justifyContent:"center"
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 8,
      marginLeft: 4,
      tintColor: '#FF0202',
    },
    text: {
      color: '#FF0202',
      fontSize: 20,
      fontWeight: 'bold',
    },
});
  
export default ParmetersButton;