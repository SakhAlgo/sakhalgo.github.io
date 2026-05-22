export default class Task154Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+factorial\s*\(/.test(js);
    checks.push({ label: "Объявлена функция factorial", passed: hasFunction, hint: "Добавьте function factorial(n) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте цикл while" });
    if (hasWhile) score += 20;

    const hasResultAccum = /result\s*\*=/.test(js);
    checks.push({ label: "Умножение result *= i", passed: hasResultAccum, hint: "Добавьте result *= i" });
    if (hasResultAccum) score += 20;

    const hasReturn = /\breturn\s+result/.test(js);
    checks.push({ label: "Возврат result", passed: hasReturn, hint: "Верните result" });
    if (hasReturn) score += 15;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод в #output", passed: hasOutput, hint: "Выведите результат в #output" });
    if (hasOutput) score += 15;

    const hasCall = /factorial\s*\(/.test(js);
    checks.push({ label: "Вызов factorial", passed: hasCall, hint: "Вызовите factorial(5)" });
    if (hasCall) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}