import React from 'react';
import { Text, StyleSheet, Dimensions, View  } from 'react-native';
import Dot from "./dot_component"

type DonutLegend = {
    color: string[],
    value: {[key: string]: string}
}

const DonutLegend: React.FC<DonutLegend> = ({ color, value }) => {

    var elements: React.ReactNode[] = [];

    var previousKey: string

    for (const [idx, key] of Object.keys(value).entries()) {
        if (value.hasOwnProperty(key)) {
            if (idx%2 === 0 && idx === (Object.keys(value).length-1)){
                elements.push(
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginBottom: 10,
                        }}>
                        <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                            <Dot color={color[idx]}/>
                            <Text style={{color: 'black'}}>{key}: {value[key]}%</Text>
                        </View>
                    </View>
                );
                break
            }
            if (idx%2 === 0){
                previousKey = key
                continue
            }
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
                        marginRight:20
                        }}>
                        <Dot color={color[idx-1]}/>
                        <Text style={{color: 'black'}}>{previousKey}: {value[previousKey]}%</Text>
                    </View>
                    <View
                        style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
                        <Dot color={color[idx]}/>
                        <Text style={{color: 'black'}}>{key}: {value[key]}%</Text>
                    </View>
                </View>
            );
        }     
      }

    return (
        <>
        {elements}
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