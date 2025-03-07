export default class Tree {
  root;
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  /**
   * This method `buildTree()` takes in an array of numbers & builds a binary
   * search tree
   * @param {Array} array
   * @returns `root` TreeNode
   */
  #buildTree(array) {
    // Sort the given array before building the BST
    let temp = array.toSorted((a, b) => a - b);
    let newArray = [];

    // Remove duplicates
    for (let i = 0; i < temp.length; i++) {
      const currVal = temp[i];
      if (currVal !== temp[i + 1]) {
        newArray.push(currVal);
      }
    }

    let start = 0;
    let end = newArray.length - 1;
    let root = this.#f(start, end, newArray);
    return root;
  }

  // Recursion
  #f(start, end, arr) {
    if (start > end) return null;
    let mid = Math.floor((start + end) / 2);

    // Pre-order traversal of DFS

    let root = new TreeNode(arr[mid]);

    root.left = this.#f(start, mid - 1, arr);
    root.right = this.#f(mid + 1, end, arr);
    return root;
  }

  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
      return;
    }
    this.#insertRecursion(value, this.root);
  }

  #insertRecursion(value, curr) {
    if (value < curr.value) {
      // traverse left
      if (!curr.left) {
        // reached the leaf node
        curr.left = new TreeNode(value);
        return;
      }
      this.#insertRecursion(value, curr.left);
    } else if (value > curr.value) {
      // traverse right
      if (!curr.right) {
        // reached the leaf node
        curr.right = new TreeNode(value);
        return;
      }
      this.#insertRecursion(value, curr.right);
    }
  }

  deleteItem(value) {
    if (!this.root) {
      throw new Error(`Root node doesn't exist`);
    }
    this.root = this.#delItemRec(value, this.root);
  }

  #delItemRec(value, curr) {
    // base case
    if (curr === null) return null;

    if (value < curr.value) {
      curr.left = this.#delItemRec(value, curr.left);
      return curr;
    } else if (value > curr.value) {
      curr.right = this.#delItemRec(value, curr.right);
      return curr;
    }
    // If the value is neither less nor greater then it's equal :)
    // Delete based on children
    if (curr.right === null && curr.left === null) {
      // --- Case 1: Leaf Node - No Children ---
      return null;
    }

    // --- Case 2: One Child ---
    // The node we're about to delete can be either on the left or right
    // subtree & based on that we assign the left or right branch to the prev
    if (curr.left === null) {
      return curr.right;
    }
    if (curr.right === null) {
      return curr.left;
    }

    // --- Case 3: Node w two children ---
    let successorParent = curr;
    let successor = curr.right;

    // Find the next biggest number to replace the node w 2 children
    while (successor.left) {
      successorParent = successor;
      successor = successor.left;
    }
    // overwrite
    curr.value = successor.value;

    // Remove the successor from its original position
    if (successorParent !== curr) {
      // If successor is not the immediate right child
      // Not checking left 'cause if left exists then it would be our next biggest number :)
      successorParent.left = successor.right;
    } else {
      // The successor is immediate right child
      curr.right = successor.right;
    }
    return curr;
  }

  /**
   * Give a number & `find()` method would return it's corresponding node along
   * w the entire subtree of it; if it exists
   * @param {number} value
   * @returns `TreeNode`
   */
  find(value) {
    return this.#findRec(value, this.root);
  }

  #findRec(value, curr) {
    if (curr === null) return null;
    // in-order => Left Root Right
    let leftRes = this.#findRec(value, curr.left);
    if (leftRes !== null) return leftRes;

    if (curr.value === value) {
      return curr;
    }
    // we aren't doing the null check here 'cause we looked up both root node & left subtree; so the given value exists we return it if not we simply return null :)
    return this.#findRec(value, curr.right);
  }

  /**
   * callback fn is included as per the requirement
   */
  levelOrder(callback) {
    if (!callback) {
      throw new Error(
        `callback function is required; ${callback} was provided`
      );
    }
    if (!this.root) return;
    const queue = [this.root];

    while (queue.length !== 0) {
      let len = queue.length;

      for (let i = 0; i < len; i++) {
        const curr = queue.shift();

        if (curr) {
          callback(curr);
          if (curr.left) queue.push(curr.left);
          if (curr.right) queue.push(curr.right);
        }
      }
    }
  }

  inOrder(callback) {
    if (!callback)
      throw new Error(
        `callback function is required; ${callback} was provided`
      );
    if (!this.root) return;
    // inOrder => Left Root Right
    this.#inOrderRec(callback, this.root);
  }

  #inOrderRec(callback, curr) {
    if (curr === null) return;
    if (curr.left) this.#inOrderRec(callback, curr.left);
    callback(curr);
    if (curr.right) this.#inOrderRec(callback, curr.right);
  }

  preOrder(callback) {
    if (!callback)
      throw new Error(
        `callback function is required; ${callback} was provided`
      );

    if (!this.root) return;
    // preOrder => Root Left Right
    this.#preOrderRec(callback, this.root);
  }

  #preOrderRec(callback, curr) {
    if (curr === null) return;
    callback(curr);
    if (curr.left) this.#preOrderRec(callback, curr.left);
    if (curr.right) this.#preOrderRec(callback, curr.right);
  }

  postOrder(callback) {
    if (!callback)
      throw new Error(
        `callback function is required; ${callback} was provided`
      );

    if (!this.root) return;
    // postOrder => Left Right Root
    this.#postOrderRec(callback, this.root);
  }

  #postOrderRec(callback, curr) {
    if (curr === null) return;
    if (curr.left) this.#postOrderRec(callback, curr.left);
    if (curr.right) this.#postOrderRec(callback, curr.right);
    callback(curr);
  }

  /**
   * Height is defined as the number of edges in the longest path from a given node to a leaf node.
   * @param {TreeNode} node
   */
  height(node) {
    // I believe post-order accesses the root in the end; thereby reaching the leaf node quicker
    if (node == null)
      throw new Error(`Please provide a valid node; given: ${node}`);
    let curr = this.find(node.value);

    return curr !== null
      ? this.#heightRec(curr)
      : `${node.value} node doesn't exist in the given BST`;
  }

  #heightRec(curr) {
    if (curr === null) return -1;

    let leftHeight = this.#heightRec(curr.left);
    let rightHeight = this.#heightRec(curr.right);

    // + 1 is edge height to it's chosen heir :p
    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Depth is defined as the number of edges in the path from a given node to the tree’s root node.
   */
  depth(node) {
    if (node == null)
      throw new Error(`Please provide a proper node; given: ${node}`);

    return this.#depthRec(this.root, node.value, 0);
  }

  #depthRec(curr, value, currentDepth) {
    if (curr == null) return -1;
    if (value < curr.value) {
      // Since in BST, the values follow the order & if this condition is satisfied then the value we're looking for must be in the left sub tree
      if (curr.left) {
        return this.#depthRec(curr.left, value, ++currentDepth);
      }
    } else if (value > curr.value) {
      if (curr.right) return this.#depthRec(curr.right, value, ++currentDepth);
    } else if (value === curr.value) return currentDepth;

    return `${value} not found, given value doesn't exist in the BST`;
  }

  /**
   * A balanced tree is one where the difference between heights of the left subtree and the right subtree of every node is not more than 1.
   */
  isBalanced() {
    return this.#isBalancedRec(this.root) !== -1;
  }

  #isBalancedRec(curr) {
    if (curr === null) return 0;

    const leftHeight = this.#isBalancedRec(curr.left);
    if (leftHeight === -1) return -1;
    const rightHeight = this.#isBalancedRec(curr.right);
    if (rightHeight === -1) return -1;

    const heightDiff = Math.abs(leftHeight - rightHeight);
    if (heightDiff > 1) return -1;

    return 1 + Math.max(leftHeight, rightHeight);
  }

  rebalance() {
    if (!this.root) return;

    const values = [];
    this.inOrder((node) => values.push(node.value));

    this.root = this.#buildTree(values);
  }
}

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left instanceof TreeNode ? left : null;
    this.right = right instanceof TreeNode ? right : null;
  }
  toString() {
    return `value: ${this.value}\n left: ${this.left}\n right: ${this.right}`;
  }
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

function test() {
  // Create new Binary Search Tree (BST)
  let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  // [ 1, 3, 4,  5, 7, 8, 9, 23, 67, 324, 6345]
  let bst = new Tree(array);

  // insert()
  bst.insert(6);
  bst.insert(6700);
  // prettyPrint(bst.root);

  // deleteItem()

  // bst.deleteItem(4);
  // bst.deleteItem(67);
  bst.deleteItem(8);
  /*
  // find()
  // console.log(bst.find(7));

  // levelOrder()
  // Sample callback fn is included as per the requirement
  bst.levelOrder((node) => console.log(node.value));

  // inOrder()
  bst.inOrder((node) => process.stdout.write(node.value.toString() + ' '));
  console.log();

  // preOrder()
  bst.preOrder((node) => process.stdout.write(node.value.toString() + ' '));
  console.log();

  // postOrder()
  bst.postOrder((node) => process.stdout.write(node.value.toString() + ' '));

  // height
  console.log(bst.height(new TreeNode(1)));
  console.log(bst.height(new TreeNode(23)));
  console.log(bst.height(new TreeNode(9)));
  console.log(bst.height(new TreeNode(67)));
  console.log(bst.height(new TreeNode(100)));

  // depth
  console.log(bst.depth(new TreeNode(9)));
  console.log(bst.depth(new TreeNode(4)));
  console.log(bst.depth(new TreeNode(40)));
  console.log(bst.depth(new TreeNode(324)));
  */
  // isBalanced()
  console.log(bst.isBalanced());

  // rebalance()
  prettyPrint(bst.root);
  bst.rebalance();
  prettyPrint(bst.root);
}

// test();
