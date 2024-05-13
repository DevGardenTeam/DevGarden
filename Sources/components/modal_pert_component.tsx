import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Member } from '../model/Member';
import { useTheme } from '@react-navigation/native';

type ModalPertComponent = {
    id: string;
    title: string;
    duration: number;
    members: Member[];
    onSelect: () => void;
}

const ModalPertComponent: React.FC<ModalPertComponent> = ({ id, title, duration, members, onSelect }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.modalContainer}>
        <View style={styles.modalRow}>
            <Text style={[{ color: colors.text }]}>{id}</Text>
            <Text style={[{ color: colors.text }]}>{title}</Text>
        </View>
        <View style={styles.modalRow}>
            <Image source={require('../assets/icons/edit.png')}
                   style={styles.modalIcon}/>
            <View>
                {members.map((member, index) => (
                    <Text style={[{ color: colors.text }]} key={index}>{member.name}</Text>
                ))}
            </View>
        </View>
        <View style={styles.modalRow}>
            <Image source={require('../assets/icons/edit.png')}
                   style={[styles.modalIcon, { tintColor: colors.text }]}/>
            <Text style={[{ color: colors.text }]}>{duration}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    modalIcon: {
        width: 20,
        height: 20,
    }
});

export default ModalPertComponent;