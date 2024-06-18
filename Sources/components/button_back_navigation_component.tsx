import React from 'react';
import { Image, StyleSheet, TouchableOpacity, GestureResponderEvent, Dimensions, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { horizontalScale, verticalScale } from '../service/Metrics';
import { StackNavigationProp } from '@react-navigation/stack';
  
const BackNavigationButton: React.FC = () => {
    const { colors } = useTheme();
    const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.button} onPress={() => navigation?.goBack()}>
                <Image source={require('../assets/icons/arrow_back.png')} style={[ styles.icon, { tintColor: colors.text }]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation?.navigate("Parameters")}>
                <Image source={require('../assets/icons/settings.png')} style={[ styles.icon]} resizeMode="contain"/>                
            </TouchableOpacity>    
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: "row",
        gap: 12,
    },
    button: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    icon: {
        width: horizontalScale(30),
        height: verticalScale(30),
    },
});
  
export default BackNavigationButton;