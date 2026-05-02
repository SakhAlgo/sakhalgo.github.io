export default class Task050Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции checkPassword
    const hasFunction = /function\s+checkPassword\s*\(/.test(js);
    checks.push({
      label: "Функция checkPassword объявлена",
      passed: hasFunction,
      hint: "Создайте функцию checkPassword(password)",
    });
    if (hasFunction) score += 20;

    // Проверка использования if
    const hasIf = /\bif\s*\(/.test(js);
    checks.push({
      label: "Использован if",
      passed: hasIf,
      hint: "Добавьте условие if",
    });
    if (hasIf) score += 10;

    // Проверка использования else if
    const hasElseIf = /\belse\s+if\b/.test(js);
    checks.push({
      label: "Использован else if",
      passed: hasElseIf,
      hint: "Добавьте else if",
    });
    if (hasElseIf) score += 10;

    // Проверка использования else
    const hasElse = /\}\s*else\s*\{/.test(js) || /\belse\b[^{]*\{/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 10;

    // Проверка использования .length
    const hasLength = /\.length/.test(js);
    checks.push({
      label: "Использовано свойство .length",
      passed: hasLength,
      hint: "Обратитесь к свойству length строки",
    });
    if (hasLength) score += 15;

    // Проверка возврата 'too short'
    const returnsShort = /return\s+['"]too\s*short['"]/.test(js);
    checks.push({
      label: 'Возвращает "too short" при длине < 8',
      passed: returnsShort,
      hint: 'Добавьте return "too short"',
    });
    if (returnsShort) score += 15;

    // Проверка возврата 'medium'
    const returnsMedium = /return\s+['"]medium['"]/.test(js);
    checks.push({
      label: 'Возвращает "medium" при длине 8-15',
      passed: returnsMedium,
      hint: 'Добавьте return "medium"',
    });
    if (returnsMedium) score += 10;

    // Проверка возврата 'strong'
    const returnsStrong = /return\s+['"]strong['"]/.test(js);
    checks.push({
      label: 'Возвращает "strong" при длине > 15',
      passed: returnsStrong,
      hint: 'Добавьте return "strong"',
    });
    if (returnsStrong) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}