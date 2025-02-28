/*
  Merge Sort
  - The way merge sort works is it basically follows divide & conquer which 
    means that the given array would be considered as parts (like divide into 2 parts at midpoint), sort them separately & later merge them. This process continues until we reach the atomic (single) element of each array
  - We achieve this w the help of recursion

  - In-place: No
  - Stable: Yes
  - Best, Worst & Avg Time Complexity: O(nlogn)
    linearly touching every element once & dividing logn times to reach single elements
*/

let mergeSort = (arr) => {
  divideAndConquer(arr, 0, arr.length - 1);
  return arr;
};

let divideAndConquer = (arr, start, end) => {
  // base case;
  if (start === end) return;
  // if (start >= end) return;
  let mid = Math.floor((start + end) / 2);
  divideAndConquer(arr, start, mid);
  divideAndConquer(arr, mid + 1, end);
  merge(arr, start, mid, end);
};

let merge = (arr, start, mid, end) => {
  let i = start, // to iterate over left part of the array
    j = mid + 1, // to iterate over the right part of the array; 'cause remember we don't change the array in place
    k = 0;
  let temp = [];

  while (i <= mid && j <= end) {
    if (arr[i] <= arr[j]) {
      temp[k++] = arr[i++];
    } else {
      temp[k++] = arr[j++];
    }
  }
  // There's a possibility that we may run out of either array
  while (i <= mid) {
    temp[k++] = arr[i++];
  }

  while (j <= end) {
    temp[k++] = arr[j++];
  }
  // over-writing our array
  k = 0;
  for (let i = start; i <= end; i++) {
    arr[i] = temp[k++];
  }
};

console.log(mergeSort([64, 25, 12, 22, 11]));
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));

console.log(mergeSort([1])); // direct example when `start > end` in the base case for the second recursive call
