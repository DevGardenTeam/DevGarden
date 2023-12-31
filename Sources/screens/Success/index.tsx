import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles'

export function Success({ route }) {
   
    const { accessToken } = route.params;

    console.log("accessToken received on the success page => " + accessToken);

    return(
        <View style={styles.container}>
            <Text>Success</Text>
        </View>
    )
}
