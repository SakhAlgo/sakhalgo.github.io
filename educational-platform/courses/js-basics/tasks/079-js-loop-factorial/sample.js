// Напишите функцию factorial(n), которая считает факториал числа n
// Факториал n! = 1 * 2 * 3 * ... * n
// Пример: factorial(5) = 1 * 2 * 3 * 4 * 5 = 120

function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

document.getElementById('output').textContent = factorial(5);