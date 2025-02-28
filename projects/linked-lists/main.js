class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    if (nextNode instanceof Node || nextNode === null) {
      this.nextNode = nextNode;
    }
  }
}

class LinkedList {
  constructor(head) {
    if (head instanceof Node) {
      this.head = head;
    } else {
      throw new Error("It ain't bussin' bruh, need obj of Node class");
    }
  }
  append(value) {
    if (!this.head) {
      this.head = new Node();
      this.head.value = value;
      return;
    }

    let currNode = this.head;
    // navigate until we reach the tail node of the linked list
    while (currNode.nextNode) {
      currNode = currNode.nextNode;
    }
    // append the new node with the given value & making this the new tail node
    const newNode = new Node(value);
    currNode.nextNode = newNode;
    return -1;
  }

  prepend(value) {
    if (typeof value === "number" || typeof value === "string") {
      let newHead = new Node(value, this.head);
      this.head = newHead;
    } else {
      throw new Error(
        `Mr. Madison!, the value of head should be of type Number\ngiven value: ${value} :)`
      );
    }
    return;
  }

  size() {
    let curr = this.head;
    let size = 0;

    while (curr) {
      size++;
      curr = curr.nextNode;
    }
    return size;
  }

  tail() {
    let curr = this.head;
    while (curr.nextNode) {
      curr = curr.nextNode;
    }
    return curr;
  }

  at(index) {
    if (index < 0)
      throw new Error("-ve aura man; let's use some positive indexes instead");
    let counter = 0;
    let curr = this.head;
    while (++counter <= index && curr) {
      curr = curr.nextNode;
    }

    if (!curr) {
      throw new Error(`Seems like the index is out of bounds`);
    }
    console.log(`The node at index ${index} is: `);
    return curr;
  }

  pop() {
    let prev = null;
    let curr = this.head;
    while (curr.nextNode) {
      prev = curr;
      curr = curr.nextNode;
    }
    prev.nextNode = null;
    return `The popped off element is ${curr.value}`;
  }

  contains(value) {
    let curr = this.head;
    let flag = false;
    while (curr && !flag) {
      flag = curr.value === value;
      curr = curr.nextNode;
    }
    return flag;
  }

  find(value) {
    let curr = this.head;
    let index = 0;
    while (curr) {
      if (curr.value === value) return index;
      curr = curr.nextNode;
      index++;
    }
    return `${value} isn't present in the linked list`;
  }

  toString() {
    const currNode = this.head;
    let res = "".concat(`( ${currNode.value} )`);
    let next = currNode.nextNode;
    const arrow = "->";
    while (next) {
      res = res.concat(` ${arrow} ( ${next.value} )`);
      next = next.nextNode;
    }
    res = res.concat(` ${arrow} ( ${next} )`);
    return res;
  }

  /* 
    insertAt start
    insertAt end
    insertAt in between
  */
  insertAt(value, index) {
    let prev = null;
    let curr = this.head;
    let currIdx = 0;
    if (index === 0) {
      this.prepend(value);
      return;
    } else if (index < 0) {
      throw new Error(
        "-ve indexes are negative aura, let's bring some glow up"
      );
    }

    while (curr) {
      if (currIdx === index) {
        // add a new node w the given value
        let newNode = new Node(value);
        prev.nextNode = newNode;
        newNode.nextNode = curr;
        return;
      } else {
        prev = curr;
        curr = curr.nextNode;
        currIdx++;
      }
    }
    // if new node needs to be tail node
    if (currIdx === index) {
      this.append(value);
    } else {
      // implying index > size of the linked list
      throw new Error(
        `nuh-uh let's stay within limits ;), given index: ${index} exceeds the size of linked list: ${currIdx}`
      );
    }
  }

  removeAt(index) {
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }
    let currIdx = 0;
    let prev;
    let curr = this.head;

    while (curr) {
      if (currIdx === index) {
        // remove the node
        prev.nextNode = curr.nextNode;
        return;
      } else {
        prev = curr;
        curr = curr.nextNode;
        currIdx++;
      }
    }

    if (currIdx - 1 <= index) throw new Error("Yup, out of bounds!");
  }
}

// /*
// ---- Append ----
const head = new Node(2);
let ll = new LinkedList(head);
ll.append(5);
ll.append(43567647);
console.log("append(value): ", ll.toString()); // ( 2 ) -> ( 5 ) -> ( 43567647 )

// --- Prepend ---
ll.prepend(102);
console.log("prepend(value): ", ll.toString()); // ( 102 ) -> ( 2 ) -> ( 5 ) -> ( 43567647 )

// --- Size ---
console.log("size: ", ll.size()); // 4

// --- Head ---
console.log("head: ", ll.head);

// --- Tail ---
console.log("tail node: ", ll.tail());

// --- at(index) ---
console.log("at(index):", ll.at(0));
console.log("at(index):", ll.at(1));
console.log("at(index):", ll.at(2));

// --- Pop ---
console.log(ll.toString());
console.log("pop: ", ll.pop());
console.log(ll.toString());

// --- Contains ---
console.log("pop: ", ll.contains(2));
console.log(ll.toString());

// --- Find ---
console.log("find; index: ", ll.find(102));

// --- toString() ---
console.log("toString: ", ll.toString());

// --- insertAt(value, index) ---
ll.insertAt(619, 2);
console.log("After insertAt(value, index): \n", ll.toString());

// --- removeAt(index) ---
ll.removeAt(2);
console.log("After removeAt(index): \n", ll.toString());
// */
