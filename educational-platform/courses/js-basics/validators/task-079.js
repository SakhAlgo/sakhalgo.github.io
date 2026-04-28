export default class Task079Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка функции factorial
    const hasFunction = /function\s+factorial\s*\(/.test(js);
    checks.push({
      label: "Функция factorial объявлена",
      passed: hasFunction,
      hint: "Создайте function factorial(n) { ... }",
    });
    if (hasFunction) score += 15;

    // Проверка цикла for внутри функции
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Внутри функции есть цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 2; i <= n; i++)",
    });
    if (hasFor) score += 15;

    // Проверка переменной result
    const hasResult = /let\s+result/.test(js);
    checks.push({
      label: "Объявлена переменная result",
      passed: hasResult,
      hint: "Добавьте let result = 1;",
    });
    if (hasResult) score += 10;

    // Проверка умножения result *= i
    const hasMultiplication = /result\s*\*=\s*i/.test(js);
    checks.push({
      label: "Умножение result *= i внутри цикла",
      passed: hasMultiplication,
      hint: "Добавьте result *= i внутри цикла",
    });
    if (hasMultiplication) score += 20;

    // Проверка return result
    const hasReturn = /return\s+result/.test(js);
    checks.push({
      label: "Функция возвращает result (return result)",
      passed: hasReturn,
      hint: "Добавьте return result после цикла",
    });
    if (hasReturn) score += 15;

    // Проверка цикла до n
    const hasLoopToN = /i\s*<=\s*n/.test(js);
    checks.push({
      label: "Цикл идёт до i <= n",
      passed: hasLoopToN,
      hint: "Укажите i <= n в условии цикла",
    });
    if (hasLoopToN) score += 10;

    // Проверка вызова factorial
    const hasCall = /factorial\s*\(/.test(js);
    checks.push({
      label: "Функция factorial вызывается",
      passed: hasCall,
      hint: "Вызовите factorial(5) и выведите результат",
    });
    if (hasCall) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}