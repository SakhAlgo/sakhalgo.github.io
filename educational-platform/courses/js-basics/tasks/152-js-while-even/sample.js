// Выведите только чётные числа от 1 до 10

let i = 1;
while (i <= 10) {
  if (i % 2 === 0) {
    document.getElementById('output').textContent += i + '\n';
  }
  i++;
}