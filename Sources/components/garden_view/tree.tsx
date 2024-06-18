import React from "react";
import TreeSvg from "../../assets/trees/TreeSvg.svg";
import TreeBadSvg from "../../assets/trees/TreeBadSvg.svg";
import TreeMidSvg from "../../assets/trees/TreeMidSvg.svg";
import TreeImageSvg from "./treeImageComp";
import { G, Rect } from "react-native-svg";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Repository } from "../../model/Repository";
import { Svg } from "@react-three/drei/core";
import { moderateScale, verticalScale } from "../../service/Metrics";

export type Tree = {
  label: string;
  x: number;
  y: number;
  radius: number;
  visible: boolean;
  repository: Repository;
};

export function generateTrees(
  repositories: Repository[],
  minDistance: number,
  areaHeight: number,
  minX: number,
  maxX: number
): Tree[] {
  const trees: Tree[] = [];
  const attemptsPerTree = 100; // Maximum attempts to place a tree before giving up (to prevent infinite loops)

  for (let i = 0; i < repositories.length; i++) {
    let placed = false;
    for (let attempt = 0; attempt < attemptsPerTree && !placed; attempt++) {
      const xRange = maxX - minX;

      const newTree: Tree = {
        label: `tree-${i}`,
        x: Math.random() * xRange + minX,
        y: Math.random() * (areaHeight - 100 - 100) + 100,
        radius: 30, // Assuming a fixed radius for simplicity, adjust as needed
        visible: true, // Initially setting all trees as visible
        repository: repositories[i], // Assign the repository to the tree
      };

      // Check if the new tree overlaps or is too close to existing trees
      const tooClose = trees.some((tree) => {
        const distance = Math.sqrt(
          Math.pow(tree.x - newTree.x, 2) + Math.pow(tree.y - newTree.y, 2)
        );
        return distance < tree.radius + newTree.radius + minDistance;
      });

      if (!tooClose) {
        trees.push(newTree);
        placed = true;
      }
    }

    if (!placed) {
      console.warn(
        `Could not place tree ${i} after ${attemptsPerTree} attempts`
      );
    }
  }

  return trees;
}

// Tree component
interface TreeProps {
  tree: Tree;
  size?: number;
  color?: string;
}

const TreeComponent: React.FC<TreeProps> = ({
  tree,
  size = 1,
}) => {

  const truncateName = (name: string) => {
    return name.length > 10 ? `${name.substring(0, 10)}...` : name;
  };

  if (Platform.OS === 'web') {
    return <TreeImageSvg x={tree.x} y={tree.y} size={size} status={tree.repository.status} />;
  } else {

    let SvgComponent;
    switch (tree.repository.status) {
      case 'ok':
        SvgComponent = TreeMidSvg;
        break;
      case 'bad':
        SvgComponent = TreeBadSvg;
        break;
      default:
        SvgComponent = TreeSvg;
    }

    return (
      <View style={{ position: 'absolute', left: tree.x, top: tree.y }}>
        <G transform={`translate(${tree.x}, ${tree.y}) scale(${size})`}>
          <SvgComponent />
          <Text style={styles.treeText}>
            {truncateName(tree.repository.name)}
          </Text>
        </G>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  treeText: {
    position: 'absolute',
    top: verticalScale(70), // Adjust the text position
    textAlign: 'center',
    color: 'black',
    fontSize: moderateScale(12), // Increase font size
    fontWeight: 'bold', // Make the text bold for better visibility
  },
});

export default TreeComponent;