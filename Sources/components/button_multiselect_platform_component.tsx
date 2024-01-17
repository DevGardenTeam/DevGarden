import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';

type ButtonMultiSelectPlatformComponent = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void)
}

const ButtonMultiSelectPlatformComponent: React.FC<ButtonMultiSelectPlatformComponent> = ({ title, onPress }) => {
    const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePress = (image) => {
    setSelectedImage(image);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, selectedImage === 'gitlab' && styles.selectedButton]}
                        onPress={() => handleImagePress('gitlab')}>
        <Image source={require('./path/to/gitlab-image.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, selectedImage === 'github' && styles.selectedButton]}
                        onPress={() => handleImagePress('github')}>
        <Image source={require('./path/to/github-image.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, selectedImage === 'gitea' && styles.selectedButton]}
                        onPress={() => handleImagePress('gitea')}>
        <Image source={require('./path/to/gitea-image.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
    },
    button: {
      flex: 1,
      borderRadius: 10,
      overflow: 'hidden',
    },
    selectedButton: {
      backgroundColor: 'white',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });