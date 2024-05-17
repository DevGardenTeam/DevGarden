import React, { useEffect } from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { Dimensions } from 'react-native';

import { Tree, generateTrees } from '../components/garden_view/tree';
import { use } from 'i18next';


const windowDimensions = Dimensions.get('window');
const containerWidth = windowDimensions.width;
const containerHeight = windowDimensions.height - 60;

const svgWidth = containerWidth * 2; // Width of the SVG content
const svgHeight = containerHeight * 2; // Height of the SVG content

const MAX_SCALE = 2.5; // Maximum zoom level

const GardenView: React.FC = () => {
    const [trees, setTrees] = React.useState<Tree[]>([]);

    useEffect(() => {
        const newTrees = generateTrees(50, 10, svgWidth, svgHeight);
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
            console.log("Current Scale:", scale.value);

            const scaledSvgWidth = svgWidth * scale.value;
            const scaledSvgHeight = svgHeight * scale.value;
        
            // Calculate bounds for translation
            const maxTranslateX = 0;
            const minTranslateX = -(scaledSvgWidth - containerWidth);
            const maxTranslateY = 0;
            const minTranslateY = -(scaledSvgHeight - containerHeight);
        
            // Calculate proposed translations
            const proposedTranslateX = savedTranslateX.value + event.translationX / scale.value;
            const proposedTranslateY = savedTranslateY.value + event.translationY / scale.value;
        
            // Apply constraints
            translateX.value = Math.min(maxTranslateX, Math.max(proposedTranslateX, minTranslateX));
            translateY.value = Math.min(maxTranslateY, Math.max(proposedTranslateY, minTranslateY));
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
                    <Rect width={svgWidth} height={svgHeight} fill="#006769" stroke="red" strokeWidth="2"/>
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