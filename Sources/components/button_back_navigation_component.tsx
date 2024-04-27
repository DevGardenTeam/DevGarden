import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { TEXT_COLOR } from '../constants/constants';

type BackNavigationButton = {
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const BackNavigationButton: React.FC<BackNavigationButton> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/icons/arrow_back.png')} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      icon: {
        width: 60,
        height: 60,
        tintColor: TEXT_COLOR,
      },
});
  
export default BackNavigationButton;