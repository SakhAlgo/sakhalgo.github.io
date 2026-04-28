// Функция findNumber ищет число в массиве и возвращает его индекс
// Добавьте break, когда число найдено

function findNumber(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

const numbers = [10, 20, 30, 40, 50];
document.getElementById('output').textContent = findNumber(numbers, 30);