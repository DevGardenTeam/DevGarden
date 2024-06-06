// GardenView.web.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg from 'react-native-svg';
import GardenSection from '../components/garden_view/GardenSection';
import { StackNavigationProp } from '@react-navigation/stack';

const GardenView: React.FC = () => {

    const windowDimensions = Dimensions.get('window');
    const  containerWidth = windowDimensions.width;
    const containerHeight = windowDimensions.height;

    const SECTION_WIDTH = containerWidth / 3;
    const SECTION_HEIGHT = containerHeight;

    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <Svg height={containerHeight} width={containerWidth}>

        {/* garden 1 */}
        <GardenSection
        x={0}
        y={0}
        width={SECTION_WIDTH}
        height={SECTION_HEIGHT}
        imageSource={require('../assets/garden_themes/garden1bg.png')}
        numberOfTrees={4}
        minDistanceBetweenTrees={20}
        navigation={navigation as StackNavigationProp<any, any>}
        />

        {/* garden 2 */}
        <GardenSection
        x={SECTION_WIDTH}
        y={0}
        width={SECTION_WIDTH}
        height={SECTION_HEIGHT}
        imageSource={require('../assets/garden_themes/garden2bg.png')}
        numberOfTrees={2}
        minDistanceBetweenTrees={20}
        navigation={navigation as StackNavigationProp<any, any>}
        />

        {/* garden 3 */}
        <GardenSection
        x={SECTION_WIDTH * 2}
        y={0}
        width={SECTION_WIDTH}
        height={SECTION_HEIGHT}
        imageSource={require('../assets/garden_themes/garden3bg.png')}
        numberOfTrees={3}
        minDistanceBetweenTrees={20}
        navigation={navigation as StackNavigationProp<any, any>}
        />

        </Svg>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default GardenView;