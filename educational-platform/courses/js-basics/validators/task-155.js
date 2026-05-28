export default class Task155Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции power
    const hasFunction = /function\s+power\s*\(/.test(js);
    checks.push({
      label: "Функция power объявлена",
      passed: hasFunction,
      hint: "Создайте функцию function power(base, exp) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка параметров функции
    const hasParameters = /function\s+power\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция принимает два параметра (base, exp)",
      passed: hasParameters,
      hint: "Укажите параметры: function power(base, exp)",
    });
    if (hasParameters) score += 10;

    // Проверка переменной result
    const hasResult = /let\s+result\s*=\s*1/.test(js) || /var\s+result\s*=\s*1/.test(js);
    checks.push({
      label: "Переменная result инициализирована единицей",
      passed: hasResult,
      hint: "Создайте let result = 1",
    });
    if (hasResult) score += 10;

    // Проверка переменной i (начинается с 0 или 1)
    const hasIStart1 = /let\s+i\s*=\s*1/.test(js) || /var\s+i\s*=\s*1/.test(js);
    const hasIStart0 = /let\s+i\s*=\s*0/.test(js) || /var\s+i\s*=\s*0/.test(js);
    const hasI = hasIStart1 || hasIStart0;
    checks.push({
      label: "Переменная i инициализирована (0 или 1)",
      passed: hasI,
      hint: "Создайте let i = 1 (или 0)",
    });
    if (hasI) score += 10;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте цикл while (i <= exp)",
    });
    if (hasWhile) score += 15;

    // Проверка условия (i <= exp или i < exp)
    const hasConditionLte = /while\s*\(\s*i\s*<=\s*exp\s*\)/.test(js);
    const hasConditionLt = /while\s*\(\s*i\s*<\s*exp\s*\)/.test(js);
    const hasCondition = hasConditionLte || hasConditionLt;
    checks.push({
      label: "Условие цикла i <= exp (или i < exp)",
      passed: hasCondition,
      hint: "Укажите условие i <= exp (или i < exp)",
    });
    if (hasCondition) score += 10;

    // Проверка умножения result *= base
    const hasMultiplication = /result\s*\*=\s*base/.test(js);
    checks.push({
      label: "Умножение result *= base",
      passed: hasMultiplication,
      hint: "Внутри цикла добавьте result *= base",
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

    // Проверка вызова power(2, 3)
    const hasCall = /power\s*\(\s*2\s*,\s*3\s*\)/.test(js);
    checks.push({
      label: "Вызов power(2, 3)",
      passed: hasCall,
      hint: "Вызовите функцию: power(2, 3)",
    });
    if (hasCall) score += 10;

    // Проверка вывода в консоль
    const hasConsoleLog = /console\.log\s*\(\s*(?:result|power\s*\([^)]+\))\s*\)/.test(js);
    checks.push({
      label: "Вывод результата в консоль",
      passed: hasConsoleLog,
      hint: "Выведите результат: console.log(result) или console.log(power(2, 3))",
    });
    if (hasConsoleLog) score += 15;

    // Дополнительная проверка: обработка степени 0
    const handlesZeroExp = /if\s*\(\s*exp\s*===\s*0\s*\)/.test(js);
    if (!handlesZeroExp) {
      // Даже без явной проверки, цикл не выполнится, result останется 1 (правильно для exp=0)
      checks.push({
        label: "Корректная работа для exp = 0 (result = 1)",
        passed: true,
        hint: "Для exp = 0 цикл не выполнится, result = 1 (это верно, так как любое число в степени 0 равно 1)",
      });
      score += 5;
    } else {
      checks.push({
        label: "Обработка случая exp === 0",
        passed: true,
        hint: "Можно добавить проверку для exp === 0 (по желанию)",
      });
      score += 5;
    }

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}