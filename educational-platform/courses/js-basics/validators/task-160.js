export default class Task160Validator {
  async validate(html, css, js, samples, config) {
    const checks = [];
    let score = 0;

    const hasArray = /colors\s*=\s*\[/.test(js);
    checks.push({
      label: "Массив colors объявлен",
      passed: hasArray,
      hint: "Создайте массив: const colors = ['red', 'green', 'blue']",
    });
    if (hasArray) score += 20;

    const hasColors = /\['red',\s*'green',\s*'blue'\]/.test(js);
    checks.push({
      label: "Элементы 'red', 'green', 'blue'",
      passed: hasColors,
      hint: "Добавьте все три элемента в массив",
    });
    if (hasColors) score += 20;

    const hasIndex = /colors\s*\[\s*1\s*\]/.test(js);
    checks.push({
      label: "Обращение ко второму элементу colors[1]",
      passed: hasIndex,
      hint: "Используйте colors[1] для доступа ко второму элементу",
    });
    if (hasIndex) score += 30;

    const hasConsoleLog = /console\.log\s*\(\s*colors\s*\[\s*1\s*\]\s*\)/.test(js);
    checks.push({
      label: "Вывод colors[1] в консоль",
      passed: hasConsoleLog,
      hint: "Напишите console.log(colors[1])",
    });
    if (hasConsoleLog) score += 30;

    return { passed: score >= (config.passThreshold || 70), score, checks };
  }
}