export type Tree = {
    label: string;
    x: number;
    y: number;
    radius: number;
    visible: boolean;
  };

  export function generateTrees(numberOfTrees: number, minDistance: number, areaWidth: number, areaHeight: number): Tree[] {
    const trees: Tree[] = [];
    const attemptsPerTree = 100; // Maximum attempts to place a tree before giving up (to prevent infinite loops)
  
    for (let i = 0; i < numberOfTrees; i++) {
      let placed = false;
      for (let attempt = 0; attempt < attemptsPerTree && !placed; attempt++) {
        const newTree: Tree = {
          label: `tree-${i}`,
          x: Math.random() * areaWidth,
          y: Math.random() * areaHeight,
          radius: 10, // Assuming a fixed radius for simplicity, adjust as needed
          visible: true, // Initially setting all trees as visible
        };
  
        // Check if the new tree overlaps or is too close to existing trees
        const tooClose = trees.some(tree => {
          const distance = Math.sqrt(Math.pow(tree.x - newTree.x, 2) + Math.pow(tree.y - newTree.y, 2));
          return distance < (tree.radius + newTree.radius + minDistance);
        });
  
        if (!tooClose) {
          trees.push(newTree);
          placed = true;
        }
      }
  
      if (!placed) {
        console.warn(`Could not place tree ${i} after ${attemptsPerTree} attempts`);
      }
    }
  
    return trees;
  }