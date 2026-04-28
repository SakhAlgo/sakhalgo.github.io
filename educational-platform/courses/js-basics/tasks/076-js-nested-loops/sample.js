// Напишите вложенный цикл, который выводит таблицу умножения 3x3
// Результат: "1x1=1 1x2=2 1x3=3 ..."

for (let i = 1; i <= 3; i++) {
  let row = "";
  for (let j = 1; j <= 3; j++) {
    row += i + "x" + j + "=" + (i * j) + " ";
  }
  document.getElementById('output').textContent += row + '\n';
}