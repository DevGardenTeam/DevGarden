import React, { useEffect } from 'react';
import {StatusBar} from 'react-native';
import Svg from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Dimensions } from 'react-native';

import GardenSection from '../components/garden_view/GardenSection';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Repository } from '../model/Repository';

import { PLATFORMS } from '../constants/constants';

const MAX_SCALE = 2.5; // Maximum zoom level
const NUMBER_OF_GARDENS = 3; // Number of gardens

interface GardenViewProps {
    selectedPortion: string | "github";
    repositories: Repository[];
}

const GardenView: React.FC<GardenViewProps> = ({ selectedPortion, repositories })  => {
    const selectedPortionValue = useSharedValue(selectedPortion);

    const windowDimensions = Dimensions.get('window');
    const containerWidth = windowDimensions.width;
    const containerHeight = windowDimensions.height + (StatusBar.currentHeight ?? 0);

    console.log("width: ", containerWidth, "height: ", containerHeight)

    const svgWidth = containerWidth * NUMBER_OF_GARDENS; // Width of the SVG content
    const svgHeight = containerHeight; // Height of the SVG content
    
    // PINCHING //
    const scale = useSharedValue(1); // current scale or "zoom level"
    const savedScale = useSharedValue(1); // stores scale after pinch gesture ends

    // PAN //
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const navigation = useNavigation();
    
    useEffect(() => {
        selectedPortionValue.value = selectedPortion;
        //console.warn("selectedPortion: ", selectedPortion.toLocaleUpperCase())
        //console.warn("Repositories: ", repositories)

        scale.value = withTiming(1);
        translateY.value = withTiming(0);
        savedTranslateY.value = 0;
        savedScale.value = 1;

    
        switch (selectedPortion) {
            case PLATFORMS.GITLAB:
                translateX.value = withTiming(0);
                
                savedTranslateX.value = 0;

                console.log("Current X: ", translateX.value);

                break;
            case PLATFORMS.GITHUB:
              translateX.value = withTiming(-containerWidth);

                savedTranslateX.value = -containerWidth;

                console.log("Current X: ", translateX.value);

                break;
            case PLATFORMS.GITEA:
              translateX.value = withTiming(-(containerWidth * 2));
                savedTranslateX.value = -(containerWidth * 2);

                console.log("Current X: ", translateX.value);
                break;
            default:
                break;
        }
    }, [selectedPortion]);


    const pinchGestureHandler = Gesture.Pinch()
        .onUpdate((event) => {
            const newScale = savedScale.value * event.scale;
            // Sets both minimum and maximum scale limits
            scale.value = Math.min(Math.max(newScale, 1), MAX_SCALE);
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            //console.log("pinch: ", scale.value)
        })

    const panGestureHandler = Gesture.Pan()
        .onStart(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;

            console.log("pan: ", translateX.value, translateY.value)
        })
        .onUpdate((event) => {
            const scaledSvgWidth = svgWidth * scale.value;
            const scaledSvgHeight = svgHeight * scale.value;
        
            // Calculate bounds for translation
            const maxTranslateX = ((scaledSvgWidth - containerWidth) / 2 / scale.value) - containerWidth;
            const minTranslateX = -(maxTranslateX + containerWidth * (NUMBER_OF_GARDENS - 1));
            //console.log("min: ", minTranslateX, "max: ", maxTranslateX)

            const maxTranslateY = (scaledSvgHeight - containerHeight) / 2 / scale.value;
            const minTranslateY = -maxTranslateY;
        
            // Calculate proposed translations
            const proposedTranslateX = savedTranslateX.value + event.translationX / scale.value;
            const proposedTranslateY = savedTranslateY.value + event.translationY / scale.value;
        
            // Apply constraints
            translateX.value = Math.min(maxTranslateX, Math.max(proposedTranslateX, minTranslateX));
            translateY.value = Math.min(maxTranslateY, Math.max(proposedTranslateY, minTranslateY));

            //console.log("pan: ", translateX.value, translateY.value)
        });
    
    const combinedGesture = Gesture.Simultaneous(panGestureHandler, pinchGestureHandler);

    // make the SVG element zoomable, smoothly
    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: scale.value },
          { translateX: translateX.value },
          { translateY: translateY.value },
        ],
      };
    });

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
  
      return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
          <GestureDetector gesture={combinedGesture}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
              <Svg height={svgHeight} width={svgWidth}>
              {/* Filter the repositories per platformm */}
              {gardens.map((garden, index) => {
                  const filteredRepos = repositories.filter(repo => {
                    const repoPlatform = repo.platform.toLocaleUpperCase();
                    const gardenPlatform = garden.platform.toLocaleUpperCase();
                    return repoPlatform === gardenPlatform;
                  });

                  // console.log(`Filtered repositories for ${garden.platform}:`, filteredRepos);

                  return (
                    <GardenSection
                      key={index}
                      x={garden.x}
                      y={0}
                      width={containerWidth}
                      height={svgHeight}
                      imageSource={garden.imageSource}
                      minDistanceBetweenTrees={20}
                      navigation={navigation as StackNavigationProp<any, any>}
                      repositories={filteredRepos}
                    />
                  );
                })}
              </Svg>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
      );
  };

export default GardenView;