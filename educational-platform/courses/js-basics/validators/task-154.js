export default class Task154Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции factorial
    const hasFunction = /function\s+factorial\s*\(/.test(js);
    checks.push({
      label: "Функция factorial объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function factorial(n) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметра функции
    const hasParameter = /function\s+factorial\s*\(\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает параметр n",
      passed: hasParameter,
      hint: "Укажите параметр: function factorial(n)",
    });
    if (hasParameter) score += 10;

    // Проверка переменной result
    const hasResult = /let\s+result\s*=\s*1/.test(js) || /var\s+result\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная result инициализирована единицей",
      passed: hasResult,
      hint: "Создайте let result = 1",
    });
    if (hasResult) score += 10;

    // Проверка переменной i (начинается с 2)
    const hasI = /let\s+i\s*=\s*2/.test(js) || /var\s+i\s*=\s*2/.test(js);
    checks.push({
      label: "Переменная i инициализирована двойкой",
      passed: hasI,
      hint: "Создайте let i = 2 (начинаем с 2, так как 1 не влияет на произведение)",
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

    // Проверка умножения result *= i
    const hasMultiplication = /result\s*\*=\s*i/.test(js);
    checks.push({
      label: "Умножение result *= i",
      passed: hasMultiplication,
      hint: "Внутри цикла добавьте result *= i",
    });
    if (hasMultiplication) score += 10;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Инкремент i++ внутри цикла",
      passed: hasIncrement,
      hint: "Добавьте i++ внутри цикла",
    });
    if (hasIncrement) score += 10;

    // Проверка return result
    const hasReturn = /\breturn\s+result\b/.test(js);
    checks.push({
      label: "Возврат значения result",
      passed: hasReturn,
      hint: "Добавьте return result в конце функции",
    });
    if (hasReturn) score += 10;

    // Проверка вызова factorial(5)
    const hasCall = /factorial\s*\(\s*5\s*\)/.test(js);
    checks.push({
      label: "Вызов factorial(5)",
      passed: hasCall,
      hint: "Вызовите функцию: factorial(5)",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|factorial\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(factorial(5))",
    });
    if (hasConsoleLog) score += 5;

    // Дополнительная проверка: обработка факториала 0 и 1
    const hasZeroCheck = /if\s*\(\s*n\s*===\s*0\s*\)/.test(js);
    if (hasZeroCheck) {
      checks.push({
        label: "Обработка случая n === 0",
        passed: true,
        hint: "Можно добавить проверку для n === 0 (по желанию)",
      });
      score += 5;
    } else {
      // Даже без явной проверки, цикл while не выполнится, и result останется 1 (правильно для 0! и 1!)
      checks.push({
        label: "Корректная работа для n = 0 или 1 (result = 1)",
        passed: true,
        hint: "Для n = 0 или 1 цикл не выполнится, result = 1 (это верно)",
      });
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}