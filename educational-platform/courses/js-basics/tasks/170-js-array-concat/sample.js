const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = arr1.concat(arr2);
console.log(combined);
document.getElementById('output').textContent = combined.join(', ');