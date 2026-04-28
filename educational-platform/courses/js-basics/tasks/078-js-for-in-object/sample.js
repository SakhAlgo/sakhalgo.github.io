// Переберите объект user с помощью for...in
// Выведите каждое свойство в формате "ключ: значение"

const user = {
  name: "Алиса",
  age: 25,
  city: "Москва"
};

for (const key in user) {
  document.getElementById('output').textContent += key + ": " + user[key] + '\n';
}