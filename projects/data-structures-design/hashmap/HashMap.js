import LinkedList from '../linked-lists/LinkedList.js';

export default class HashMap {
  // Private fields
  #loadFactor;
  #capacity;

  constructor() {
    this.#loadFactor = 0.75;
    this.#capacity = 16;
    this.bucketContainer = new Array(this.#capacity);
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const hashCode = this.#hash(key);
    const nd = new Node(key, value);
    let bucket = this.bucketContainer[hashCode];
    let curr;

    if (bucket === undefined) {
      bucket = new LinkedList(nd);
    } else {
      // a bucket is already present
      curr = bucket.head;
      while (curr.nextNode) {
        // iterate over the linked list to find out if the key exist
        if (curr.key === key) {
          // key matches - overwrite
          curr.value = value;
        }
        // move to next node
        curr = curr.nextNode;
      }
      // the key doesn't exist, so let's append the new pair to the bucket
      // we can use append method but since we've already traversed all the way, let's use that instead :)
      if (curr.key === key) {
        // key matches - overwrite
        curr.value = value;
      } else {
        curr.nextNode = nd;
      }
    }

    this.bucketContainer[hashCode] = bucket;
  }

  get(key) {
    const hashCode = this.#hash(key);
    const bucket = this.bucketContainer[hashCode];
    if (bucket === undefined) return null;

    let curr = bucket.head;
    while (curr) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.nextNode;
    }
    return null;
  }

  /**
   * The `has()` method checks if the `key` exists and returns a boolean.
   *
   * @param {string} key
   * @returns boolean
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * The `remove()` method deletes the entry if the `key` exists & returns
   * true; otherwise, it returns false
   *
   * @param {string} key
   * @returns boolean
   */
  remove(key) {
    const hashCode = this.#hash(key);
    const bucket = this.bucketContainer[hashCode];
    // no bucket exists when there's no key present
    if (bucket === undefined || bucket.size() === 0) return false;
    // when only one node is present
    else if (bucket.size() === 1 && bucket.head.key === key) {
      bucket.head = null;
      return true;
    }
    let prev;
    let curr = bucket.head;
    while (curr) {
      if (curr.key === key) {
        if (prev == null) {
          // implying first node matches the key & there's other next nodes present :)
          bucket.head = curr.nextNode;
          return true;
        } else {
          // node other than the first node
          prev.nextNode = curr.nextNode;
        }
        return true;
      } else {
        // continue traversing
        prev = curr;
        curr = curr.nextNode;
      }
    }
    return false;
  }

  /**
   * returns the number of stored keys in the hash map
   */
  length() {
    // traverse thru all the available containers & find the entries
    return this.#processNodes('count');
  }

  /**
   * The `clear()` method removes all entries in the hashmap
   */
  clear() {
    if (bucketContainer.size() > 0) {
      this.bucketContainer = new Array(this.#capacity);
    }
  }

  /**
   * The `keys()` method returns an array containing all the keys within the
   * hashmap
   */
  keys() {
    return this.#processNodes('key');
  }

  /**
   * The method `values()` returns all the values within the hashmap
   */
  values() {
    return this.#processNodes('value');
  }

  /**
   * The `entries()` method returns an array that contains each `key, value`
   * pair
   */
  entries() {
    return this.#processNodes('entry');
  }

  /**
   * View the hashmap w the help of `toString()` method
   */
  toString() {
    let bucketContainer = this.bucketContainer;
    console.log(`---`);
    for (let i = 0; i < bucketContainer.length; i++) {
      let bucket = bucketContainer[i];
      if (bucket !== undefined) {
        let curr = bucket.head;
        console.log(`\ncontainer w hashCode: ${i}\n{`);
        while (curr) {
          process.stdout.write(`  ${curr.key}: ${curr.value}`);
          if (curr !== null) {
            curr = curr.nextNode;
          }
          console.log();
        }
        console.log(`}`);
      }
    }
    console.log(`---`);
  }

  /**
   * A private method to find values/keys based on the input
   */
  #processNodes(operation) {
    let container = this.bucketContainer;
    let result = operation === 'count' ? 0 : [];
    for (const bucket of container) {
      if (bucket) {
        let curr = bucket.head;
        while (curr) {
          if (operation === 'count') {
            result++;
          } else if (operation === 'key') {
            result.push(curr.key);
          } else if (operation === 'value') {
            result.push(curr.value);
          } else if (operation === 'entry') {
            result.push([curr.key, curr.value]);
          }
          curr = curr.nextNode;
        }
      }
    }
    return result;
  }
}

class Node {
  constructor(key, value, nextNode = null) {
    this.key = key;
    this.value = value;
    if (nextNode instanceof Node || nextNode === null) {
      this.nextNode = nextNode;
    }
  }
  toString() {
    return `key: ${this.key}; \nvalue: ${this.value}\n nextNode: ${this.nextNode}`;
  }
}

function test() {
  let hm = new HashMap();
  // --- set ---
  hm.set('Carlos', `I am the old value.`);
  hm.set('Carlos', `I am the new value.`);
  hm.set('reyna', 24);
  hm.set('Rama', 18);
  hm.set('Sita', 9);
  hm.set('Sita', 10);
  /*
  // --- get ---
  console.log(hm.get("reyna")); // 24
  console.log(hm.get("Rama")); // 18
  console.log(hm.get("Sita")); // 10
  console.log(hm.get("sage")); // null
  
  // --- has ---
  console.log(hm.has("Carlos"));
  console.log(hm.has("Sage"));
  // --- remove ---
    hm.toString();
    // case: Invalid key
    console.log(hm.remove("Raze")); // false
    // case: firstNode
    console.log(hm.remove("Rama")); // true
    console.log(hm.remove("Rama")); // false
    // case: single node in the container
    console.log(hm.remove("Carlos")); // true
    console.log(hm.remove("Carlos")); // false
    // case: trying to remove an already deleted entry
    console.log(hm.remove("Rama")); // false
    
  // --- length ---
  console.log(hm.length()); // 4
  
  // --- clear() ---
  hm.clear();
  console.log(hm.length()); // 0
  
  // --- keys() ---
  console.log(hm.keys()); // [ 'Rama', 'Sita', 'reyna', 'Carlos' ]
  // --- values() ---
  console.log(hm.values()); // [ 18, 10, 24, 'I am the new value.' ]
  
  console.log(hm.entries()); // [[ 'Rama', 18 ], [ 'Sita', 10 ], [ 'reyna', 24 ], [ 'Carlos', 'I am the new value.' ]]
  
  // --- toString ---
  hm.toString();
  */
}

// test();
