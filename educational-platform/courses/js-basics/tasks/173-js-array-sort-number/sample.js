const numbers = [10, 2, 5, 1, 9];
numbers.sort((a, b) => a - b);
console.log(numbers);
document.getElementById('output').textContent = numbers.join(', ');