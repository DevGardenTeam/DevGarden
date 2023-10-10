import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType, DimensionValue  } from 'react-native';

type Icon = {
    iconSource: ImageSourcePropType
    tintColor?: string
    height? : DimensionValue 
    width?: DimensionValue

}
  
const IconComponent: React.FC<Icon> = ({ iconSource,tintColor,height=24,width=24 }) => {
    return (
            <View>
                <Image source={iconSource} style={{width:width ,
                    height: height,
                    tintColor: tintColor}} />
            </View>
    );
};

  
export default IconComponent;