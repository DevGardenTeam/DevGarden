import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

// Get screen width
const screenWidth = Dimensions.get('window').width;

// Calculate proportional text size
const textSize = screenWidth * 0.05; // Example: 5% of screen width

const LinkAccountView = () => {
  const [isLinked, setIsLinked] = useState<{
    [key: string]: boolean;
  }>({
    gitlab: false,
    github: false,
    gitea: false,
  });

  const handleLinkAccount = (platform: string) => {
    console.log(`Linking ${platform} account...`);
    // Handle logic to link account here
  };

  const platformLogos: { [key: string]: any } = {
    gitlab: require('../../assets/platforms/gitlab.png'),
    github: require('../../assets/platforms/github.png'),
    gitea: require('../../assets/platforms/gitea.png'),
  };
  const renderPlatformSection = (platform: string) => {
    console.log(`Rendering ${platform} section...`);
    const linkedStatus = isLinked[platform];
    const statusText = linkedStatus ? 'Linked' : 'Not Linked';
    const statusColor = linkedStatus ? 'green' : 'red';
    const platformLogo = platformLogos[platform];

    return (
      <TouchableOpacity
        key={platform}
        style={styles.platformSection}
        onPress={() => handleLinkAccount(platform)}
      >
        <Image source={platformLogo} style={styles.logo} />
        <Text style={[styles.text, { fontSize: textSize }]}>{platform.toUpperCase()}</Text>
        <Text style={[styles.text, { color: statusColor, marginLeft: 10 }]}>{statusText}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {['gitlab', 'github', 'gitea'].map(platform => renderPlatformSection(platform))}
    </View>
  );
};

const styles = StyleSheet.create({
  platformSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    width: 30, // Adjust size as needed
    height: 30, // Adjust size as needed
    marginRight: 10,
  },
  text: {
    // Add other text styling as needed
  },
});

export default LinkAccountView;