export default class Task173Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /numbers\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив numbers объявлен",
      passed: hasArray,
      hint: "Создайте массив: const numbers = [10, 2, 5, 1, 9]",
    });
    if (hasArray) score += 15;

    const hasSort = /numbers\.sort\s*\(/.test(js);
    checks.push({
      label: "Использован метод sort",
      passed: hasSort,
      hint: "Вызовите numbers.sort() с функцией сравнения",
    });
    if (hasSort) score += 15;

    const hasCallback = /numbers\.sort\s*\(\s*\(/.test(js) || /numbers\.sort\s*\(\s*function/.test(js);
    checks.push({
      label: "sort с функцией сравнения",
      passed: hasCallback,
      hint: "Передайте функцию сравнения: numbers.sort((a, b) => a - b)",
    });
    if (hasCallback) score += 20;

    const hasCompare = /a\s*-\s*b/.test(js);
    checks.push({
      label: "Сортировка по возрастанию (a - b)",
      passed: hasCompare,
      hint: "Используйте (a, b) => a - b для сортировки по возрастанию",
    });
    if (hasCompare) score += 20;

    const hasConsoleLog = /console\.log\s*\(\s*numbers/.test(js);
    checks.push({
      label: "Вывод отсортированного массива",
      passed: hasConsoleLog,
      hint: "Выведите numbers через console.log(numbers)",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}