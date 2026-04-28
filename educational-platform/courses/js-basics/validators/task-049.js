export default class Task049Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка использования confirm()
    const hasConfirm = /confirm\s*\(/.test(js);
    checks.push({
      label: "Использован confirm() для вопроса",
      passed: hasConfirm,
      hint: 'Добавьте confirm("Тебе нравится JavaScript?")',
    });
    if (hasConfirm) score += 20;

    // Проверка использования if
    const hasIf = /\bif\s*\(/.test(js);
    checks.push({
      label: "Использован if",
      passed: hasIf,
      hint: "Добавьте условие if",
    });
    if (hasIf) score += 15;

    // Проверка использования else
    const hasElse = /\belse\b/.test(js);
    checks.push({
      label: "Использован else",
      passed: hasElse,
      hint: "Добавьте блок else",
    });
    if (hasElse) score += 15;

    // Проверка вывода 'Конечно, отличный язык.'
    const positiveMsg =
      /alert\s*\(\s*['"]Конечно,\s*отличный\s*язык\.?['"]\s*\)/.test(js);
    checks.push({
      label: 'Выводит "Конечно, отличный язык." при положительном ответе',
      passed: positiveMsg,
      hint: 'Добавьте alert("Конечно, отличный язык.")',
    });
    if (positiveMsg) score += 25;

    // Проверка вывода 'Не нравится? Вы кнопкой ошиблись?'
    const negativeMsg =
      /alert\s*\(\s*['"]Не\s*нравится\?\s*Вы\s*кнопкой\s*ошиблись\??['"]\s*\)/.test(
        js,
      );
    checks.push({
      label:
        'Выводит "Не нравится? Вы кнопкой ошиблись?" при отрицательном ответе',
      passed: negativeMsg,
      hint: 'Добавьте alert("Не нравится? Вы кнопкой ошиблись?")',
    });
    if (negativeMsg) score += 25;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
