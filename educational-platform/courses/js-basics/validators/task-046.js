export default class Task046Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции checkNumber
    const hasFunction = /function\s+checkNumber\s*\(/.test(js);
    checks.push({
      label: "Функция checkNumber объявлена",
      passed: hasFunction,
      hint: "Создайте функцию checkNumber(num)",
    });
    if (hasFunction) score += 20;

    // Проверка использования if
    const hasIf = /\bif\s*\(/.test(js);
    checks.push({
      label: "Использован if",
      passed: hasIf,
      hint: "Добавьте условие if",
    });
    if (hasIf) score += 15;

    // Проверка использования else if
    const hasElseIf =
      /\}\s*else\s+if\s*\(/.test(js) || /\belse\s+if\b/.test(js);
    checks.push({
      label: "Использован else if",
      passed: hasElseIf,
      hint: "Добавьте else if",
    });
    if (hasElseIf) score += 15;

    // Проверка использования else
    const hasElse = /\}\s*else\s*\{/.test(js) || /\belse\b[^{]*\{/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 15;

    // Проверка возврата 'positive'
    const returnsPositive = /return\s+['"]positive['"]/.test(js);
    checks.push({
      label: 'Возвращает "positive" для чисел > 0',
      passed: returnsPositive,
      hint: 'Добавьте return "positive"',
    });
    if (returnsPositive) score += 15;

    // Проверка возврата 'negative'
    const returnsNegative = /return\s+['"]negative['"]/.test(js);
    checks.push({
      label: 'Возвращает "negative" для чисел < 0',
      passed: returnsNegative,
      hint: 'Добавьте return "negative"',
    });
    if (returnsNegative) score += 10;

    // Проверка возврата 'zero'
    const returnsZero = /return\s+['"]zero['"]/.test(js);
    checks.push({
      label: 'Возвращает "zero" для числа 0',
      passed: returnsZero,
      hint: 'Добавьте return "zero"',
    });
    if (returnsZero) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
