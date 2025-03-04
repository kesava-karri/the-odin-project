import HashMap from './HashMap.js';

const test = new HashMap(); // or HashMap() if using a factory

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log(test.length()); // 12
test.set('lion', 'silver');
test.set('ice cream', 'pistachio');

console.log(test.length()); // 12
test.set('moon', 'silver'); // Triggered the capacity increase
console.log(test.length()); // 13;
// test.toString();

test.set('apple', 'green');
test.set('grape', 'black');
test.set('jacket', 'white');
console.log(test.length()); // 13;
// test.toString();

console.log(test.get('apple')); // green
console.log(test.get('banana')); // yellow

console.log(test.has('apples')); // false
console.log(test.has('kite')); // true

console.log(test.remove('val')); // false
console.log(test.remove('lion')); // true
console.log(test.remove('ice cream')); // true

console.log(test.length()); // 11;
// test.toString();

// ["moon","carrot","frog","banana","grape","jacket","kite","elephant","apple","hat","dog"]
console.log(JSON.stringify(test.keys(), null, 0));

// ["silver","orange","green","yellow","black","pistachio","white","pink","gray","green","black","brown","silver"]
console.log(JSON.stringify(test.values(), null, 0));

// [["moon","silver"],["carrot","orange"],["frog","green"],["banana","yellow"],["grape","black"],["ice cream","pistachio"],["jacket","white"],["kite","pink"],["elephant","gray"],["apple","green"],["hat","black"],["dog","brown"],["lion","silver"]]
console.log(JSON.stringify(test.entries(), null, 0));

test.clear();
console.log(test.length()); // 0;
