const items = ['a', 'b', 'c', 'd'];
const removed = items.pop();
console.log(removed);
console.log(items);
document.getElementById('output').textContent = 'removed: ' + removed + ', items: ' + items.join(', ');