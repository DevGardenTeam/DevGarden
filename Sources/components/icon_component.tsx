import React from 'react';
import { Image, View, StyleSheet, ImageSourcePropType, DimensionValue  } from 'react-native';

type Icon = {
    iconSource: ImageSourcePropType
    tintColor?: string
    height? : DimensionValue 
    width?: DimensionValue
    margin? : DimensionValue
}
  
const IconComponent: React.FC<Icon> = ({ iconSource,tintColor,height='60%',width='5%',margin='1%' }) => {
    return (
                <Image source={iconSource} 
                    style={{width:width ,
                        height: height,
                        tintColor: tintColor,
                        margin:margin,
                        resizeMode: 'contain'}} />
    );
};

  
export default IconComponent;