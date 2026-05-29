export default class Task167Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /animals\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив animals объявлен",
      passed: hasArray,
      hint: "Создайте массив: const animals = ['dog', 'cat', 'bird']",
    });
    if (hasArray) score += 20;

    const hasIncludes = /animals\.includes\s*\(/.test(js);
    checks.push({
      label: "Использован метод includes",
      passed: hasIncludes,
      hint: "Вызовите animals.includes('cat')",
    });
    if (hasIncludes) score += 20;

    const hasIncludesArg = /animals\.includes\s*\(\s*'cat'\s*\)/.test(js);
    checks.push({
      label: "Поиск строки 'cat'",
      passed: hasIncludesArg,
      hint: "Вызовите animals.includes('cat')",
    });
    if (hasIncludesArg) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*animals\.includes/.test(js);
    checks.push({
      label: "Вывод результата includes в консоль",
      passed: hasConsoleLog,
      hint: "Выведите animals.includes('cat') через console.log()",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}