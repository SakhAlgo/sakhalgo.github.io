const fruits = ['apple', 'banana', 'cherry'];
fruits[fruits.length - 1] = 'orange';
console.log(fruits);
document.getElementById('output').textContent = fruits.join(', ');