import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonLabelIssueComponent = {
    name: string;
    isOpen: boolean;
    userCount: Int32Array;
    onSelect?: (platform: string) => void;
}

const ButtonLabelIssueComponent: React.FC<ButtonLabelIssueComponent> = ({ name, isOpen, userCount, onSelect }) => {

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.statusIndicator, isOpen ? styles.openStatus : styles.closedStatus]} />
      <Text style={styles.issueName}>{name}</Text>
      <View style={styles.userCountContainer}>
        <Image source={require('../assets/IconMail.png')} style={styles.userIcon} />
        <Text style={styles.userCount}>{userCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  openStatus: {
    backgroundColor: 'green',
  },
  closedStatus: {
    backgroundColor: 'red',
  },
  issueDetails: {
    flex: 1,
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