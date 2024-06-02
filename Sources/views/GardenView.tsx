import React from 'react';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Text, View } from 'react-native';

const GardenView: React.FC = () => {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  
    const panGestureHandler = Gesture.Pan().onUpdate((event) => {
        translateX.value += event.translationX;
        translateY.value += event.translationY;
      });
    
      const pinchGestureHandler = Gesture.Pinch().onUpdate((event) => {
        scale.value *= event.scale;
      });
    
    const combinedGesture = Gesture.Simultaneous(panGestureHandler, pinchGestureHandler);

    const animatedStyle = useAnimatedStyle(() => {
      if (global._WORKLET) {
        // UI thread only code
        return {
          transform: [
            { scale: scale.value },
            { translateX: translateX.value },
            { translateY: translateY.value },
          ],
        };
      } else {
        // JS thread fallback code
        // Return a default style or an equivalent JS computation
        return {};
      }
    });
  
    return (
        <GestureHandlerRootView  style={{ flex: 1 }}>
            <GestureDetector gesture={combinedGesture}>
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
      // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //   <Text>Test</Text>
      // </View>
    );
  };

export default GardenView;