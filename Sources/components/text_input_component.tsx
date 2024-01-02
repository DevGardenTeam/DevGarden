import React from 'react';
import { DimensionValue, TextInput  } from 'react-native';

type TextInputProps  = {
    placeholder?: string
    width?: DimensionValue
    value?: string
    onChangeText?: (text: string) => void
}
  
const TextInputComponent: React.FC<TextInputProps > = ({ placeholder, width='70%', onChangeText, value  }) => {
    return (
                <TextInput 
                    style={{backgroundColor: '#F5F5F5', padding: 10, borderRadius: 8, elevation: 3, width: width, margin : 15}}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}>
                </TextInput >
                
    );
};

  
export default TextInputComponent;