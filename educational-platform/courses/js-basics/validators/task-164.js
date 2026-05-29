export default class Task164Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /data\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив data объявлен",
      passed: hasArray,
      hint: "Создайте массив: const data = [10, 20, 30]",
    });
    if (hasArray) score += 20;

    const hasUnshift = /data\.unshift\s*\(/.test(js);
    checks.push({
      label: "Использован метод unshift",
      passed: hasUnshift,
      hint: "Вызовите data.unshift('start')",
    });
    if (hasUnshift) score += 30;

    const hasUnshiftArg = /data\.unshift\s*\(\s*'start'\s*\)/.test(js);
    checks.push({
      label: "Добавлена строка 'start' в начало",
      passed: hasUnshiftArg,
      hint: "Вызовите data.unshift('start')",
    });
    if (hasUnshiftArg) score += 20;

    const hasConsoleLog = /console\.log\s*\(\s*data/.test(js);
    checks.push({
      label: "Вывод массива data в консоль",
      passed: hasConsoleLog,
      hint: "Выведите data через console.log(data)",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}