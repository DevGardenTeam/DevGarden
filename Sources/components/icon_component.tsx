import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType  } from 'react-native';

type Icon = {
    iconSource: ImageSourcePropType
}
  
const IconComponent: React.FC<Icon> = ({ iconSource }) => {
    return (
            <View>
                <Image source={iconSource} style={styles.icon} />
            </View>
    );
};

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
      marginLeft: 4,
      tintColor: '#FF0202',
    },
});
  
export default IconComponent;