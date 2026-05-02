export default class Task055Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции calcDelivery
    const hasFunction = /function\s+calcDelivery\s*\(/.test(js);
    checks.push({
      label: "Функция calcDelivery объявлена",
      passed: hasFunction,
      hint: "Создайте функцию calcDelivery(distance, isExpress)",
    });
    if (hasFunction) score += 15;

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

    // Проверка возврата 'invalid'
    const returnsInvalid = /return\s+['"]invalid['"]/.test(js);
    checks.push({
      label: 'Возвращает "invalid" при distance <= 0',
      passed: returnsInvalid,
      hint: 'Добавьте return "invalid"',
    });
    if (returnsInvalid) score += 15;

    // Проверка использования сложения с числом (расчёт стоимости)
    const hasAddition = /\+/.test(js);
    checks.push({
      label: "Использовано сложение для расчёта стоимости",
      passed: hasAddition,
      hint: "Добавьте сложение для добавления express-доплаты",
    });
    if (hasAddition) score += 10;

    // Проверка возврата строки с ' руб'
    const hasRubleSuffix = /['"]\s*руб['"]/.test(js) || /\+ \s*['"]руб['"]/.test(js);
    checks.push({
      label: "Возвращает строку с ' руб'",
      passed: hasRubleSuffix,
      hint: "Добавьте ' руб' к итоговой стоимости",
    });
    if (hasRubleSuffix) score += 15;

    // Проверка использования let или const (работа с переменной стоимости)
    const hasVarDeclaration = /\blet\s+cost\b/.test(js) || /\bconst\s+cost\b/.test(js);
    checks.push({
      label: "Использована переменная для хранения стоимости",
      passed: hasVarDeclaration,
      hint: "Создайте переменную для хранения стоимости",
    });
    if (hasVarDeclaration) score += 15;

    return { passed: score >= (config.passThreshold || 75), score, checks };
  }
}