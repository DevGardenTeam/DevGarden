import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, ImageSourcePropType, Platform  } from 'react-native';

type ParmetersButton = {
    title: string,
    iconSource: ImageSourcePropType
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const ParmetersButton: React.FC<ParmetersButton> = ({ title, iconSource, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Image source={iconSource} style={styles.icon} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: '#FFFFFF',
      borderRadius: 5,
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
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
      marginLeft: 4,
      tintColor: '#FF0202',
    },
    text: {
      color: '#FF0202',
      fontSize: 16,
      fontWeight: 'bold',
    },
});
  
export default ParmetersButton;