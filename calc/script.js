let fontSize = 16; // начальный размер шрифта
const minSize = 10;
const maxSize = 18;

const body = document.body;
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");

body.style.fontSize = fontSize + "px";

// Функция обновления состояния кнопок
function updateButtons() {
  decreaseBtn.disabled = fontSize <= minSize;
  increaseBtn.disabled = fontSize >= maxSize;
}

// Обработчик увеличения шрифта
increaseBtn.addEventListener("click", () => {
  if (fontSize < maxSize) {
    fontSize++;
    body.style.fontSize = fontSize + "px";
    updateButtons();
  }
});

// Обработчик уменьшения шрифта
decreaseBtn.addEventListener("click", () => {
  if (fontSize > minSize) {
    fontSize--;
    body.style.fontSize = fontSize + "px";
    updateButtons();
  }
});

// Инициализация состояния кнопок
updateButtons();
