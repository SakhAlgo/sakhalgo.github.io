#!/usr/bin/env bash
set -e

BASE="courses/python-basics"
mkdir -p "$BASE/validators"

echo "=== Генерация улучшенных валидаторов для Python-курса ==="

generate_validator() {
  local id=$1
  local checks="$2"

  cat > "$BASE/validators/task-$id.js" <<JSEOF
export default class Task${id}PyValidator {
  async validate(pyCode, css, js, samples, config) {
    const checks = [];

    ${checks}

    const totalChecks = checks.length;
    const pointsPerCheck = Math.floor(100 / totalChecks);
    const passed = checks.filter(c => c.passed).length;
    const score = passed * pointsPerCheck;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
JSEOF
}

# ============================================================
# 101-105: Переменные и строки
# ============================================================

generate_validator 101 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/name\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная name объявлена", passed: true, label: "Переменная name объявлена" });
    }

    if (/["\x27]Python["\x27]/.test(pyCode)) {
      checks.push({ name: "Присвоено значение \"Python\"", passed: true, label: "Присвоено значение \"Python\"" });
    }

    if (/print\s*\(\s*name\s*\)/.test(pyCode)) {
      checks.push({ name: "print(name) используется", passed: true, label: "print(name) используется" });
    }
'

generate_validator 102 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/greeting\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная greeting объявлена", passed: true, label: "Переменная greeting объявлена" });
    }

    if (/["\x27]Привет, мир!["\x27]/.test(pyCode)) {
      checks.push({ name: "Присвоено корректное значение", passed: true, label: "Присвоено корректное значение" });
    }

    if (/print\s*\(\s*greeting\s*\)/.test(pyCode)) {
      checks.push({ name: "print(greeting) используется", passed: true, label: "print(greeting) используется" });
    }
'

generate_validator 103 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/age\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная age объявлена", passed: true, label: "Переменная age объявлена" });
    }

    if (/\bage\s*=\s*25\b/.test(pyCode)) {
      checks.push({ name: "Присвоено значение 25", passed: true, label: "Присвоено значение 25" });
    }

    if (/print\s*\(\s*age\s*\)/.test(pyCode)) {
      checks.push({ name: "print(age) используется", passed: true, label: "print(age) используется" });
    }
'

generate_validator 104 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/is_ready\s*=/.test(pyCode)) {
      checks.push({ name: "Переменная is_ready объявлена", passed: true, label: "Переменная is_ready объявлена" });
    }

    if (/\bis_ready\s*=\s*True\b/.test(pyCode)) {
      checks.push({ name: "Присвоено значение True", passed: true, label: "Присвоено значение True" });
    }

    if (/print\s*\(\s*is_ready\s*\)/.test(pyCode)) {
      checks.push({ name: "print(is_ready) используется", passed: true, label: "print(is_ready) используется" });
    }
'

generate_validator 105 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/name\s*=/.test(pyCode) && /age\s*=/.test(pyCode)) {
      checks.push({ name: "Переменные name и age объявлены", passed: true, label: "Переменные name и age объявлены" });
    }

    if (/f["\x27]/.test(pyCode)) {
      checks.push({ name: "Используется f-строка", passed: true, label: "Используется f-строка" });
    }

    if (/\{name\}/.test(pyCode) && /\{age\}/.test(pyCode)) {
      checks.push({ name: "Подстановка name и age в f-строку", passed: true, label: "Подстановка name и age в f-строку" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }
'

# ============================================================
# 106-110: Функции
# ============================================================

generate_validator 106 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+greet\s*\(/.test(pyCode)) {
      checks.push({ name: "Функция greet() объявлена", passed: true, label: "Функция greet() объявлена" });
    }

    if (/"Привет!"/.test(pyCode) || /\x27Привет!\x27/.test(pyCode)) {
      checks.push({ name: "Функция выводит Привет!", passed: true, label: "Функция выводит Привет!" });
    }

    if (/greet\s*\(/.test(pyCode)) {
      checks.push({ name: "Функция greet() вызвана", passed: true, label: "Функция greet() вызвана" });
    }
'

generate_validator 107 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+hello\s*\(\s*name\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция hello(name) объявлена", passed: true, label: "Функция hello(name) объявлена" });
    }

    if (/hello\s*\(\s*["\x27]Python["\x27]\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция вызвана с Python", passed: true, label: "Функция вызвана с Python" });
    }
'

generate_validator 108 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+square\s*\(\s*x\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция square(x) объявлена", passed: true, label: "Функция square(x) объявлена" });
    }

    if (/\breturn\b/.test(pyCode)) {
      checks.push({ name: "Функция возвращает значение", passed: true, label: "Функция возвращает значение" });
    }

    if (/square\s*\(\s*5\s*\)/.test(pyCode)) {
      checks.push({ name: "square(5) вызвана", passed: true, label: "square(5) вызвана" });
    }
'

generate_validator 109 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/def\s+add\s*\(\s*a\s*,\s*b\s*\)/.test(pyCode)) {
      checks.push({ name: "Функция add(a, b) объявлена", passed: true, label: "Функция add(a, b) объявлена" });
    }

    if (/\breturn\s+a\s*\+\s*b\b/.test(pyCode)) {
      checks.push({ name: "Возвращается сумма a + b", passed: true, label: "Возвращается сумма a + b" });
    }

    if (/add\s*\(\s*3\s*,\s*7\s*\)/.test(pyCode) && /print\s*\(/.test(pyCode)) {
      checks.push({ name: "add(3, 7) выведена через print()", passed: true, label: "add(3, 7) выведена через print()" });
    }
'

generate_validator 110 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\blambda\b/.test(pyCode)) {
      checks.push({ name: "Используется lambda", passed: true, label: "Используется lambda" });
    }

    if (/\bdouble\s*=/.test(pyCode)) {
      checks.push({ name: "Лямбда присвоена переменной double", passed: true, label: "Лямбда присвоена переменной double" });
    }

    if (/double\s*\(\s*5\s*\)/.test(pyCode)) {
      checks.push({ name: "double(5) вызвана", passed: true, label: "double(5) вызвана" });
    }
'

# ============================================================
# 111-115: Условные операторы
# ============================================================

generate_validator 111 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*10\b/.test(pyCode)) {
      checks.push({ name: "x = 10 объявлена", passed: true, label: "x = 10 объявлена" });
    }

    if (/\bif\s+.+:\s*$/.test(pyCode)) {
      checks.push({ name: "Используется if", passed: true, label: "Используется if" });
    }

    if (/print\s*\(\s*["\x27]Больше 5["\x27]\s*\)/.test(pyCode)) {
      checks.push({ name: "Выводится Больше 5", passed: true, label: "Выводится Больше 5" });
    }
'

generate_validator 112 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*3\b/.test(pyCode)) {
      checks.push({ name: "x = 3 объявлена", passed: true, label: "x = 3 объявлена" });
    }

    if (/\bif\b/.test(pyCode) && /\belse\b/.test(pyCode)) {
      checks.push({ name: "Используется if/else", passed: true, label: "Используется if/else" });
    }

    if (/"Больше"/.test(pyCode) || /\x27Больше\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Больше", passed: true, label: "Выводится Больше" });
    }
'

generate_validator 113 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*0\b/.test(pyCode)) {
      checks.push({ name: "x = 0 объявлена", passed: true, label: "x = 0 объявлена" });
    }

    if (/\bif\b/.test(pyCode) && /\belif\b/.test(pyCode) && /\belse\b/.test(pyCode)) {
      checks.push({ name: "Используется if/elif/else", passed: true, label: "Используется if/elif/else" });
    }

    if (/"Ноль"/.test(pyCode) || /\x27Ноль\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Ноль", passed: true, label: "Выводится Ноль" });
    }
'

generate_validator 114 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\ba\s*=\s*5\b/.test(pyCode) && /\bb\s*=\s*10\b/.test(pyCode)) {
      checks.push({ name: "a = 5, b = 10 объявлены", passed: true, label: "a = 5, b = 10 объявлены" });
    }

    if (/\band\b/.test(pyCode)) {
      checks.push({ name: "Используется логический and", passed: true, label: "Используется логический and" });
    }

    if (/"Оба положительные"/.test(pyCode) || /\x27Оба положительные\x27/.test(pyCode)) {
      checks.push({ name: "Выводится Оба положительные", passed: true, label: "Выводится Оба положительные" });
    }
'

generate_validator 115 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bx\s*=\s*7\b/.test(pyCode)) {
      checks.push({ name: "x = 7 объявлена", passed: true, label: "x = 7 объявлена" });
    }

    if (/\bif\s+.+\s+else\b/.test(pyCode)) {
      checks.push({ name: "Используется тернарный оператор", passed: true, label: "Используется тернарный оператор" });
    }

    if (/print\s*\(/.test(pyCode) && /\bresult\b/.test(pyCode)) {
      checks.push({ name: "Результат выведен через print()", passed: true, label: "Результат выведен через print()" });
    }
'

# ============================================================
# 116-120: Циклы
# ============================================================

generate_validator 116 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b.*\brange\b/.test(pyCode)) {
      checks.push({ name: "Используется for с range()", passed: true, label: "Используется for с range()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }
'

generate_validator 117 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bwhile\b/.test(pyCode)) {
      checks.push({ name: "Используется цикл while", passed: true, label: "Используется цикл while" });
    }

    if (/\bi\s*\+?=\s*1\b/.test(pyCode)) {
      checks.push({ name: "Счётчик i увеличивается", passed: true, label: "Счётчик i увеличивается" });
    }

    if (/print\s*\(\s*i\s*\)/.test(pyCode)) {
      checks.push({ name: "Значение i выводится", passed: true, label: "Значение i выводится" });
    }
'

generate_validator 118 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b/.test(pyCode) && /\brange\b/.test(pyCode)) {
      checks.push({ name: "Используется цикл for", passed: true, label: "Используется цикл for" });
    }

    if (/\btotal\b/.test(pyCode)) {
      checks.push({ name: "Переменная total используется", passed: true, label: "Переменная total используется" });
    }

    if (/print\s*\(\s*total\s*\)/.test(pyCode)) {
      checks.push({ name: "Результат выведен через print()", passed: true, label: "Результат выведен через print()" });
    }
'

generate_validator 119 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bcontinue\b/.test(pyCode)) {
      checks.push({ name: "Используется continue", passed: true, label: "Используется continue" });
    }

    if (/\bbreak\b/.test(pyCode)) {
      checks.push({ name: "Используется break", passed: true, label: "Используется break" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }
'

generate_validator 120 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b.*\bfor\b/s/.test(pyCode)) {
      checks.push({ name: "Два вложенных цикла for", passed: true, label: "Два вложенных цикла for" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется print()", passed: true, label: "Используется print()" });
    }
'

# ============================================================
# 121-125: Списки
# ============================================================

generate_validator 121 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[["\x27]яблоко["\x27]/.test(pyCode) || /\[["\x27]банан["\x27]/.test(pyCode)) {
      checks.push({ name: "Список fruits содержит фрукты", passed: true, label: "Список fruits содержит фрукты" });
    }

    if (/print\s*\(\s*fruits\s*\)/.test(pyCode)) {
      checks.push({ name: "Список выведен", passed: true, label: "Список выведен" });
    }
'

generate_validator 122 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[0\]/.test(pyCode)) {
      checks.push({ name: "Первый элемент через [0]", passed: true, label: "Первый элемент через [0]" });
    }

    if (/\[-1\]/.test(pyCode)) {
      checks.push({ name: "Последний элемент через [-1]", passed: true, label: "Последний элемент через [-1]" });
    }
'

generate_validator 123 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.append\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется append()", passed: true, label: "Используется append()" });
    }

    if (/\.remove\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется remove()", passed: true, label: "Используется remove()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результат выведен", passed: true, label: "Результат выведен" });
    }
'

generate_validator 124 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    (function() {
      const slices = pyCode.match(/\[\s*[^:]*:[^:]*\]/g);
      const pass = slices && slices.length >= 2;
      checks.push({ name: "Используются срезы списка", passed: !!pass, label: "Используются срезы списка" });
    })();
'

generate_validator 125 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bfor\b.*\bin\b.*\[?\]?/.test(pyCode)) {
      checks.push({ name: "Используется list comprehension (for)", passed: true, label: "Используется list comprehension (for)" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результат выведен", passed: true, label: "Результат выведен" });
    }
'

# ============================================================
# 126-130: Словари
# ============================================================

generate_validator 126 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/["\x27]name["\x27]/.test(pyCode)) {
      checks.push({ name: "Ключ name присутствует", passed: true, label: "Ключ name присутствует" });
    }

    if (/["\x27]age["\x27]/.test(pyCode)) {
      checks.push({ name: "Ключ age присутствует", passed: true, label: "Ключ age присутствует" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Словарь выведен", passed: true, label: "Словарь выведен" });
    }
'

generate_validator 127 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\btitle\b/.test(pyCode) && /\bprice\b/.test(pyCode)) {
      checks.push({ name: "Ключи title и price присутствуют", passed: true, label: "Ключи title и price присутствуют" });
    }

    if (/\[["\x27]title["\x27]\]/.test(pyCode)) {
      checks.push({ name: "Доступ к элементам через ключи", passed: true, label: "Доступ к элементам через ключи" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Значения выведены", passed: true, label: "Значения выведены" });
    }
'

generate_validator 128 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.keys\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .keys()", passed: true, label: "Используется .keys()" });
    }

    if (/\.values\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .values()", passed: true, label: "Используется .values()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

generate_validator 129 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.items\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .items()", passed: true, label: "Используется .items()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Пары ключ=значение выведены", passed: true, label: "Пары ключ=значение выведены" });
    }
'

generate_validator 130 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\[["\x27]user2["\x27]\]\[["\x27]name["\x27]\]/.test(pyCode)) {
      checks.push({ name: "Доступ к вложенному словарю", passed: true, label: "Доступ к вложенному словарю" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результат выведен", passed: true, label: "Результат выведен" });
    }
'

# ============================================================
# 131-135: Строки подробно
# ============================================================

generate_validator 131 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.upper\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .upper()", passed: true, label: "Используется .upper()" });
    }

    if (/\.lower\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .lower()", passed: true, label: "Используется .lower()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

generate_validator 132 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.format\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .format()", passed: true, label: "Используется .format()" });
    }

    if (/f["\x27]/.test(pyCode)) {
      checks.push({ name: "Используется f-строка", passed: true, label: "Используется f-строка" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

generate_validator 133 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.split\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .split()", passed: true, label: "Используется .split()" });
    }

    if (/\.join\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .join()", passed: true, label: "Используется .join()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

generate_validator 134 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\bin\b/.test(pyCode)) {
      checks.push({ name: "Проверка через in", passed: true, label: "Проверка через in" });
    }

    if (/\.find\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .find()", passed: true, label: "Используется .find()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

generate_validator 135 '
    if (pyCode && pyCode.trim().length > 0) {
      checks.push({ name: "Код предоставлен", passed: true, label: "Код предоставлен" });
    }

    if (/\.isdigit\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .isdigit()", passed: true, label: "Используется .isdigit()" });
    }

    if (/\.isalpha\s*\(/.test(pyCode)) {
      checks.push({ name: "Используется .isalpha()", passed: true, label: "Используется .isalpha()" });
    }

    if (/print\s*\(/.test(pyCode)) {
      checks.push({ name: "Результаты выведены", passed: true, label: "Результаты выведены" });
    }
'

echo "✅ Все 35 валидаторов обновлены!"