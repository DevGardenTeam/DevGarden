import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, GestureResponderEvent, ImageSourcePropType  } from 'react-native';

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
      backgroundColor: '#007bff',
      borderRadius: 4,
      padding: 10,
      alignItems: 'center',
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
      tintColor: '#fff',
    },
    text: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
});
  
export default ParmetersButton;