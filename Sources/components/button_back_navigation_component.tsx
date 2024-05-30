import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../service/Metrics';

type BackNavigationButton = {
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const BackNavigationButton: React.FC<BackNavigationButton> = ({ onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.icon, { tintColor: colors.text }]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      icon: {
        width: horizontalScale(35),
        height: verticalScale(35),
      },
});
  
export default BackNavigationButton;