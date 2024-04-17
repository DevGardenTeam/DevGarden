import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';

type ButtonVerticalAddComponent = {
    title: string;
}

const ButtonVerticalAddComponent: React.FC<ButtonVerticalAddComponent> = ({ title }) => {

    return (
        <TouchableOpacity style={styles.container}>
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
        backgroundColor: 'white',
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
    },
    icon: {
        width: 40,
        height: 40,
        tintColor: 'black',
    }
});

export default ButtonVerticalAddComponent;