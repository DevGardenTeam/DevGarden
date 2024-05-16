import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Member } from '../model/Member';
import { useTheme } from '@react-navigation/native';

type ButtonPertElementComponent = {
    id: string;
    members: Member[];
    duration: string;
}

const ButtonPertElementComponent: React.FC<ButtonPertElementComponent> = ({ id, members, duration }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.rectangularContainer}>
            <Text style={[styles.idTitle, { color: colors.text }]}>{id}</Text>
            <View>
                {members.map((member, index) => (
                    <Text key={index}>{member.name}</Text>
                ))}
            </View>
            <Text style={[styles.durationText, { color: colors.text }]}>{duration}</Text>
            <TouchableOpacity style={styles.roundButton}>
                <Image source={require('../assets/icons/edit.png')}
                       style={[styles.imageButton, { tintColor: colors.text }]}/>
            </TouchableOpacity>
        </View>
    );
};

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;
    
const styles = StyleSheet.create({
    rectangularContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        fontSize: 30,
    },
    durationText: {
        fontSize: 20,
    },
    roundButton: {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width:'60%'
    },
    imageButton: {
        width: ISLANDSCAPE ? WIDTH*0.05 : WIDTH*0.08,
        height: ISLANDSCAPE ? WIDTH*0.05 : WIDTH*0.08,
        resizeMode:'contain',
    }
});

export default ButtonPertElementComponent;