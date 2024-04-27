import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Image } from 'react-native';
import { SECONDARY_COLOR, TEXT_COLOR } from '../constants/constants';

type ButtonVerticalAddComponent = {
    title: string;
    onPress?: ((event: GestureResponderEvent) => void)
}

const ButtonVerticalAddComponent: React.FC<ButtonVerticalAddComponent> = ({ title, onPress }) => {

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <Image source={require('../assets/icons/add.png')} style={styles.icon} />
        </TouchableOpacity>
    );
};
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
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
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: TEXT_COLOR,
        fontWeight: 'bold',
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: TEXT_COLOR,
        fontWeight: 'bold',
    }
});

export default ButtonVerticalAddComponent;