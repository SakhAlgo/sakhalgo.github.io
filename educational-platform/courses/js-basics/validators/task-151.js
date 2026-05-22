export default class Task151Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+sumTo\s*\(/.test(js);
    checks.push({ label: "Объявлена функция sumTo", passed: hasFunction, hint: "Добавьте function sumTo(n) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте цикл while" });
    if (hasWhile) score += 20;

    const hasSumAccum = /sum\s*\+=\s*i/.test(js);
    checks.push({ label: "Накопление суммы: sum += i", passed: hasSumAccum, hint: "Добавьте sum += i внутри цикла" });
    if (hasSumAccum) score += 15;

    const hasReturn = /\breturn\s+sum/.test(js);
    checks.push({ label: "Возврат результата return sum", passed: hasReturn, hint: "Верните sum из функции" });
    if (hasReturn) score += 15;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод результата в #output", passed: hasOutput, hint: "Выведите результат в #output" });
    if (hasOutput) score += 10;

    const hasCall = /sumTo\s*\(/.test(js);
    checks.push({ label: "Вызов функции sumTo", passed: hasCall, hint: "Вызовите sumTo(5)" });
    if (hasCall) score += 10;

    const hasParam = /i\s*<=\s*n/.test(js);
    checks.push({ label: "Условие i <= n", passed: hasParam, hint: "Используйте while (i <= n)" });
    if (hasParam) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}