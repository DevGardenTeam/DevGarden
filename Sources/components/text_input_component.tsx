import React from 'react';
import { DimensionValue, TextInput, ImageSourcePropType, View, Image, StyleSheet  } from 'react-native';

type TextInputProps  = {
    placeholder?: string
    width?: DimensionValue
    value?: string
    onChangeText?: (text: string) => void
    iconSource?: ImageSourcePropType
}
  
const TextInputComponent: React.FC<TextInputProps > = ({ placeholder, width='70%', onChangeText, value, iconSource  }) => {
    return (
        <View style={[styles.container, { width: width }]}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}>
            </TextInput >

            <Image source={iconSource}></Image>
        </View>
                
    );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F5F5F5',
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
      position: 'absolute', // Pour que l'icône soit positionnée au-dessus du TextInput
      right: 10,    
    },
  });

  
export default TextInputComponent;