import React, { useEffect, useState } from 'react';
import Svg, { G, Image, Rect } from 'react-native-svg';
import TreeComponent, { Tree, generateTrees } from './tree';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pressable } from 'react-native';

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
        <G key={tree.label} onPress={() => console.log('Tree clicked!')}>
          <TreeComponent tree={tree} size={0.2} color="red"/>
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
        </G>      
      ))}
    </>
  );
};

export default GardenSection;