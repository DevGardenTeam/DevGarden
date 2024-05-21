import React from "react";
import TreeSvg from "../../assets/trees/TreeSvg.svg";
import { View } from "react-native";
import { Circle, G } from "react-native-svg";

export type Tree = {
  label: string;
  x: number;
  y: number;
  radius: number;
  visible: boolean;
};

export function generateTrees(
  numberOfTrees: number,
  minDistance: number,
  areaHeight: number,
  minX: number,
  maxX: number
): Tree[] {
  const trees: Tree[] = [];
  const attemptsPerTree = 100; // Maximum attempts to place a tree before giving up (to prevent infinite loops)

  for (let i = 0; i < numberOfTrees; i++) {
    let placed = false;
    for (let attempt = 0; attempt < attemptsPerTree && !placed; attempt++) {
      const xRange = maxX - minX;

      const newTree: Tree = {
        label: `tree-${i}`,
        x: Math.random() * xRange + minX,
        y: Math.random() * areaHeight,
        radius: 10, // Assuming a fixed radius for simplicity, adjust as needed
        visible: true, // Initially setting all trees as visible
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
  color = "currentColor",
}) => {
  return (
    <G transform={`translate(${tree.x}, ${tree.y}) scale(${size})`}>
      <TreeSvg />
    </G>
  );
};

export default TreeComponent;
