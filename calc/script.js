let fontSize = 16; // начальный размер шрифта
const minSize = 10;
const maxSize = 18;
const titleChangeName = "Нажми, чтобы ввести название рецепта";

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
let name_recipe;
document.querySelector(".recipe_name").addEventListener("click", function () {
  name_recipe = prompt("Введите название рецепта");
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


// Кнопка вычислить
let new_recipe = [];
document.querySelector(".result_btn").addEventListener("click", function () {
  document.querySelector(".result_new_recipe").innerHTML = "";
  let ratio_type = +document.querySelector(".item_ratio_type").value;
  let ratio = +document.querySelector(".item_ratio").value;
  if (!ratio) {
    alert("Введите число кроме нуля");
    return false;
  }
  new_recipe = [];
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

// Функция для создания закрепленного рецепта (отдельный fieldset)
function createPinnedRecipeFieldset(recipeName, recipeData) {
  const container = document.getElementById("pinned_recipes_container");
  
  // Создаем уникальный ID для fieldset
  const fieldsetId = "pinned_recipe_" + Date.now();
  
  // Создаем fieldset
  const fieldset = document.createElement("fieldset");
  fieldset.id = fieldsetId;
  fieldset.className = "pinned-recipe-fieldset";
  
  // Создаем legend с названием рецепта
  const legend = document.createElement("legend");
  legend.textContent = recipeName || "Рецепт без названия";
  fieldset.appendChild(legend);
  
  // Создаем контейнер для содержимого рецепта
  const recipeContent = document.createElement("div");
  recipeContent.className = "copy pinned-recipe-content";
  
  // Добавляем ингредиенты
  for (let i = 0; i < recipeData.length; i++) {
    let result;
    if (+recipeData[i]["count"] == 0) {
      result = "по вкусу";
    } else {
      result = `${recipeData[i]["count"]} ${recipeData[i]["type"]}`;
    }
    const div = document.createElement("div");
    div.innerHTML = `<div class="d-flex">
                        <div> ${recipeData[i]["name"]} - ${result}</div>
                  </div>`;
    recipeContent.appendChild(div);
  }
  
  fieldset.appendChild(recipeContent);
  
  // Создаем контейнер для кнопок
  const btnBox = document.createElement("div");
  btnBox.className = "btn-box";
  
  // Кнопка копировать
  const copyBtn = document.createElement("button");
  copyBtn.className = "copy_btn_pinned";
  copyBtn.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-copy"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
    />
  </svg>`;
  copyBtn.addEventListener("click", function() {
    const textToCopy = recipeContent.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        alert("Текст успешно скопирован!");
      })
      .catch((err) => {
        console.error("Не удалось скопировать текст:", err);
      });
  });
  btnBox.appendChild(copyBtn);
  
  // Кнопка удалить
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove_btn_pinned";
  removeBtn.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="#FF0000"
    class="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path
      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
    />
    <path
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
    />
  </svg>`;
  removeBtn.addEventListener("click", function() {
    fieldset.remove();
  });
  btnBox.appendChild(removeBtn);
  
  fieldset.appendChild(btnBox);
  
  // Добавляем fieldset в контейнер
  container.appendChild(fieldset);
}

pin_recipe_list = [];
document.querySelector("#pin_btn").addEventListener("click", function (e) {
  let pinBtn = confirm("Закрепить рецепт?");
  if (pinBtn) {
    // Проверяем, есть ли данные для закрепления
    if (!name_recipe || new_recipe.length === 0) {
      alert("Сначала создайте и вычислите рецепт!");
      return false;
    }
    
    // Создаем отдельный fieldset для закрепленного рецепта
    createPinnedRecipeFieldset(name_recipe, new_recipe);
    
    // Очищаем текущий рецепт
    document.querySelector(".recipe_name").textContent = titleChangeName;
    document.querySelector(".result_new_recipe").innerHTML = "";
    name_recipe = null;
  }
});
