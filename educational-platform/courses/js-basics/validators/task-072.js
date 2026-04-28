export default class Task072Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка цикла while
    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({
      label: "Использован цикл while",
      passed: hasWhile,
      hint: "Добавьте while (i >= 1) { ... }",
    });
    if (hasWhile) score += 20;

    // Проверка условия i >= 1 (обратный отсчёт)
    const hasCondition = /i\s*>=\s*1/.test(js);
    checks.push({
      label: "Условие i >= 1 (от 5 до 1)",
      passed: hasCondition,
      hint: "Укажите while (i >= 1)",
    });
    if (hasCondition) score += 20;

    // Проверка инициализации i = 5
    const hasStart = /let\s+i\s*=\s*5/.test(js);
    checks.push({
      label: "Начальное значение i = 5",
      passed: hasStart,
      hint: "Добавьте let i = 5;",
    });
    if (hasStart) score += 15;

    // Проверка декремента i--
    const hasDecrement = /i\s*-{2}/.test(js);
    checks.push({
      label: "Есть декремент i--",
      passed: hasDecrement,
      hint: "Добавьте i-- внутри цикла",
    });
    if (hasDecrement) score += 15;

    // Проверка вывода
    const hasOutput = /textContent\s*\+=/.test(js);
    checks.push({
      label: "Вывод результата в #output",
      passed: hasOutput,
      hint: "Используйте textContent += i",
    });
    if (hasOutput) score += 15;

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