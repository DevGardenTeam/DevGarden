// GardenView.web.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GardenView: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default GardenView;