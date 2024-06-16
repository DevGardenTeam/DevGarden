import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import Svg, { ForeignObject, G, Image, Rect, Text as SvgText } from 'react-native-svg';
import TreeComponent, { Tree, generateTrees } from './tree';
import { StackNavigationProp } from '@react-navigation/stack';
import { Repository } from '../../model/Repository';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GardenSectionProps {
  x: number;
  y: number;
  width: number;
  height: number;
  imageSource: any;
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
  const [hoveredRepo, setHoveredRepo] = useState<Repository | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [textLength, setTextLength] = useState<number>(0);

  // Charger les positions sauvegardées des arbres depuis AsyncStorage
  useEffect(() => {
    const loadSavedPositions = async () => {
      try {
        const savedTrees = await AsyncStorage.getItem(`trees-${imageSource}`);
        if (savedTrees) {
          setTrees(JSON.parse(savedTrees));
        } else {
          const newTrees = generateTrees(repositories, minDistanceBetweenTrees, height - 100, x, x + width - 60);
          setTrees(newTrees);
        }
      } catch (e) {
        console.error("Failed to load saved tree positions", e);
      }
    };

    loadSavedPositions();
  }, [repositories, imageSource]);

  // Sauvegarder les positions des arbres dans AsyncStorage
  useEffect(() => {
    const saveTreePositions = async () => {
      try {
        await AsyncStorage.setItem(`trees-${imageSource}`, JSON.stringify(trees));
      } catch (e) {
        console.error("Failed to save tree positions", e);
      }
    };

    if (trees.length > 0) {
      saveTreePositions();
    }
  }, [trees, imageSource]);

  useEffect(() => {
    if (hoveredRepo) {
      const textWidth = hoveredRepo.name.length * 8;
      setTextLength(textWidth);
    }
  }, [hoveredRepo]);

  const handleTreePress = (repo: Repository) => {
    navigation.navigate("Project", { repository: repo });
  };

  const handleMouseMove = (event: React.MouseEvent<SVGElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseLeave = () => {
    setHoveredRepo(null);
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
          fontSize="16"
          fontWeight="bold"
        >
          No repositories found for this platform.
        </SvgText>
      ) : (
        trees.map(tree => tree.visible && (
          <G key={tree.label}>
            <TreeComponent tree={tree} size={0.2} color="red" />
            {Platform.OS === 'web' && hoveredRepo === tree.repository && (
              <>
                <Rect
                  x={mousePosition.x - textLength / 2}
                  y={mousePosition.y - 25}
                  width={textLength}
                  height={20}
                  fill="white"
                />
                <SvgText
                  x={mousePosition.x}
                  y={mousePosition.y - 10}
                  textAnchor="middle"
                  fill="black"
                  textLength={textLength}
                >
                  {hoveredRepo.name}
                </SvgText>
              </>
            )}
            {Platform.OS === 'web' ? (
              <ForeignObject x={tree.x} y={tree.y} width={50} height={50}>
                <div
                  onClick={() => handleTreePress(tree.repository)}
                  onMouseEnter={() => setHoveredRepo(tree.repository)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ width: '100%', height: '100%', backgroundColor: 'transparent', cursor: 'pointer', position: 'relative' }}
                />
              </ForeignObject>
            ) : (
              <Rect
                x={tree.x}
                y={tree.y}
                width={50}
                height={50}
                fill="transparent"
                onPress={() => handleTreePress(tree.repository)}
              />
            )}
          </G>
        ))
      )}
    </>
  );
};

export default GardenSection;
