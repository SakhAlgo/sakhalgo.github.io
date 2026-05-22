export default class Task152Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте while (i <= 10)" });
    if (hasWhile) score += 20;

    const hasCondition = /i\s*<=\s*10/.test(js);
    checks.push({ label: "Условие i <= 10", passed: hasCondition, hint: "Укажите while (i <= 10)" });
    if (hasCondition) score += 15;

    const hasEvenCheck = /i\s*%\s*2\s*===\s*0/.test(js);
    checks.push({ label: "Проверка чётности i % 2 === 0", passed: hasEvenCheck, hint: "Добавьте if (i % 2 === 0)" });
    if (hasEvenCheck) score += 25;

    const hasIncrement = /i\s*\+{2}/.test(js);
    checks.push({ label: "Есть инкремент i++", passed: hasIncrement, hint: "Добавьте i++" });
    if (hasIncrement) score += 10;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод результата в #output", passed: hasOutput, hint: "Используйте textContent" });
    if (hasOutput) score += 15;

    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({ label: "Обращение к #output", passed: hasGetElement, hint: 'Используйте document.getElementById("output")' });
    if (hasGetElement) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}