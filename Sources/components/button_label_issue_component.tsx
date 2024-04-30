import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ButtonLabelIssueComponent = {
    name: string;
    isOpen: boolean;
    userCount: number;
}

const ButtonLabelIssueComponent: React.FC<ButtonLabelIssueComponent> = ({ name, isOpen, userCount }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.squareContainer}>
        <View style={[styles.statusIndicator, isOpen ? styles.openStatus : styles.closedStatus]} />
      </View>
      <View style={styles.rectangularContainer}>
        <Text style={[styles.issueName, { color: colors.text }]}>{name}</Text>
        <View style={styles.userCountContainer}>
          <Image source={require('../assets/icons/IconMail.png')} style={[styles.userIcon, { tintColor: colors.text }]} />
          <Text style={[styles.userCount, { color: colors.text }]}>{userCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    height: '100%',
    width: '100%',
  },
  squareContainer: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 60,
    marginRight: 16,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Pour s'assurer que l'image ne dépasse pas les bordures
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  rectangularContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
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
    height: '80%',
    overflow: 'hidden'
  },
  statusIndicator: {
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  openStatus: {
    backgroundColor: 'green',
  },
  closedStatus: {
    backgroundColor: 'red',
  },
  issueName: {
    fontSize: 30,
  },
  userCountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 5,
  },
  userIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  userCount: {
    fontSize: 14,
  },
});

export default ButtonLabelIssueComponent;