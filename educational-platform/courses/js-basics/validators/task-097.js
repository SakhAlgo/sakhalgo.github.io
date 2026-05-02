export default class Task052Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка наличия функции getDayType
    const hasFunction = /function\s+getDayType\s*\(/.test(js);
    checks.push({
      label: "Функция getDayType объявлена",
      passed: hasFunction,
      hint: "Создайте функцию getDayType(day)",
    });
    if (hasFunction) score += 20;

    // Проверка использования switch
    const hasSwitch = /\bswitch\s*\(/.test(js);
    checks.push({
      label: "Использован switch",
      passed: hasSwitch,
      hint: "Добавьте конструкцию switch",
    });
    if (hasSwitch) score += 20;

    // Проверка использования case
    const hasCase = /\bcase\s+\d+/.test(js);
    checks.push({
      label: "Использованы case с числами",
      passed: hasCase,
      hint: "Добавьте case для каждого дня недели",
    });
    if (hasCase) score += 15;

    // Проверка использования default
    const hasDefault = /\bdefault\s*:/.test(js);
    checks.push({
      label: "Использован default",
      passed: hasDefault,
      hint: "Добавьте блок default",
    });
    if (hasDefault) score += 10;

    // Проверка возврата 'workday'
    const returnsWorkday = /return\s+['"]workday['"]/.test(js);
    checks.push({
      label: 'Возвращает "workday" для будних дней',
      passed: returnsWorkday,
      hint: 'Добавьте return "workday"',
    });
    if (returnsWorkday) score += 15;

    // Проверка возврата 'weekend'
    const returnsWeekend = /return\s+['"]weekend['"]/.test(js);
    checks.push({
      label: 'Возвращает "weekend" для выходных',
      passed: returnsWeekend,
      hint: 'Добавьте return "weekend"',
    });
    if (returnsWeekend) score += 10;

    // Проверка возврата 'invalid'
    const returnsInvalid = /return\s+['"]invalid['"]/.test(js);
    checks.push({
      label: 'Возвращает "invalid" для неверных значений',
      passed: returnsInvalid,
      hint: 'Добавьте return "invalid"',
    });
    if (returnsInvalid) score += 10;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}