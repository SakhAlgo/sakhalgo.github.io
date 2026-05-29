const queue = [100, 200, 300, 400];
queue.shift();
console.log(queue);
document.getElementById('output').textContent = queue.join(', ');