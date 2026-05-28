export default class Task153Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции findChar
    const hasFunction = /function\s+findChar\s*\(/.test(js);
    checks.push({
      label: "Функция findChar объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function findChar(str, char) { ... }",
    });
    if (hasFunction) score += 5;

    // Проверка параметров функции
    const hasParameters = /function\s+findChar\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает два параметра (str, char)",
      passed: hasParameters,
      hint: "Укажите параметры: function findChar(str, char)",
    });
    if (hasParameters) score += 10;

    // Проверка переменной i
    const hasInitialization = /let\s+i\s*=\s*0/.test(js) || /var\s+i\s*=\s*0/.test(js);
    checks.push({
      label: "Переменная i инициализирована нулём",
      passed: hasInitialization,
      hint: "Создайте let i = 0",
    });
    if (hasInitialization) score += 10;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте цикл while (i < str.length)",
    });
    if (hasWhile) score += 5;

    // Проверка условия i < str.length
    const hasCondition = /while\s*\(\s*i\s*<\s*str\.length\s*\)/.test(js);
    checks.push({
      label: "Условие цикла i < str.length",
      passed: hasCondition,
      hint: "Укажите условие i < str.length",
    });
    if (hasCondition) score += 10;

    // Проверка сравнения str[i] === char
    const hasComparison = /if\s*\(\s*str\s*\[\s*i\s*\]\s*===\s*char\s*\)/.test(js);
    checks.push({
      label: "Проверка str[i] === char",
      passed: hasComparison,
      hint: "Добавьте if (str[i] === char)",
    });
    if (hasComparison) score += 5;

    // Проверка возврата i
    const hasReturnI = /\breturn\s+i\b/.test(js);
    checks.push({
      label: "Возврат индекса i при нахождении символа",
      passed: hasReturnI,
      hint: "Внутри if добавьте return i",
    });
    if (hasReturnI) score += 10;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++ внутри цикла",
      passed: hasIncrement,
      hint: "Добавьте i++ после проверки",
    });
    if (hasIncrement) score += 10;

    // Проверка возврата -1
    const hasReturnNegative = /return\s+-1/.test(js);
    checks.push({
      label: "Возврат -1, если символ не найден",
      passed: hasReturnNegative,
      hint: "После цикла добавьте return -1",
    });
    if (hasReturnNegative) score += 10;

    // Проверка вызова findChar('hello', 'l')
    const hasCall = /findChar\s*\(\s*['"]hello['"]\s*,\s*['"]l['"]\s*\)/.test(js);
    checks.push({
      label: "Вызов findChar('hello', 'l')",
      passed: hasCall,
      hint: "Вызовите функцию: findChar('hello', 'l')",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|findChar\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(findChar('hello', 'l'))",
    });
    if (hasConsoleLog) score += 5;

    // Проверка что return находится до i++ (порядок важен)
    const hasReturnBeforeIncrement = /if\s*\([^)]+\)\s*\{\s*return\s+i\s*;?\s*\}\s*i\s*\+\+/.test(js);
    if (hasReturnBeforeIncrement) {
      checks.push({
        label: "Правильный порядок: сначала return, потом i++",
        passed: true,
        hint: "Убедитесь, что return i находится до i++",
      });
      score += 10;
    } else {
      checks.push({
        label: "Правильный порядок: сначала return, потом i++",
        passed: false,
        hint: "Сначала верните i, затем после блока if делайте i++",
      });
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}