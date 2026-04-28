export default class Task013Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;
    const hasVar = /const\s+age\s*=/.test(js);
    checks.push({
      label: "Переменная age объявлена",
      passed: hasVar,
      hint: "Объявите переменную age",
    });
    if (hasVar) score += 30;
    const hasValue = /age\s*=\s*25/.test(js);
    checks.push({
      label: "Значение 25",
      passed: hasValue,
      hint: "Установите значение 25",
    });
    if (hasValue) score += 40;
    const hasConsoleLog = /console\.log\s*\(/.test(js);
    checks.push({
      label: "Вывод в консоль",
      passed: hasConsoleLog,
      hint: "Используйте console.log() для вывода значения",
    });
    if (hasConsoleLog) score += 30;
    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}
