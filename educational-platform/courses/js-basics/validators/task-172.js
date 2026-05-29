export default class Task172Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /names\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив names объявлен",
      passed: hasArray,
      hint: "Создайте массив: const names = ['John', 'Anna', 'Zoe', 'Bob']",
    });
    if (hasArray) score += 20;

    const hasSort = /names\.sort\s*\(/.test(js);
    checks.push({
      label: "Использован метод sort",
      passed: hasSort,
      hint: "Вызовите names.sort()",
    });
    if (hasSort) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*names/.test(js);
    checks.push({
      label: "Вывод отсортированного массива",
      passed: hasConsoleLog,
      hint: "Выведите names через console.log(names)",
    });
    if (hasConsoleLog) score += 50;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}