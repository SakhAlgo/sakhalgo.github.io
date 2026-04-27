/**
 * Валидатор для задания 031: Константа
 */
export default class Task031Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    // Проверка 1: наличие const
    const hasConst = /\bconst\b/.test(js);
    checks.push({
      label: "Ключевое слово const использовано",
      passed: hasConst,
      hint: "Объявите переменную с помощью const",
    });
    if (hasConst) score += 30;

    // Проверка 2: присвоение значения
    const hasValue = /\bconst\s+\w+\s*=/.test(js);
    checks.push({
      label: "Константе присвоено значение",
      passed: hasValue,
      hint: "Присвойте значение константе: const name = value",
    });
    if (hasValue) score += 30;

    const hasConsoleLog = /alert\s*\(/.test(js);
    checks.push({
      label: "Вывод в модальное окно",
      passed: hasConsoleLog,
      hint: "Используйте alert() для вывода значения",
    });
    if (hasConsoleLog) score += 40;
    return {
      passed: score >= (config.passThreshold || 70),
      score,
      checks,
    };

  }
}
