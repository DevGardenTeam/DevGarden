import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {moderateScale, horizontalScale, verticalScale } from '../service/Metrics';

type ButtonLabelCommitComponent = {
    title: string;
    image: string;
    onSelect?: (platform: string) => void;
}

const ButtonLabelCommitComponent: React.FC<ButtonLabelCommitComponent> = ({ title, image, onSelect }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.squareContainer}>
        <Image source={{ uri: image }}
          style={styles.image}
        />
      </View>
      <View style={styles.rectangularContainer}>
        <Text style={[styles.text, { color: colors.text }]}>{title}</Text>
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
    height: 'auto',
    width: 'auto',
  },
  squareContainer: {
    width: verticalScale(75),
    height: verticalScale(75),
    borderWidth: 2,
    borderColor: 'black',
    marginRight: horizontalScale(16),
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
    padding: horizontalScale(16),
    height: 'auto',
    overflow: 'hidden',
  },
  text: {
    fontSize: moderateScale(20),
  },
});

export default ButtonLabelCommitComponent;