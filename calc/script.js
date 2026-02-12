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
let recipe = []; // спискок объектов

document.querySelector(".add_btn").addEventListener("click", function () {
  let name = document.querySelector(".item_name ");
  let count = document.querySelector(".item_count");
  let type = document.querySelector(".item_type");
  if (!name.value) {
    alert("Введите название ингредиента");
    return false;
  }
  recipe.push({
    name: name.value,
    count: +count.value,
    type: type.value,
  });
  let result;
  if (+count.value === 0) {
    result = `${name.value} - по вкусу`;
  } else {
    result = `${name.value} - ${count.value} ${type.value}`;
  }
  let div = document.createElement("div");
  div.innerHTML = `
    <div class="d-flex space_beetween">
      <div> ${result} </div>
      <button class="remove_btn" data-name="${name.value}">&times;</button>
    </div>`;
  document.querySelector(".recipe").append(div);
  name.value = "";
  count.value = "";
});

// Изменить название рецепта
document.querySelector(".recipe_name").addEventListener("click", function () {
  let name_recipe = prompt("Введите название рецепта");
  if (name_recipe) {
    document.querySelector(".recipe_name").textContent = name_recipe;
  }
});
// Удаление ингредиента
document.querySelector(".recipe").addEventListener("click", function (e) {
  if (!e.target.dataset.name) {
    return false;
  }
  e.target.closest(".d-flex").remove();
  for (let i = 0; i < recipe.length; i++) {
    if (recipe[i]["name"] == e.target.dataset.name) {
      recipe.splice(i, 1);
    }
  }
});

// Копирование в буфер
let copy_btn = document
  .querySelector("#copy_btn")
  .addEventListener("click", function () {
    // Получаем текст из блока .text
    const textToCopy = document.querySelector(".copy").innerText;

    // Копируем текст в буфер обмена
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Текст успешно скопирован!");
      })
      .catch((err) => {
        console.error("Не удалось скопировать текст:", err);
      });
  });

// Кнопка вычислить
document.querySelector(".result_btn").addEventListener("click", function () {
  document.querySelector(".result_new_recipe").innerHTML = "";
  let ratio_type = +document.querySelector(".item_ratio_type").value;
  let ratio = +document.querySelector(".item_ratio").value;
  if (!ratio) {
    alert("Введите число кроме нуля");
    return false;
  }
  let new_recipe = [];
  if (ratio_type === 1) {
    for (let i = 0; i < recipe.length; i++) {
      new_recipe.push({
        name: recipe[i]["name"],
        count: (recipe[i]["count"] / ratio).toFixed(3),
        type: recipe[i]["type"],
      });
    }
  } else if (ratio_type === 2) {
    for (let i = 0; i < recipe.length; i++) {
      new_recipe.push({
        name: recipe[i]["name"],
        count: recipe[i]["count"] * ratio,
        type: recipe[i]["type"],
      });
    }
  }

  for (let i = 0; i < new_recipe.length; i++) {
    let result;
    if (+new_recipe[i]["count"] == 0) {
      result = "по вкусу";
    } else {
      result = `${new_recipe[i]["count"]} ${new_recipe[i]["type"]}`;
    }
    let div = document.createElement("div");
    div.innerHTML = `<div classs ="d-flex">
                        <div> ${new_recipe[i]["name"]} - ${result}</div>
                  </div>`;
    document.querySelector(".result_new_recipe").append(div);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btnDark = document.getElementById("btn-dark");
  const btnLight = document.getElementById("btn-light");

  // Функция для установки темы
  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      btnDark.style.display = "none";
      btnLight.style.display = "flex";
    } else {
      btnLight.style.display = "none";
      btnDark.style.display = "flex";
    }

    localStorage.setItem("theme", theme);
  };

  // Функция для переключения темы
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  // Обработчики событий для кнопок
  btnDark.addEventListener("click", () => setTheme("dark"));
  btnLight.addEventListener("click", () => setTheme("light"));

  // Загрузка сохраненной темы при инициализации
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Определение предпочтений пользователя по системным настройкам
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches) {
      setTheme("dark");
    }
  }

  // Слушатель для системных изменений темы
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    });
});
