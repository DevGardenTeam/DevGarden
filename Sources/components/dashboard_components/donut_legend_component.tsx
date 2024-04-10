import React from 'react';
import { Text, StyleSheet, Dimensions, View  } from 'react-native';
import Dot from "./dot_component"

type DonutLegendProps = {
    color: string[],
    value: {[key: string]: string}
}

const DonutLegend: React.FC<DonutLegendProps> = ({ color, value }) => {

    const elements: React.ReactNode[] = [];

    let previousKey: string

    for (const [idx, key] of Object.keys(value).entries()) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            if (idx%2 === 0 && idx === (Object.keys(value).length-1)){
                elements.push(
                    <View
                    key={key}
                        style={styles.main}>
                        <View style={styles.second}>
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
                    key={key}
                    style={styles.main}>
                    <View style={[styles.second,{marginRight:20}]}>
                        <Dot color={color[idx-1]}/>
                        <Text style={{color: 'black'}}>{previousKey}: {value[previousKey]}%</Text>
                    </View>
                    <View
                        style={styles.second}>
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
    main : {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    second : {
        flexDirection: 'row',
        alignItems: 'center',
        width: ISLANDSCAPE ? HEIGHT * 0.1 : WIDTH *0.33 ,
    }
})

export default DonutLegend;