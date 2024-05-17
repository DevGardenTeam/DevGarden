import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

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

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
    button: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      icon: {
        width: ISLANDSCAPE ? WIDTH*0.05 : WIDTH*0.12,
        height: ISLANDSCAPE ? WIDTH*0.05 : WIDTH*0.12,
      },
});
  
export default BackNavigationButton;