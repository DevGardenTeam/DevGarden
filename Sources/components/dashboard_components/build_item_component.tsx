import React from 'react';
import { Image, Text, StyleSheet, Dimensions, ImageSourcePropType, View  } from 'react-native';

type BuildItem = {
    title: string,
    iconSource: ImageSourcePropType,
    value: string,
    mark: string
}

const BuildItem: React.FC<BuildItem> = ({ title, iconSource, value, mark }) => {
    let markTint: string;

    switch(mark) {
        case 'A':
            markTint = "#00D415"
            break;   
        case 'B':
            markTint = "#A1FD0B"
            break;
        case 'C':
            markTint = "#F7CF00"
            break;    
        case 'D':
            markTint = "#FF0202"
            break;  
        case 'E':
            markTint = "black"
            break;  
        }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image source={iconSource} style={styles.icon}></Image>
                <Text style={styles.text}>{title} : {value}</Text>
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
    container:{
        display: 'flex',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'space-between',
        height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.2,
        width:'50%',
    },
    top: {
        flexDirection: 'row',
        justifyContent:'space-around',
        width:'65%'
    },
    icon: {
        resizeMode: 'contain',
        width: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.06,
        height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.06,
        marginRight:'15%'
    }, 
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    cercle: {
        display: 'flex',
        width: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.1,
        height: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.1,
        borderRadius: WIDTH, 
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#E7E7E7',
        borderWidth: 1,
    },
    mark: {
        color: '#FFFFFF',
        fontSize: ISLANDSCAPE ? HEIGHT*0.1 : WIDTH*0.05,
        fontWeight: 'bold'
    }
});

export default BuildItem;