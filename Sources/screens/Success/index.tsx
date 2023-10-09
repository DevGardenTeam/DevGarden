import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Success() {
    return(
        <View style={styles.container}>
            <Text>Success</Text>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });