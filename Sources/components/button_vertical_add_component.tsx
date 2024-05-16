import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ButtonVerticalAddComponent = {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void)
}

const ButtonVerticalAddComponent: React.FC<ButtonVerticalAddComponent> = ({ title, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={[ styles.container, { backgroundColor: colors.card }]} onPress={onPress}>
            <Text style={[ styles.title, { color: colors.text }]}>{title}</Text>
            <Image source={require('../assets/icons/add.png')} style={[ styles.icon, { tintColor: colors.text }]} />
        </TouchableOpacity>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
        padding: 16,
        height: '50%',
        width: '100%',
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        fontWeight: 'bold',
    }
});

export default ButtonVerticalAddComponent;