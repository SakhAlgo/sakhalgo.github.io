export default class Task077Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка цикла do...while
    const hasDoWhile = /\bdo\b/.test(js);
    checks.push({
      label: "Использован do",
      passed: hasDoWhile,
      hint: "Начните с do { ... } while (...)",
    });
    if (hasDoWhile) score += 25;

    // Проверка while в конце
    const hasWhileEnd = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован while после do",
      passed: hasWhileEnd,
      hint: "Добавьте while (i <= 5); после do-блока",
    });
    if (hasWhileEnd) score += 20;

    // Проверка условия i <= 5
    const hasCondition = /i\s*<=\s*5/.test(js);
    checks.push({
      label: "Условие i <= 5 в while",
      passed: hasCondition,
      hint: "Укажите while (i <= 5)",
    });
    if (hasCondition) score += 15;

    // Проверка инкремента i++
    const hasIncrement = /i\s*\+\+/.test(js);
    checks.push({
      label: "Есть инкремент i++",
      passed: hasIncrement,
      hint: "Добавьте i++ внутри do-блока",
    });
    if (hasIncrement) score += 15;

    // Проверка вывода
    const hasOutput = /textContent\s*\+=/.test(js);
    checks.push({
      label: "Вывод результата в #output",
      passed: hasOutput,
      hint: "Используйте textContent += i",
    });
    if (hasOutput) score += 10;

    // Проверка getElementById
    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({
      label: "Обращение к #output",
      passed: hasGetElement,
      hint: 'Используйте document.getElementById("output")',
    });
    if (hasGetElement) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}