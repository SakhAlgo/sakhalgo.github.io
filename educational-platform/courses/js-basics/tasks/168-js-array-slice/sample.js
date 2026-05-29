const letters = ['a', 'b', 'c', 'd', 'e'];
const part = letters.slice(1, 4);
console.log(part);
document.getElementById('output').textContent = part.join(', ');