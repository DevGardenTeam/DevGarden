import React, { useEffect } from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Dimensions } from 'react-native';

import { Tree, generateTrees } from '../components/garden_view/tree';
import { use } from 'i18next';


const windowDimensions = Dimensions.get('window');
const containerWidth = windowDimensions.width;
const containerHeight = windowDimensions.height;

const svgWidth = containerWidth; // Width of the SVG content
const svgHeight = containerHeight; // Height of the SVG content

const MAX_SCALE = 2.5; // Maximum zoom level

const GardenView: React.FC = () => {
    const [trees, setTrees] = React.useState<Tree[]>([]);

    useEffect(() => {
        const newTrees = generateTrees(10, 10, svgWidth - svgWidth / 5, svgHeight - svgHeight / 5);
        setTrees(newTrees);
    }, []);
    
    // PINCHING //
    const scale = useSharedValue(1); // current scale or "zoom level"
    const savedScale = useSharedValue(1); // stores scale after pinch gesture ends

    // PAN //
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);
    
    const pinchGestureHandler = Gesture.Pinch()
        .onUpdate((event) => {
            const newScale = savedScale.value * event.scale;
            // Sets both minimum and maximum scale limits
            scale.value = Math.min(Math.max(newScale, 1), MAX_SCALE);
        })
        .onEnd(() => {
            savedScale.value = scale.value;
            console.log("pinch: ", scale.value)
        })

    const panGestureHandler = Gesture.Pan()
        .onStart(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        })
        .onUpdate((event) => {
            // console.log("Current Scale:", scale.value);
    
            const scaledSvgWidth = svgWidth * scale.value;
            const scaledSvgHeight = svgHeight * scale.value;
            // console.log("SVG Dimensions - Original:", svgWidth, svgHeight, "Scaled:", scaledSvgWidth, scaledSvgHeight); 
    
            const maxX = Math.max(0, (scaledSvgWidth - containerWidth) / 2 / scale.value);
            const maxY = Math.max(0, (scaledSvgHeight - containerHeight) / 2 / scale.value);
            //console.log("Max Translation - maxX:", maxX, "maxY:", maxY);
    
            const proposedTranslateX = savedTranslateX.value + event.translationX / scale.value;
            const proposedTranslateY = savedTranslateY.value + event.translationY / scale.value;
            // console.log("Proposed Translations - X:", proposedTranslateX, "Y:", proposedTranslateY); 
    
            translateX.value = Math.min(Math.max(proposedTranslateX, -maxX), maxX);
            translateY.value = Math.min(Math.max(proposedTranslateY, -maxY), maxY);
            // console.log("Applied Translations - X:", translateX.value, "Y:", translateY.value); 
    
            // console.log("Event Translations - X:", event.translationX, "Y:", event.translationY); 
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
  
    return (
        <GestureHandlerRootView  style={{ flex: 1, backgroundColor: '#40A578' }}>
            <GestureDetector gesture={combinedGesture}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <Svg height={svgHeight} width={svgWidth}>
                    <Rect x="0" y="0" width="100%" height="100%" fill="#006769" />
                    {trees.map(tree => tree.visible && (
                            <Circle key={tree.label} cx={tree.x.toString()} cy={tree.y.toString()} r={tree.radius.toString()} fill="#40A578" />
                        ))}
                </Svg>
            </Animated.View>
            </GestureDetector>
      </GestureHandlerRootView >
    );
  };

export default GardenView;