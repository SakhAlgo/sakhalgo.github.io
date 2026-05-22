export default class Task155Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+power\s*\(/.test(js);
    checks.push({ label: "Объявлена функция power", passed: hasFunction, hint: "Добавьте function power(base, exp) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте цикл while" });
    if (hasWhile) score += 20;

    const hasMulAccum = /result\s*\*=/.test(js);
    checks.push({ label: "Умножение result *= base", passed: hasMulAccum, hint: "Добавьте result *= base" });
    if (hasMulAccum) score += 20;

    const hasReturn = /\breturn\s+result/.test(js);
    checks.push({ label: "Возврат result", passed: hasReturn, hint: "Верните result" });
    if (hasReturn) score += 15;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод в #output", passed: hasOutput, hint: "Выведите результат в #output" });
    if (hasOutput) score += 15;

    const hasCall = /power\s*\(/.test(js);
    checks.push({ label: "Вызов power", passed: hasCall, hint: "Вызовите power(2, 3)" });
    if (hasCall) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}