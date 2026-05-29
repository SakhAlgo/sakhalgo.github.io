const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
months.splice(2, 2, 'X', 'Y');
console.log(months);
document.getElementById('output').textContent = months.join(', ');