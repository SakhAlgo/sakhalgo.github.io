#!/usr/bin/env bash
set -e

BASE="courses/python-basics"

# ============================================================
# Массив задач: id_dir|id|title|sample_content
# ============================================================
TASKS=(
  # Переменные и строки
  "101-py-variable|101|Объявление переменной|name = \"Python\"\nprint(name)"
  "102-py-string|102|Строковая переменная|greeting = \"Привет, мир!\"\nprint(greeting)"
  "103-py-number|103|Числовая переменная|age = 25\nprint(age)"
  "104-py-boolean|104|Булево значение|is_ready = True\nprint(is_ready)"
  "105-py-fstring|105|F-строки|name = \"Анна\"\nage = 22\nprint(f\"Меня зовут {name}, мне {age} года\")"

  # Функции
  "106-py-function|106|Простая функция|def greet():\n    print(\"Привет!\")\ngreet()"
  "107-py-function-param|107|Функция с параметром|def hello(name):\n    print(f\"Привет, {name}!\")\nhello(\"Python\")"
  "108-py-return|108|Возврат значения|def square(x):\n    return x * x\nprint(square(5))"
  "109-py-function-two-params|109|Функция с двумя параметрами|def add(a, b):\n    return a + b\nprint(add(3, 7))"
  "110-py-lambda|110|Лямбда-функция|double = lambda x: x * 2\nprint(double(5))"

  # Условия
  "111-py-if|111|Условный оператор if|x = 10\nif x > 5:\n    print(\"Больше 5\")"
  "112-py-if-else|112|If/else|x = 3\nif x > 5:\n    print(\"Больше\")\nelse:\n    print(\"Меньше или равно\")"
  "113-py-elif|113|If/elif/else|x = 0\nif x > 0:\n    print(\"Положительное\")\nelif x < 0:\n    print(\"Отрицательное\")\nelse:\n    print(\"Ноль\")"
  "114-py-logical|114|Логические операторы|a = 5\nb = 10\nif a > 0 and b > 0:\n    print(\"Оба положительные\")\nelse:\n    print(\"Не оба\")"
  "115-py-ternary|115|Тернарный оператор|x = 7\nresult = \"Большой\" if x > 5 else \"Маленький\"\nprint(result)"

  # Циклы
  "116-py-for-range|116|Цикл for с range|for i in range(1, 6):\n    print(i)"
  "117-py-while|117|Цикл while|i = 1\nwhile i <= 5:\n    print(i)\n    i += 1"
  "118-py-for-sum|118|Сумма чисел циклом|total = 0\nfor i in range(1, 101):\n    total += i\nprint(total)"
  "119-py-break-continue|119|Break и continue|for i in range(1, 11):\n    if i == 5:\n        continue\n    if i > 7:\n        break\n    print(i)"
  "120-py-nested-loops|120|Вложенные циклы|for i in range(1, 4):\n    for j in range(1, 4):\n        print(f\"{i}*{j} = {i*j}\")"

  # Списки
  "121-py-list-create|121|Создание списка|fruits = [\"яблоко\", \"банан\", \"апельсин\"]\nprint(fruits)"
  "122-py-list-index|122|Индексация списка|nums = [10, 20, 30, 40, 50]\nprint(nums[0])\nprint(nums[-1])"
  "123-py-list-methods|123|Методы списков|nums = [1, 2, 3]\nnums.append(4)\nnums.remove(2)\nprint(nums)"
  "124-py-list-slice|124|Срезы списка|nums = list(range(10))\nprint(nums[:3])\nprint(nums[3:7])\nprint(nums[::2])"
  "125-py-list-comprehension|125|Генератор списка|squares = [x**2 for x in range(1, 11)]\nprint(squares)"

  # Словари
  "126-py-dict-create|126|Создание словаря|person = {\"name\": \"Анна\", \"age\": 25}\nprint(person)"
  "127-py-dict-access|127|Доступ к элементам словаря|book = {\"title\": \"Война и мир\", \"price\": 999}\nprint(book[\"title\"])\nprint(book[\"price\"])"
  "128-py-dict-methods|128|Методы словарей|data = {\"a\": 1, \"b\": 2, \"c\": 3}\nprint(list(data.keys()))\nprint(list(data.values()))"
  "129-py-dict-iterate|129|Перебор словаря|d = {\"x\": 10, \"y\": 20, \"z\": 30}\nfor key, value in d.items():\n    print(f\"{key}={value}\")"
  "130-py-dict-nested|130|Вложенные словари|users = {\n    \"user1\": {\"name\": \"Анна\", \"age\": 25},\n    \"user2\": {\"name\": \"Иван\", \"age\": 30}\n}\nprint(users[\"user2\"][\"name\"])"

  # Строки подробно
  "131-py-string-methods|131|Методы строк|text = \"Hello World\"\nprint(text.upper())\nprint(text.lower())"
  "132-py-string-format|132|Форматирование строк|name = \"Мария\"\nage = 28\nprint(\"Меня зовут {}, мне {} лет\".format(name, age))\nprint(f\"Меня зовут {name}, мне {age} лет\")"
  "133-py-string-split-join|133|Split и join|fruits = \"яблоко,банан,апельсин\"\nparts = fruits.split(\",\")\nprint(parts)\njoined = \"-\".join(parts)\nprint(joined)"
  "134-py-string-find|134|Поиск подстроки|text = \"Python программирование\"\nprint(\"Python\" in text)\nprint(text.find(\"программирование\"))"
  "135-py-string-check|135|Проверка строк|nums = \"12345\"\nprint(nums.isdigit())\nletters = \"abc\"\nprint(letters.isalpha())"
)

# ============================================================
# Требования для каждой задачи (по индексу)
# ============================================================
get_requirements() {
  case "$1" in
    101) echo '["Создать переменную name","Присвоить значение Python","Вывести переменную через print()"]' ;;
    102) echo '["Создать переменную greeting","Присвоить значение Привет, мир!","Вывести значение через print()"]' ;;
    103) echo '["Создать переменную age","Присвоить число 25","Вывести значение"]' ;;
    104) echo '["Создать переменную is_ready","Присвоить True","Вывести значение"]' ;;
    105) echo '["Создать переменные name и age","Вывести f-строку: Меня зовут {name}, мне {age} лет"]' ;;
    106) echo '["Создать функцию greet()","Функция должна выводить Привет!","Вызвать функцию"]' ;;
    107) echo '["Создать функцию hello(name)","Вывести Привет, {name}!","Вызвать с именем Python"]' ;;
    108) echo '["Создать функцию square(x)","Функция должна возвращать x*x","Вывести результат square(5)"]' ;;
    109) echo '["Создать функцию add(a, b)","Вернуть сумму a + b","Вывести результат add(3, 7)"]' ;;
    110) echo '["Создать лямбду для умножения на 2","Присвоить её переменной double","Вывести double(5)"]' ;;
    111) echo '["Создать переменную x = 10","Если x > 5, вывести Больше 5"]' ;;
    112) echo '["Создать x = 3","Если x > 5 вывести Больше, иначе Меньше или равно"]' ;;
    113) echo '["Создать x = 0","Если x > 0 вывести Положительное","Если x < 0 вывести Отрицательное","Иначе вывести Ноль"]' ;;
    114) echo '["Создать a = 5, b = 10","Если a > 0 and b > 0 вывести Оба положительные","Иначе вывести Не оба"]' ;;
    115) echo '["Создать x = 7","Использовать тернарный оператор","Если x > 5 присвоить Большой, иначе Маленький","Вывести результат"]' ;;
    116) echo '["Создать цикл от 1 до 5","Вывести каждое число"]' ;;
    117) echo '["Создать переменную i = 1","Выводить i пока i <= 5","Увеличивать i на 1"]' ;;
    118) echo '["Посчитать сумму чисел от 1 до 100","Вывести результат"]' ;;
    119) echo '["Вывести числа от 1 до 10","Пропустить число 5 через continue","Остановиться после 7 через break"]' ;;
    120) echo '["Вывести таблицу умножения 3x3","Для i от 1 до 3, для j от 1 до 3","Формат: i*j = результат"]' ;;
    121) echo '["Создать список fruits: яблоко, банан, апельсин","Вывести список"]' ;;
    122) echo '["Создать список [10, 20, 30, 40, 50]","Вывести первый элемент","Вывести последний элемент"]' ;;
    123) echo '["Создать список [1, 2, 3]","Добавить 4 через append()","Удалить 2 через remove()","Вывести результат"]' ;;
    124) echo '["Создать список [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]","Вывести первые 3 элемента","Вывести элементы с 3 по 6","Вывести каждый второй"]' ;;
    125) echo '["Создать список квадратов чисел от 1 до 10","Использовать list comprehension","Вывести результат"]' ;;
    126) echo '["Создать словарь person с ключами name и age","Значения: Анна и 25","Вывести словарь"]' ;;
    127) echo '["Создать словарь с ключами title и price","Вывести значение по ключу title","Вывести значение по ключу price"]' ;;
    128) echo '["Создать словарь {a: 1, b: 2, c: 3}","Вывести список ключей","Вывести список значений"]' ;;
    129) echo '["Создать словарь {x: 10, y: 20, z: 30}","Вывести каждую пару ключ=значение"]' ;;
    130) echo '["Создать словарь users с двумя пользователями","У каждого пользователя: name и age","Вывести имя второго пользователя"]' ;;
    131) echo '["Создать текст = Hello World","Вывести в верхнем регистре","Вывести в нижнем регистре"]' ;;
    132) echo '["Создать name = Мария, age = 28","Вывести через format()","Вывести через f-строку"]' ;;
    133) echo '["Создать строку яблоко,банан,апельсин","Разделить по запятой","Соединить через дефис","Вывести оба результата"]' ;;
    134) echo '["Создать текст Python программирование","Проверить есть ли слово Python через in","Найти позицию слова программирование через find()"]' ;;
    135) echo '["Создать строку 12345","Проверить isdigit()","Создать строку abc","Проверить isalpha()"]' ;;
    *) echo '["Выполните задание"]' ;;
  esac
}

echo "=== Генерация файлов курса Python ==="

for entry in "${TASKS[@]}"; do
  IFS='|' read -r dir id title sample <<< "$entry"

  # Создаём директорию задачи
  mkdir -p "$BASE/tasks/$dir"

  # Создаём task.json
  reqs=$(get_requirements "$id")
  cat > "$BASE/tasks/$dir/task.json" <<JSONEOF
{
  "id": "$id",
  "title": "$title",
  "difficulty": "easy",
  "points": 50,
  "passThreshold": 70,
  "tags": ["python"],
  "description": "$title",
  "requirements": $reqs,
  "sampleFiles": { "py": "sample.py" }
}
JSONEOF

  # Создаём sample.py
  echo -e "$sample" > "$BASE/tasks/$dir/sample.py"

  # Создаём валидатор
  cat > "$BASE/validators/task-$id.js" <<JSEOF
import { BaseValidator } from '../../js/core/validator.js';

export default class Task${id}PyValidator extends BaseValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Базовые проверки
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true });
      score += 50;
    } else {
      checks.push({ name: "Код предоставлен", passed: false });
    }

    if (pyCode.includes("print")) {
      checks.push({ name: "Используется print()", passed: true });
      score += 50;
    } else {
      checks.push({ name: "Используется print()", passed: false });
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
JSEOF

  echo "  ✓ Задача $id ($title)"
done

echo ""
echo "✅ Все файлы курса Python созданы успешно!"