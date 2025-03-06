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

  // find()
  // console.log(bst.find(7));

  prettyPrint(bst.root);
  // Sample callback fn is included as per the requirement
  bst.levelOrder((node) => console.log(node.value));
}

test();
