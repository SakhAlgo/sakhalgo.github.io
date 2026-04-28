// Исправьте цикл while, чтобы он выводил числа от 5 до 1
// Каждое число на новой строке

let i = 5;
while (i >= 1) {
  document.getElementById('output').textContent += i + '\n';
  i--;
}