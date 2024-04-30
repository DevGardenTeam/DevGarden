import React from 'react';
import { Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ButtonProjectComponent = {
    title: string,
    memborsCount : string,
    onPress?: ((event: GestureResponderEvent) => void)
}
  
const ButtonProjectComponent: React.FC<ButtonProjectComponent> = ({ title, memborsCount, onPress }) => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={[styles.textProjectName, { color: colors.text }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button:{
        width: '80%',
        height: 100,
        marginLeft: '10%',
        marginRight: '10%',
        backgroundColor: '#FFFFFF',
        borderRadius: 1,
        // boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        marginVertical: '1%',
      },
      textProjectName:{
        fontWeight: 'bold',
        display: 'flex',
        marginLeft: '1%',
        fontSize: 20,
        overflow: 'hidden',
      }, 
})

export default ButtonProjectComponent;