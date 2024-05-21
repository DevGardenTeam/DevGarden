import React, { useEffect, useState } from 'react';
import { Image } from 'react-native-svg';
import TreeComponent, { Tree, generateTrees } from './Tree';

interface GardenSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  imageSource: any; // Adjust according to your image source type (e.g., require or URI)
  numberOfTrees: number;
  minDistanceBetweenTrees: number;
}

const GardenSection: React.FC<GardenSectionProps> = ({
  x,
  y,
  width,
  height,
  imageSource,
  numberOfTrees,
  minDistanceBetweenTrees,
}) => {
  const [trees, setTrees] = useState<Tree[]>([]);

  useEffect(() => {
    // Adjust the generateTrees function call if needed
    const newTrees = generateTrees(numberOfTrees, minDistanceBetweenTrees, height - 50, x, x + width - 60);
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
        <TreeComponent key={tree.label} tree={tree} size={0.2} color="red" />
      ))}
    </>
  );
};

export default GardenSection;