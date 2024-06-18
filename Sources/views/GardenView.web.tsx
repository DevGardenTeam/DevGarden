import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, LayoutChangeEvent, ScaledSize } from 'react-native';
import Svg from 'react-native-svg';
import GardenSection from '../components/garden_view/GardenSection';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { PLATFORMS } from '../constants/constants';
import { Repository } from '../model/Repository';

interface GardenViewProps {
  repositories: Repository[];
}

const GardenView: React.FC<GardenViewProps> = ({ repositories }) => {
  const [containerWidth, setContainerWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateDimensions = () => {
      setContainerWidth(Dimensions.get('window').width);
    };

    const dimensionsSubscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      dimensionsSubscription.remove();
    };
  }, []);

  const containerHeight = Dimensions.get('window').height;

  const SECTION_WIDTH = containerWidth / 3;
  const SECTION_HEIGHT = containerHeight;

  const navigation = useNavigation();

  const gardens = [
    {
      x: 0,
      platform: PLATFORMS.GITLAB,
      imageSource: require('../assets/garden_themes/garden1bg.png'),
    },
    {
      x: containerWidth,
      platform: PLATFORMS.GITHUB,
      imageSource: require('../assets/garden_themes/garden2bg.png'),
    },
    {
      x: containerWidth * 2,
      platform: PLATFORMS.GITEA,
      imageSource: require('../assets/garden_themes/garden3bg.png'),
    },
  ];

  interface Garden {
    x: number;
    platform: string;
    imageSource: number;
  }

  const renderGardenSection = (garden: Garden, index: number): JSX.Element => {
    const filteredRepos = repositories.filter(repo => {
      const repoPlatform = repo.platform.toUpperCase();
      const gardenPlatform = garden.platform.toUpperCase();
      return repoPlatform === gardenPlatform;
    });

    return (
      <GardenSection
        key={index}
        x={SECTION_WIDTH * index}
        y={0}
        width={SECTION_WIDTH}
        height={SECTION_HEIGHT}
        imageSource={garden.imageSource}
        minDistanceBetweenTrees={20}
        navigation={navigation as StackNavigationProp<any, any>}
        repositories={filteredRepos}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Svg height={containerHeight} width={containerWidth}>
        {gardens.map(renderGardenSection)}
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
});

export default GardenView;
