export default class Task153Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasFunction = /function\s+findChar\s*\(/.test(js);
    checks.push({ label: "Объявлена функция findChar", passed: hasFunction, hint: "Добавьте function findChar(str, char) { ... }" });
    if (hasFunction) score += 15;

    const hasWhile = /\bwhile\s*\(/.test(js);
    checks.push({ label: "Использован цикл while", passed: hasWhile, hint: "Добавьте цикл while" });
    if (hasWhile) score += 15;

    const hasLengthCheck = /i\s*<\s*str\.length/.test(js);
    checks.push({ label: "Условие i < str.length", passed: hasLengthCheck, hint: "Используйте while (i < str.length)" });
    if (hasLengthCheck) score += 15;

    const hasCharCheck = /str\[i\]\s*===\s*char/.test(js);
    checks.push({ label: "Сравнение str[i] === char", passed: hasCharCheck, hint: "Проверьте str[i] === char" });
    if (hasCharCheck) score += 20;

    const hasReturnI = /return\s+i/.test(js);
    checks.push({ label: "Возврат индекса при нахождении", passed: hasReturnI, hint: "Верните i если символ найден" });
    if (hasReturnI) score += 10;

    const hasReturnMinus = /return\s+-1/.test(js);
    checks.push({ label: "Возврат -1 если не найден", passed: hasReturnMinus, hint: "Верните -1 после цикла" });
    if (hasReturnMinus) score += 10;

    const hasOutput = /textContent\s*\+?=/.test(js);
    checks.push({ label: "Вывод результата в #output", passed: hasOutput, hint: "Выведите результат в #output" });
    if (hasOutput) score += 15;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}