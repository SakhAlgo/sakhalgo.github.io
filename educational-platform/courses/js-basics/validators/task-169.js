export default class Task169Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /months\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив months объявлен",
      passed: hasArray,
      hint: "Создайте массив: const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May']",
    });
    if (hasArray) score += 15;

    const hasSplice = /months\.splice\s*\(/.test(js);
    checks.push({
      label: "Использован метод splice",
      passed: hasSplice,
      hint: "Вызовите months.splice(2, 2, 'X', 'Y')",
    });
    if (hasSplice) score += 15;

    const hasSpliceArgs = /months\.splice\s*\(\s*2\s*,\s*2\s*,\s*'X'\s*,\s*'Y'\s*\)/.test(js);
    checks.push({
      label: "Параметры splice(2, 2, 'X', 'Y')",
      passed: hasSpliceArgs,
      hint: "Вызовите months.splice(2, 2, 'X', 'Y')",
    });
    if (hasSpliceArgs) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*months/.test(js);
    checks.push({
      label: "Вывод изменённого массива months",
      passed: hasConsoleLog,
      hint: "Выведите months через console.log(months)",
    });
    if (hasConsoleLog) score += 40;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}