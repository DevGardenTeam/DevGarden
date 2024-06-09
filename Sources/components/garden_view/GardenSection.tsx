import React, { useEffect, useState } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import Svg, { ForeignObject, G, Image, Rect, Text as SvgText } from 'react-native-svg';
import TreeComponent, { Tree, generateTrees } from './tree';
import { StackNavigationProp } from '@react-navigation/stack';
import { Repository } from '../../model/Repository';

interface GardenSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  imageSource: any; // Adjust according to your image source type (e.g., require or URI)
  repositories: Repository[];
  minDistanceBetweenTrees: number;
  navigation: StackNavigationProp<any>;
}

const GardenSection: React.FC<GardenSectionProps> = ({
  x,
  y,
  width,
  height,
  imageSource,
  repositories,
  minDistanceBetweenTrees,
  navigation,
}) => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    if (repositories.length > 0) {
      const newTrees = generateTrees(repositories, minDistanceBetweenTrees, height - 100, x, x + width - 60);
      setTrees(newTrees);
    }
  }, [repositories, minDistanceBetweenTrees, height, width, x]);

  const handleTreePress = (repo: Repository) => {
    console.log('Tree clicked!');
    console.log("repository: ", repo)
    navigation.navigate("Project", {repository: repo});
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
      {repositories.length === 0 ? (
        <SvgText
          x={(x + width / 2).toString()}
          y={(y + height / 2).toString()}
          textAnchor="middle"
          fill="black"
        >
          No repositories found for this platform.
        </SvgText>
      ) : (
        trees.map(tree => tree.visible && (
          <G key={tree.label}>
            <TreeComponent tree={tree} size={0.2} color="red"/>
            {Platform.OS === 'web' ? (
             <ForeignObject x={tree.x} y={tree.y} width={50} height={50}>
             <TouchableOpacity onPress={() => handleTreePress(tree.repository)} style={{ width: '100%', height: '100%' }}>
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
              onPress={() => {handleTreePress(tree.repository)}
              }
            />
            )}
          </G>
        ))
      )}
    </>
  );
};

export default GardenSection;