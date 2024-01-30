import React from 'react';
import { Image, Text, StyleSheet, Dimensions, ImageSourcePropType, View  } from 'react-native';

type Dot = {
    color: string,
}

const Dot: React.FC<Dot> = ({ color }) => {

    return (
      <View
        style={[styles.dot,{backgroundColor: color}]}/>
    );
}

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        width: 10,
        marginRight: 10,
        borderRadius: 5,
    }
})

export default Dot;