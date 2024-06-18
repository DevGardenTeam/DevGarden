import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import fontSizes from '../constants/fontSize';

const LoadingComponent: React.FC = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
            <Text style={[styles.text, { color: colors.text }]}>Loading data...</Text>
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
        marginTop: 10,
        fontSize: fontSizes.medium
    },
});

export default LoadingComponent;
