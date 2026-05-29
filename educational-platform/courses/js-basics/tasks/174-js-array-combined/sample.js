let data = [3, 8, 1, 8, 5, 3, 9, 9, 2];
let unique = [...new Set(data)];
unique.sort((a, b) => b - a);
unique.unshift(0);
unique.pop();
console.log(unique);
document.getElementById('output').textContent = unique.join(', ');