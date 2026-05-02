export default class Task053Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции isLeapYear
    const hasFunction = /function\s+isLeapYear\s*\(/.test(js);
    checks.push({
      label: "Функция isLeapYear объявлена",
      passed: hasFunction,
      hint: "Создайте функцию isLeapYear(year)",
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

    // Проверка использования else
    const hasElse = /\}\s*else\s*\{/.test(js) || /\belse\b[^{]*\{/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 10;

    // Проверка использования % (деление по модулю)
    const hasModulo = /%/.test(js);
    checks.push({
      label: "Использован оператор % (остаток от деления)",
      passed: hasModulo,
      hint: "Добавьте проверку остатка от деления через %",
    });
    if (hasModulo) score += 15;

    // Проверка использования &&
    const hasAnd = /&&/.test(js);
    checks.push({
      label: "Использован логический оператор &&",
      passed: hasAnd,
      hint: "Добавьте оператор &&",
    });
    if (hasAnd) score += 10;

    // Проверка использования ||
    const hasOr = /\|\|/.test(js);
    checks.push({
      label: "Использован логический оператор ||",
      passed: hasOr,
      hint: "Добавьте оператор ||",
    });
    if (hasOr) score += 10;

    // Проверка возврата true
    const returnsTrue = /return\s+true/.test(js);
    checks.push({
      label: 'Возвращает true для високосного года',
      passed: returnsTrue,
      hint: "Добавьте return true",
    });
    if (returnsTrue) score += 15;

    // Проверка возврата false
    const returnsFalse = /return\s+false/.test(js);
    checks.push({
      label: 'Возвращает false для невисокосного года',
      passed: returnsFalse,
      hint: "Добавьте return false",
    });
    if (returnsFalse) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}