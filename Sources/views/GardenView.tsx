import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

const GardenView: React.FC = () => {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
  
    // const panGestureHandler = Gesture.Pan()
    
    const pinchGestureHandler = Gesture.Pinch()
        .onUpdate((event) => {
            scale.value = savedScale.value * event.scale;
        })
        .onEnd(() => {
            savedScale.value = scale.value;
        })
    
    //const combinedGesture = Gesture.Simultaneous(panGestureHandler, pinchGestureHandler);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: scale.value },
        ],
      };
    });
  
    return (
        <GestureHandlerRootView  style={{ flex: 1 }}>
            <GestureDetector gesture={pinchGestureHandler}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]}>
                <Svg height="100%" width="100%">
                <Rect x="0" y="0" width="100%" height="100%" fill="green" />
                <Circle cx="50%" cy="50%" r="30" fill="brown" />
                <Circle cx="70%" cy="70%" r="30" fill="brown" />
                {/* Add more trees or elements here */}
                </Svg>
            </Animated.View>
            </GestureDetector>
      </GestureHandlerRootView >
    );
  };

export default GardenView;