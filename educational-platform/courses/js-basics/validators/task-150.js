export default class Task150Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте while (i <= 5) { ... }" });
    if (hasWhile) score += 20;

    const hasCondition = /i\s*<=\s*5/.test(js);
    checks.push({ label: "Условие i <= 5", passed: hasCondition, hint: "Укажите while (i <= 5)" });
    if (hasCondition) score += 20;

    const hasStart = /let\s+i\s*=\s*1/.test(js);
    checks.push({ label: "Начальное значение i = 1", passed: hasStart, hint: "Добавьте let i = 1;" });
    if (hasStart) score += 15;

    const hasIncrement = /i\s*\+{2}/.test(js);
    checks.push({ label: "Есть инкремент i++", passed: hasIncrement, hint: "Добавьте i++ внутри цикла" });
    if (hasIncrement) score += 15;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод результата в #output", passed: hasOutput, hint: "Используйте textContent += i + '\\n'" });
    if (hasOutput) score += 15;

    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({ label: "Обращение к #output", passed: hasGetElement, hint: 'Используйте document.getElementById("output")' });
    if (hasGetElement) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}