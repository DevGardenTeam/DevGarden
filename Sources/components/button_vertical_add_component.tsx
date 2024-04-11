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

    },
    title: {

    },
    icon: {
        
    }
});

export default ButtonVerticalAddComponent;