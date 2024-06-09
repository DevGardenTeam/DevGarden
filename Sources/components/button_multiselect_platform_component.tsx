import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PLATFORMS } from '../constants/constants';

type ButtonMultiSelectPlatformComponent = {
  onSelect?: (platform: string) => void;
}

const ButtonMultiSelectPlatformComponent: React.FC<ButtonMultiSelectPlatformComponent> = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePress = (image: string) => {
    setSelectedImage(image);
    onSelect && onSelect(image);
  };

  useEffect(() => {
    handleImagePress('Gitlab');
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, selectedImage === 'Gitlab' && styles.selectedButton]}
                        onPress={() => handleImagePress(PLATFORMS.GITLAB)}>
        <Image source={require('../assets/platforms/gitlab.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, selectedImage === 'Github' && styles.selectedButton]}
                        onPress={() => handleImagePress(PLATFORMS.GITHUB)}>
        <Image source={require('../assets/platforms/github.png')} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, selectedImage === 'Gitea' && styles.selectedButton]}
                        onPress={() => handleImagePress(PLATFORMS.GITEA)}>
        <Image source={require('../assets/platforms/gitea.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    height: '100%',
    width: '100%',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  selectedButton: {
    backgroundColor: 'white',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  },
});

export default ButtonMultiSelectPlatformComponent;