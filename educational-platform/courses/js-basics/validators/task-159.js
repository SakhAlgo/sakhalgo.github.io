export default class Task159Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasOuterWhile = /while\s*\(i\s*<=\s*3\)/.test(js);
    checks.push({ label: "Внешний цикл while (i <= 3)", passed: hasOuterWhile, hint: "Добавьте внешний while (i <= 3)" });
    if (hasOuterWhile) score += 15;

    const hasInnerWhile = /while\s*\(j\s*<=\s*3\)/.test(js);
    checks.push({ label: "Вложенный цикл while (j <= 3)", passed: hasInnerWhile, hint: "Добавьте внутренний while (j <= 3)" });
    if (hasInnerWhile) score += 20;

    const hasInnerInc = /j\s*\+{2}/.test(js);
    checks.push({ label: "Инкремент j++ вложенного цикла", passed: hasInnerInc, hint: "Добавьте j++ внутри вложенного цикла" });
    if (hasInnerInc) score += 15;

    const hasOuterInc = /i\s*\+{2}/.test(js);
    checks.push({ label: "Инкремент i++ внешнего цикла", passed: hasOuterInc, hint: "Добавьте i++ после вложенного цикла" });
    if (hasOuterInc) score += 15;

    const hasMultiply = /\i\s*[*]\s*j/.test(js);
    checks.push({ label: "Умножение i * j", passed: hasMultiply, hint: "Вычислите i * j" });
    if (hasMultiply) score += 15;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод в #output", passed: hasOutput, hint: "Используйте textContent" });
    if (hasOutput) score += 10;

    const hasGetElement = /getElementById\s*\(\s*['"]output['"]\s*\)/.test(js);
    checks.push({ label: "Обращение к #output", passed: hasGetElement, hint: 'Используйте document.getElementById("output")' });
    if (hasGetElement) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}