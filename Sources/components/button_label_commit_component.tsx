import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonLabelCommitComponent = {
    title: string;
    image: string;
    onSelect?: (platform: string) => void;
}

const ButtonLabelCommitComponent: React.FC<ButtonLabelCommitComponent> = ({ title, image, onSelect }) => {

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.squareContainer}>
        <Image source={{ uri: 'https://example.com/your-image.jpg' }}
          style={styles.image}
        />
      </View>
      <View style={styles.rectangularContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
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
    marginRight: 16,
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
  text: {
    fontSize: 40,
  },
});

export default ButtonLabelCommitComponent;