import React from 'react';
import { Image, Text, StyleSheet, Dimensions, ImageSourcePropType, View  } from 'react-native';

type BuildItem = {
    title: string,
    iconSource: ImageSourcePropType,
    value: number,
    mark: string
}

const BuildItem: React.FC<BuildItem> = ({ title, iconSource, value, mark }) => {
    var markTint = "#00D415"

    return (
        <View>
            <View style={styles.top}>
                <Image source={iconSource}></Image>
                <Text>{title}</Text>
            </View>
            <View style={[styles.cercle,{backgroundColor: markTint}]}>
                <Text style={[styles.mark]}>{mark}</Text>
            </View>
        </View>
    );
};

const WIDTH = Dimensions.get('window').width ;
const HEIGHT = Dimensions.get('window').height ;

const ISLANDSCAPE = WIDTH > HEIGHT;

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row'
    },
    cercle: {
        display: 'flex',
        width: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.1,
        height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.1,
        borderRadius: WIDTH, 
        alignItems:'center',
        justifyContent:'center'
    },
    mark: {
        color: '#FFFFFF',
        fontSize: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.05,
        fontWeight: 'bold'
    }
});

export default BuildItem;