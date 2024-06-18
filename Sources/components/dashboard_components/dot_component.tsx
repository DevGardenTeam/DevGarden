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
        height: ISLANDSCAPE ? HEIGHT * 0.1 : WIDTH *0.04 ,
        width: ISLANDSCAPE ? HEIGHT * 0.1 : WIDTH *0.04 ,
        marginRight: 10,
        borderRadius: WIDTH,
    }
})

export default Dot;