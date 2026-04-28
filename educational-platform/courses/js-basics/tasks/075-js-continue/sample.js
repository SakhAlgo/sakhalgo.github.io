// Выведите только чётные числа от 1 до 10
// Используйте continue для пропуска нечётных чисел

for (let i = 1; i <= 10; i++) {
  if (i % 2 !== 0) {
    continue;
  }
  document.getElementById('output').textContent += i + '\n';
}