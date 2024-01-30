import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

type BackNavigationButton = {
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const BackNavigationButton: React.FC<BackNavigationButton> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/arrow_back.png')} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      },
      icon: {
        width: 24,
        height: 24,
        tintColor: 'black',
      },
});
  
export default BackNavigationButton;