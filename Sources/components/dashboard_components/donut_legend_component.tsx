import React from 'react';
import { Image, Text, StyleSheet, Dimensions, ImageSourcePropType, View  } from 'react-native';
import Dot from "./dot_component"

type DonutLegend = {
    color: string[],
    value: {string:string}
}

const DonutLegend: React.FC<DonutLegend> = ({ color, value }) => {

    var elements: React.ReactNode[] = [];

    for (const [idx, key] of Object.keys(value).entries()) {
        if (value.hasOwnProperty(key)) {
            elements.push(
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 120,
                        }}>
                        <Dot color={color[idx]}/>
                        <Text style={{color: 'black'}}>{key}: {value[key]}%</Text>
                    </View>
                    <View
                        style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                        <Dot color='#8F80F3'/>
                        <Text style={{color: 'black'}}>Typescripts: {value[key]}%</Text>
                    </View>
                </View>
            );
        }     
      }

    return (
        <>
        </>
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

export default DonutLegend;