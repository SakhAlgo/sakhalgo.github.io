// Функция sumTo(n) считает сумму чисел от 1 до n
// Исправьте код: нужно добавить return sum

function sumTo(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

document.getElementById('output').textContent = sumTo(5);