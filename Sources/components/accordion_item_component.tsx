import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

type AccordionItemProps = PropsWithChildren <{
    id: string;
    title: string;
}>;
  
function AccordionItem({ children, id, title }: AccordionItemProps): JSX.Element {
    const [ expanded, setExpanded ] = useState(false);
    
    function toggleItem(){
        setExpanded(!expanded);
    }

    const body = <View style={styles.accordBody}>{ children }</View>

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
                <Text style={styles.accordTitle}>{ title }</Text>
                <Icon name={ expanded ? 'chevron-up' : 'chevron-down' }
                      size={20} color="#bbb"/>                
            </TouchableOpacity>
            { expanded && body }
        </View>
    );
};

const styles = StyleSheet.create({
    accordBody: {
        
    },
    accordContainer: {

    },
    accordHeader: {

    },
    accordTitle: {

    }, 
});
  
export default AccordionItem;