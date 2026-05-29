const data = [10, 20, 30];
data.unshift('start');
console.log(data);
document.getElementById('output').textContent = data.join(', ');