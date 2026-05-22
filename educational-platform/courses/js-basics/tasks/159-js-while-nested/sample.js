// Выведите таблицу умножения 3x3 с помощью вложенных while

let i = 1;
while (i <= 3) {
  let row = '';
  let j = 1;
  while (j <= 3) {
    row += i + 'x' + j + '=' + (i * j) + ' ';
    j++;
  }
  document.getElementById('output').textContent += row + '\n';
  i++;
}