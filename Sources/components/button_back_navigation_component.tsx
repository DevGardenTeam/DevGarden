import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useTheme } from '@react-navigation/native';

type BackNavigationButton = {
    onPress?: ((event: GestureResponderEvent) => void)
    size?: number
}
  
const BackNavigationButton: React.FC<BackNavigationButton> = ({ onPress, size=40 }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/icons/arrow_back.png')} style={{ tintColor: colors.text, width: size, height: size,}} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
});
  
export default BackNavigationButton;