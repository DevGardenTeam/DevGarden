import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Svg, { ForeignObject, G, Image, Rect } from 'react-native-svg';
import TreeComponent, { Tree, generateTrees } from './tree';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text } from '@react-three/drei/core';

interface GardenSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  imageSource: any; // Adjust according to your image source type (e.g., require or URI)
  numberOfTrees: number;
  minDistanceBetweenTrees: number;
  navigation: StackNavigationProp<any>;
}

const GardenSection: React.FC<GardenSectionProps> = ({
  x,
  y,
  width,
  height,
  imageSource,
  numberOfTrees,
  minDistanceBetweenTrees,
  navigation,
}) => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    // Adjust the generateTrees function call if needed
    const newTrees = generateTrees(numberOfTrees, minDistanceBetweenTrees, height - 100, x, x + width - 60);
    setTrees(newTrees);
  }, [numberOfTrees, minDistanceBetweenTrees, height, width, x]);

  const handleTreePress = () => {
    console.log('Tree clicked!');
    navigation.navigate("Project", {platform: "github", owner: "nico", repository: "sae"});
  };

  return (
    <>
      <Image
        x={x.toString()}
        y={y.toString()}
        width={width.toString()}
        height={height.toString()}
        href={imageSource}
        preserveAspectRatio="xMidYMid slice"
      />
      {trees.map(tree => tree.visible && (
        <G key={tree.label}>
          <TreeComponent tree={tree} size={0.2} color="red"/>
          {Platform.OS === 'web' ? (
           <ForeignObject x={tree.x} y={tree.y} width={50} height={50}>
           <TouchableOpacity onPress={handleTreePress} style={{ width: '100%', height: '100%' }}>
             <div style={{
               width: '100%', 
               height: '100%', 
               backgroundColor: 'transparent', // Make it transparent or red for testing
               cursor: 'pointer'
             }} />
           </TouchableOpacity>
         </ForeignObject>
          ) : (
            <Rect
            x={tree.x}
            y={tree.y}
            width={50} 
            height={50}
            fill="transparent"
            onPress={() => {
              console.log('Tree clicked!') 
              navigation.navigate("Project", {platform: "github", owner: "nico", repository: "sae"})}
            }
          />
          )}
        </G>
      ))}
    </>
  );
};

export default GardenSection;