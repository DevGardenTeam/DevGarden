import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent, Dimensions, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../service/Metrics';

type BackNavigationButton = {
    onPress?: ((event: GestureResponderEvent) => void)
    onPressParameters?: ((event: GestureResponderEvent) => void)
}
  
const BackNavigationButton: React.FC<BackNavigationButton> = ({ onPress, onPressParameters }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.icon, { tintColor: colors.text }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressParameters}>
                <Image source={require('../assets/icons/settings.png')} style={[ styles.icon, { tintColor: colors.text }]} />                
            </TouchableOpacity>            
        </View>

    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "row",
    },
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