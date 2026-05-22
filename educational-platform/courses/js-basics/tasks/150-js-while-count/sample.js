// Выведите числа от 1 до 5 с помощью цикла while
// Каждое число на новой строке

let i = 1;
while (i <= 5) {
  document.getElementById('output').textContent += i + '\n';
  i++;
}