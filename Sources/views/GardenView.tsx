import React, { useEffect } from 'react';
import Svg, { Circle, Rect, Image } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Dimensions, View, StyleSheet } from 'react-native';

import { Tree, generateTrees } from '../components/garden_view/tree';
import CustomSvg from '../assets/garden_themes/gardenbg.svg'

const MAX_SCALE = 2.5; // Maximum zoom level
const NUMBER_OF_GARDENS = 3; // Number of gardens

const GardenView: React.FC = () => {
    const [trees, setTrees] = React.useState<Tree[]>([]);

    const windowDimensions = Dimensions.get('window');
    const containerWidth = windowDimensions.width;
    const containerHeight = windowDimensions.height - 50;

    console.log("width: ", containerWidth, "height: ", containerHeight)

    const svgWidth = containerWidth * NUMBER_OF_GARDENS; // Width of the SVG content
    const svgHeight = containerHeight; // Height of the SVG content

    useEffect(() => {
        const newTrees = generateTrees(50, 10, svgWidth, svgHeight);
        setTrees(newTrees);
    }, []);
    
    // PINCHING //
    const scale = useSharedValue(1); // current scale or "zoom level"
    const savedScale = useSharedValue(1); // stores scale after pinch gesture ends

    // PAN //
    const translateX = useSharedValue(-containerWidth);
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

            console.log("pan: ", translateX.value, translateY.value)
        })
        .onUpdate((event) => {
            const scaledSvgWidth = svgWidth * scale.value;
            const scaledSvgHeight = svgHeight * scale.value;
        
            // Calculate bounds for translation
            const maxTranslateX = ((scaledSvgWidth - containerWidth) / 2 / scale.value) - containerWidth;
            const minTranslateX = -(maxTranslateX + containerWidth * (NUMBER_OF_GARDENS - 1));
            console.log("min: ", minTranslateX, "max: ", maxTranslateX)

            const maxTranslateY = (scaledSvgHeight - containerHeight) / 2 / scale.value;
            const minTranslateY = -maxTranslateY;
        
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

                    {/* garden 1 */}
                    <Image
                    x="0"
                    y="0"
                    width={containerWidth}
                    height={svgHeight}
                    href={require('../assets/garden_themes/garden1bg.png')}
                    preserveAspectRatio="xMidYMid slice"
                    />

                    {/* garden 2 */}
                    <Image
                    x={containerWidth}
                    y="0"
                    width={containerWidth}
                    height={svgHeight}
                    href={require('../assets/garden_themes/garden2bg.png')}
                    preserveAspectRatio="xMidYMid slice"
                    />

                    {/* garden 3 */}
                    <Image
                    x={containerWidth*2}
                    y="0"
                    width={containerWidth}
                    height={svgHeight}
                    href={require('../assets/garden_themes/garden1bg.png')}
                    preserveAspectRatio="xMidYMid slice"
                    />

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

{/* <Svg height={svgHeight} width={svgWidth}>

<Rect x="0" width={containerWidth} height={svgHeight} fill="blue" stroke="red" strokeWidth="2"/>

<Rect x={containerWidth} width={containerWidth} height={svgHeight} fill="green" stroke="red" strokeWidth="2"/>

<Rect x={containerWidth*2} width={containerWidth} height={svgHeight} fill="orange" stroke="red" strokeWidth="2"/>
</Svg> */}