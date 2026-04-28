export default class Task071Validator {
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
    if (hasFunction) score += 15;

    // Проверка цикла for внутри функции
    const hasFor = /\bfor\s*\(/.test(js);
    checks.push({
      label: "Внутри функции есть цикл for",
      passed: hasFor,
      hint: "Добавьте for (let i = 1; i <= n; i++)",
    });
    if (hasFor) score += 15;

    // Проверка return
    const hasReturn = /return\s+/.test(js);
    checks.push({
      label: "Функция возвращает результат (return sum)",
      passed: hasReturn,
      hint: "Добавьте return sum после цикла",
    });
    if (hasReturn) score += 15;

    // Проверка переменной sum
    const hasSumVar = /let\s+sum/.test(js);
    checks.push({
      label: "Объявлена переменная sum",
      passed: hasSumVar,
      hint: "Добавьте let sum = 0;",
    });
    if (hasSumVar) score += 10;

    // Проверка sum += i
    const hasSumAccum = /sum\s*\+=\s*i/.test(js);
    checks.push({
      label: "Накопление суммы: sum += i",
      passed: hasSumAccum,
      hint: "Добавьте sum += i внутри цикла",
    });
    if (hasSumAccum) score += 15;

    // Проверка цикла до n
    const hasLoopToN = /i\s*<=\s*n/.test(js);
    checks.push({
      label: "Цикл идёт до i <= n",
      passed: hasLoopToN,
      hint: "Укажите i <= n в условии цикла",
    });
    if (hasLoopToN) score += 15;

    // Проверка вызова sumTo
    const hasCall = /sumTo\s*\(/.test(js);
    checks.push({
      label: "Функция sumTo вызывается",
      passed: hasCall,
      hint: "Вызовите sumTo(5) и выведите результат",
    });
    if (hasCall) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}