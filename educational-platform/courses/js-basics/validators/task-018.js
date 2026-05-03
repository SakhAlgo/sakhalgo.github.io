export default class Task018Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // 1. Проверка: функция add объявлена
    const hasFunc = /function\s+add\s*\(/.test(js);
    checks.push({
      label: "Функция add объявлена",
      passed: hasFunc,
      hint: "Создайте функцию add()",
    });
    if (hasFunc) score += 20;

    // 2. Проверка: функция принимает два параметра
    const hasParams = /function\s+add\s*\(\s*\w+\s*,\s*\w+\s*\)/.test(js);
    checks.push({
      label: "Функция add принимает два параметра",
      passed: hasParams,
      hint: "Добавьте два параметра в функцию add, например add(a, b)",
    });
    if (hasParams) score += 25;

    // 3. Проверка: функция использует return
    const hasReturn = /return\s+/.test(js);
    checks.push({
      label: "Функция использует return",
      passed: hasReturn,
      hint: "Добавьте return для возврата результата",
    });
    if (hasReturn) score += 30;

    // 4. Проверка: вызов функции add и вывод результата
    const hasCall = /add\s*\(\s*(2|3)\s*,\s*(2|3)\s*\)/.test(js);
    const hasOutput =
      /console\.log\s*\(/.test(js) || /\.textContent\s*=/.test(js);
    checks.push({
      label: "Вызовите add(2, 3) и выведите результат (console.log или DOM)",
      passed: hasCall && hasOutput,
      hint: "Вызовите add(2, 3) и выведите результат через console.log или обновите DOM",
    });
    if (hasCall && hasOutput) score += 25;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
