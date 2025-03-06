### Notes

- Definition: A `Binary Search Tree` (BST) is a specialized version of binary tree where the following ordering rule is maintained. The ordering rule is that the value of any node on the left subtree is always smaller than the value of the parent node & the value of any node on the right subtree is always larger, making search, insertion & deletion operations much faster

- Note: You’ll build a balanced BST in this assignment. Do not use duplicate values because they make it more complicated and result in trees that are much harder to balance. Therefore, be sure to always remove duplicate values or check for an existing value before inserting.

- While implementing delete, there can be many cases;
  - No children (leaf node)
  - One child
  - Two children :)
    (can also be removing the root node)
    - To maintain the BST structure & ordering, the new root  
      has to be someone from the right;
    - And that someone should be the next biggest number; which
      would be the left most node on the right subtree to still maintain the BST ordering rule;
  - Checkout [this](https://youtu.be/wcIRPqTR3Kc?si=ItoB_OZP34vyyIkG) video to understand visually w an example BST

### learnings thru mistakes

- Remember to return the value found all the way back through the call stack - check `find()` method
- Struggled at figuring out the base case for recursion
  - was returning when mid goes less than start or over end;
- split right left recursion even before the recursion, it should usually be within the recursion :)
- one extra parameter (also passed in node which isn't necessary in this case)
