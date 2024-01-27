import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, ImageSourcePropType, Platform, ColorValue  } from 'react-native';

type ParmetersButton = {
    title: string,
    iconSource: ImageSourcePropType,
    tint : ColorValue,
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const ParmetersButton: React.FC<ParmetersButton> = ({ title, iconSource, tint, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
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
      boxShadow: "0px 0px 28px 1px rgba(0,0,0,0.5)",
      width: '80%',
      margin:"8%"
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