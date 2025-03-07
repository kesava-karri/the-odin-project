import Tree from './Tree.js';

function generateRandomArray(size, max) {
  const array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * max));
  }
  return array;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Function to print all tree traversal orders
function printAllTraversals(tree) {
  console.log('Level Order:');
  tree.levelOrder((node) => process.stdout.write(node.value + ' '));
  console.log('\n');

  console.log('Pre Order:');
  tree.preOrder((node) => process.stdout.write(node.value + ' '));
  console.log('\n');

  console.log('Post Order:');
  tree.postOrder((node) => process.stdout.write(node.value + ' '));
  console.log('\n');

  console.log('In Order:');
  tree.inOrder((node) => process.stdout.write(node.value + ' '));
  console.log('\n');
}

// Main driver function
function runBSTDemo() {
  console.log('--- Binary Search Tree Demo ---\n');

  // 1. Create a BST from random numbers
  const randomArray = generateRandomArray(15, 100);
  console.log('Random array:', randomArray);
  const bst = new Tree(randomArray);

  console.log('\nInitial tree structure:');
  prettyPrint(bst.root);

  // 2. Confirm tree is balanced
  console.log('\nIs the tree balanced?', bst.isBalanced());

  // 3. Print all elements in different traversal orders
  console.log('\n--- Initial Traversals ---');
  printAllTraversals(bst);

  // 4. Unbalance the tree by adding several numbers > 100
  console.log('Adding values > 100 to unbalance the tree...');
  [105, 120, 150, 160, 200, 210].forEach((val) => bst.insert(val));

  console.log('\nUnbalanced tree structure:');
  prettyPrint(bst.root);

  // 5. Confirm tree is unbalanced
  console.log('\nIs the tree balanced?', bst.isBalanced());

  // 6. Balance the tree
  console.log('\nRebalancing the tree...');
  bst.rebalance();

  console.log('\nRebalanced tree structure:');
  prettyPrint(bst.root);

  // 7. Confirm tree is balanced again
  console.log('\nIs the tree balanced?', bst.isBalanced());

  // 8. Print all elements in different traversal orders again
  console.log('\n--- Final Traversals ---');
  printAllTraversals(bst);
}

runBSTDemo();
