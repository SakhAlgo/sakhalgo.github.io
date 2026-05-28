export default class Task151Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции sumTo
    const hasFunction = /function\s+sumTo\s*\(/.test(js);
    checks.push({
      label: "Функция sumTo объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function sumTo(n) { ... }",
    });
    if (hasFunction) score += 10;

    // Проверка параметра функции
    const hasParameter = /function\s+sumTo\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает параметр n",
      passed: hasParameter,
      hint: "Укажите параметр: function sumTo(n)",
    });
    if (hasParameter) score += 10;

    // Проверка переменной sum
    const hasSum = /let\s+sum\s*=\s*0/.test(js) || /var\s+sum\s*=\s*0/.test(js);
    checks.push({
      label: "Переменная sum инициализирована нулём",
      passed: hasSum,
      hint: "Создайте let sum = 0",
    });
    if (hasSum) score += 5;

    // Проверка переменной i
    const hasI = /let\s+i\s*=\s*1/.test(js) || /var\s+i\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная i инициализирована единицей",
      passed: hasI,
      hint: "Создайте let i = 1",
    });
    if (hasI) score += 5;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте цикл while (i <= n)",
    });
    if (hasWhile) score += 5;

    // Проверка условия i <= n
    const hasCondition = /while\s*\(\s*i\s*<=\s*n\s*\)/.test(js);
    checks.push({
      label: "Условие цикла i <= n",
      passed: hasCondition,
      hint: "Укажите условие i <= n",
    });
    if (hasCondition) score += 10;

    // Проверка суммирования
    const hasSummation = /sum\s*\+=\s*i/.test(js);
    checks.push({
      label: "Суммирование: sum += i",
      passed: hasSummation,
      hint: "Внутри цикла добавьте sum += i",
    });
    if (hasSummation) score += 10;

    // Проверка инкремента
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++",
      passed: hasIncrement,
      hint: "Добавьте i++ внутри цикла",
    });
    if (hasIncrement) score += 10;

    // Проверка return sum
    const hasReturn = /\breturn\s+sum\b/.test(js);
    checks.push({
      label: "Возврат значения sum",
      passed: hasReturn,
      hint: "Добавьте return sum в конце функции",
    });
    if (hasReturn) score += 10;

    // Проверка вызова sumTo(5)
    const hasCall = /sumTo\s*\(\s*5\s*\)/.test(js);
    checks.push({
      label: "Вызов sumTo(5)",
      passed: hasCall,
      hint: "Вызовите функцию: sumTo(5)",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|sumTo\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(sumTo(5))",
    });
    if (hasConsoleLog) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}