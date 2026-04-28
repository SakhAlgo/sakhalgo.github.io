// Замените обычный цикл for на for...of

const fruits = ["яблоко", "банан", "апельсин"];

for (const fruit of fruits) {
  document.getElementById('output').textContent += fruit + '\n';
}