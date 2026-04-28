// Исправьте код: замените while на do...while
// Цикл должен вывести числа от 1 до 5

let i = 1;
do {
  document.getElementById('output').textContent += i + '\n';
  i++;
} while (i <= 5);