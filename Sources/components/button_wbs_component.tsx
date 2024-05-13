import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from '@react-navigation/native';

type ButtonWbsComponentProps = {
    id: string;
    title: string;
};
  
const ButtonWbsComponent: React.FC<ButtonWbsComponentProps> = ({ id, title }) => {
    const [ expanded, setExpanded ] = useState(false);
    const { colors } = useTheme();

    function toggleItem(){
        setExpanded(!expanded);
    }

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
                <Text style={[styles.accordTitle, { color: colors.text }]}>{ id }</Text>
                <Text style={[styles.accordTitle, { color: colors.text }]}>{ title }</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    accordContainer: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      height: '100%',
      width: '100%',
      boxShadow: '1px 1px 1px 1px rgba(0,0,0,0.5)',
      marginVertical: '1%',
    },
    accordHeader: {
      padding: 12,
      backgroundColor: 'white',
      color: 'black',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
      width: '100%',
    },
    accordTitle: {
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      fontWeight: 'bold',
    },
});
  
export default ButtonWbsComponent;