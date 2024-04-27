import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TEXT_COLOR } from '../constants/constants';

type AccordionItemProps = {
    id: string;
    title: string;
    children?: React.ReactNode;
};
  
const AccordionItem: React.FC<AccordionItemProps> = ({ id, title, children }) => {
    const [ expanded, setExpanded ] = useState(false);
    
    function toggleItem(){
        setExpanded(!expanded);
    }

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
                <Text style={styles.accordTitle}>{ id }</Text>
                <Text style={styles.accordTitle}>{ title }</Text>
                {expanded ? (
                    <Image
                        source={require('../assets/icons/chevron_up.png')}
                        style={styles.accordImage}
                    />
                ) : (
                    <Image
                        source={require('../assets/icons/chevron_down.png')}
                        style={styles.accordImage}
                    />
                )}
            </TouchableOpacity>
            {expanded && (
                <View style={styles.accordBody}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    accordContainer: {
      paddingBottom: 4,
      flex: 1,
      height: '100%',
      width: '100%',
    },
    accordHeader: {
      padding: 12,
      backgroundColor: 'white',
      color: 'black',
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between'
    },
    accordTitle: {
      fontSize: 30,
      display: 'flex',
      alignItems: 'center',
      color: TEXT_COLOR,
      fontWeight: 'bold',
    },
    accordBody: {
      padding: 12,
    },
    accordImage: {
        width: 80,
        height: 80,
        tintColor: TEXT_COLOR,
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
    },
});
  
export default AccordionItem;