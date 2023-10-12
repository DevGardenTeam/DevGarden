import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType, DimensionValue  } from 'react-native';

type Icon = {
    iconSource: ImageSourcePropType
    tintColor?: string
    height? : DimensionValue 
    width?: DimensionValue
    margin? : DimensionValue
}
  
const IconComponent: React.FC<Icon> = ({ iconSource,tintColor,height=24,width=24,margin=5 }) => {
    return (
            <View>
                <Image source={iconSource} style={{width:width ,
                    height: height,
                    tintColor: tintColor,
                    margin:margin}} />
            </View>
    );
};

  
export default IconComponent;