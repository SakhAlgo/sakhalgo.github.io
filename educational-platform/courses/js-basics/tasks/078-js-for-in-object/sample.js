const numbers = [23, 45, 12, 67, 34, 89, 5];
let max = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > max) {
    max = numbers[i];
  }
}

console.log('Максимальное число: ' + max);