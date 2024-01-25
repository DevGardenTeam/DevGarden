import React from 'react';
import { DimensionValue, TextInput, ImageSourcePropType, View, Image, StyleSheet, Dimensions  } from 'react-native';

type TextInputProps  = {
    placeholder?: string
    width?: DimensionValue
    value?: string
    onChangeText?: (text: string) => void
    iconSource?: ImageSourcePropType
    password?: boolean
}
  
const TextInputComponent: React.FC<TextInputProps > = ({ placeholder, width='85%', onChangeText, value, iconSource, password = false  }) => {
    return (
        <View style={[styles.container, { width: width }]}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry = {password}>
            </TextInput >

            <Image style={styles.icon} source={iconSource}></Image>
        </View>
                
    );
};


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', 
      alignItems: 'center', 
    },
    input: {
      flex: 1, // Pour que le TextInput prenne tout l'espace disponible
      backgroundColor: '#F5F5F5',
      padding: 10,
      borderRadius: 8,
      elevation: 3,
      margin : 15
    },
    icon: {
      position: 'absolute',
      right : WIDTH * 0.05,
    },
  });

  
export default TextInputComponent;