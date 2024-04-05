import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Member } from '../model/Member';

type ButtonPertElementComponent = {
    id: string;
    members: Member[];
    duration: string;
}

const ButtonPertElementComponent: React.FC<ButtonPertElementComponent> = ({ id, members, duration }) => {

    return (
        <View style={styles.rectangularContainer}>
            <Text style={styles.idTitle}>{id}</Text>
            <View>
                {members.map((member, index) => (
                    <Text key={index}>{member.name}</Text>
                ))}
            </View>
            <Text>{duration}</Text>
            <TouchableOpacity style={styles.roundButton}>
                <Text style={styles.buttonText}>o</Text>
            </TouchableOpacity>
        </View>
    );
};
    
const styles = StyleSheet.create({
    rectangularContainer: {
        flex: 1,
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
        overflow: 'hidden'
    },
    idTitle: {
        fontWeight: 'bold',
    },
    roundButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ButtonPertElementComponent;